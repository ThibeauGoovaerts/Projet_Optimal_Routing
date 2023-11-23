from retrieveData import readParams, getNbInterims, getCoordinates, getCleaningOfSpecials, getTimeTaken, \
    getNbPersonsBuilding, getDescriptionBuilding, getNeedControle
from dataModels import dataModelEquipes, create_data_model_for_controls, create_Data_model_for_check_ups
from export import color_indiv_teams
import datetime
import os
import math
# noinspection PyUnresolvedReferences
from ortools.constraint_solver import routing_enums_pb2
# noinspection PyUnresolvedReferences
from ortools.constraint_solver import pywrapcp


class Schoonmaak:
    def __init__(self, boekingsnummer: int, bungalownummer: int, reloue: bool):
        self.boekingsnumber = boekingsnummer
        self.bungalownummer = bungalownummer
        self.reloue = reloue
        self.dateMake = datetime.datetime.now()
        self.done = False


# Computes the euclidean distance matrix of the bungalows that need to be cleaned
def compute_euclidean_distance_matrix(locations):
    """Creates callback to return distance between points."""
    distances = {}
    for from_counter, from_node in enumerate(locations):
        distances[from_counter] = {}
        if from_counter == 0:
            for to_counter, to_node in enumerate(locations):
                distances[from_counter][to_counter] = 0
        else:
            for to_counter, to_node in enumerate(locations):
                if from_counter == to_counter:
                    distances[from_counter][to_counter] = 0
                else:
                    # Euclidean distance
                    distances[from_counter][to_counter] = (int(
                        math.hypot((from_node[0] - to_node[0]),
                                   (from_node[1] - to_node[1]))))
    return distances


def update_root(root):
    root.update_idletasks()
    root.update()


def bungalow_to_keep(reloue, departs):
    total_nb = len(reloue) + len(departs)
    total1 = readParams(total1=True)
    total2 = readParams(total2=True)
    nb_equipes1, nb_equipes2 = getNbInterims()
    if total1 * nb_equipes1 + total2 * nb_equipes2 < len(reloue):
        return []
    elif total_nb < total1 * nb_equipes1 + total2 * nb_equipes2:
        return departs
    else:
        keepers = total1 * nb_equipes1 + total2 * nb_equipes2 - len(reloue)
        return departs[:keepers]


# Prints the solution to a text file as a brief overview
def findRoutesInterims(data, manager, routing, solution):
    """Prints solution on console."""
    all_routes = []
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        route_distance = 0
        route_load = 0
        route = []
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data['demands_total'][node_index]
            if not node_index == 0:
                route.append(node_index)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        all_routes.append(route)
    return all_routes


def findSolutionInterims(reloue, departs, file_name, root):
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')
    departs_to_clean = bungalow_to_keep(reloue, departs)
    root.update_idletasks()
    # Checks if the file "info_equipes" already exists, if so it has to be manually deleted
    try:
        os.mkdir(desktop + f"/schoonmaaklijst/{file_name}/info_equipes")
    except FileExistsError:
        print(">> Le fichier info_equipes existe déja pour ce jour, effacer le d'abord!\n")
        update_root(root)
        return
    
    all_bungalows_to_clean = reloue + departs_to_clean
    
    data = dataModelEquipes(all_bungalows_to_clean, reloue)
    root.update_idletasks()
    
    if data is None:
        return
    
    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['locations']),
                                           data['num_vehicles'], data['depot'])
    
    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)
    
    distance_matrix = compute_euclidean_distance_matrix(data['locations'])
    
    # Adds a distance callback to solve the problem with attention to the distance
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_matrix[from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    
    # Define cost of each arc.
    
    
    # Adds a callback for the capacity of the teams, so that all the bungalows are evenly (or as best as possible)
    # divided between the groups
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands_total'][from_node]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities_total'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Total Capacity')

    def time_callback(from_index, to_index):
        """Returns the travel time between the two nodes."""
        # Convert from routing variable Index to time matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    time = 'Time'
    routing.AddDimension(
        transit_callback_index,
        500,  # allow waiting time
        1200,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        time)
    time_dimension = routing.GetDimensionOrDie(time)
    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])
    # Add time window constraints for each vehicle start node.
    depot_idx = data['depot']
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(
            data['time_windows'][depot_idx][0],
            data['time_windows'][depot_idx][1])
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))
    
    
    # # Adds a callback for the reloue bungalows so that a team does not have to do too much bungalows at once
    # def demand_callback_reloue(from_index):
    #     """Returns the demand of the node."""
    #     # Convert from routing variable Index to demands NodeIndex.
    #     from_node = manager.IndexToNode(from_index)
    #     return data['demands_reloue'][from_node]
    #
    # demand_callback_index_reloue = routing.RegisterUnaryTransitCallback(
    #     demand_callback_reloue)
    # routing.AddDimensionWithVehicleCapacity(
    #     demand_callback_index_reloue,
    #     0,  # null capacity slack
    #     data['vehicle_capacities_reloue'],  # vehicle maximum capacities
    #     True,  # start cumul to zero
    #     'Reloue Capacity')
    
    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = readParams(timer=True)
    search_parameters.log_search = True
    
    s = routing.SolveWithParameters(search_parameters)
    date = datetime.datetime.now()
    if s:
        # Print the general overview of the solution to a text file and return the solution as an array of arrays
        solution = findRoutesInterims(data, manager, routing, s)
        cache_tout = []
        imagelist = []
        # Print all individual solutions to png files
        for i in range(len(solution)):
            cache = []
            for j in solution[i]:
                cache.append(all_bungalows_to_clean[j - 1])
            cache_tout.append(cache)
            imagelist.append(color_indiv_teams(cache, i + 1, date, file_name, reloue))
        # Print the general solution
        return cache_tout, imagelist
    else:
        print("No solution")
        return None, None


# Prints the solution to a text file as a brief overview
def get_solution(data, manager, routing, solution):
    """Prints solution on console."""
    total_distance = 0
    total_load = 0
    all_routes = []
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        route_distance = 0
        route_load = 0
        route = []
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data['demands_total'][node_index]
            if not node_index == 0:
                route.append(node_index)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        all_routes.append(route)
        total_distance += route_distance
        total_load += route_load
    return all_routes


def find_center(bungalows):
    som_x, som_y = 0, 0
    
    for b in bungalows:
        x, y = getCoordinates(b)
        som_x += x
        som_y += y
    return som_x / len(bungalows), som_y / len(bungalows)


def divide_teams_in_controls(result, nr_vast):
    centers = []
    for r in result:
        centers.append(find_center(r))
    
    data = create_data_model_for_controls(centers, nr_vast)
    if data is None:
        return
    manager = pywrapcp.RoutingIndexManager(len(data['locations']),
                                           data['num_vehicles'], data['depot'])
    
    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)
    
    distance_matrix = compute_euclidean_distance_matrix(data['locations'])
    
    # Adds a distance callback to solve the problem with attention to the distance
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_matrix[from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    
    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    # Adds a callback for the capacity of the teams, so that all the bungalows are evenly (or as best as possible)
    # divided between the groups
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands_total'][from_node]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities_total'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Total Capacity')
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 60
    search_parameters.log_search = True
    s = routing.SolveWithParameters(search_parameters)
    
    if s:
        # Print the general overview of the solution to a text file and return the solution as an array of arrays
        solution = get_solution(data, manager, routing, s)
        return solution
    else:
        return []


def divide_controls_mains(pre_controles: list, acceuils: list, nr_interim: int, nr_no_inter: int, needControle: list):
    all_bungalows = pre_controles + acceuils + needControle
    
    data = create_Data_model_for_check_ups(all_bungalows, nr_interim, nr_no_inter)
    if data is None:
        return
    manager = pywrapcp.RoutingIndexManager(len(data['locations']),
                                           data['num_vehicles'], data['depot'])
    
    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)
    
    distance_matrix = compute_euclidean_distance_matrix(data['locations'])
    
    # Adds a distance callback to solve the problem with attention to the distance
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return distance_matrix[from_node][to_node]
    
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    
    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    # Adds a callback for the capacity of the teams, so that all the bungalows are evenly (or as best as possible)
    # divided between the groups
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands_total'][from_node]
    
    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities_total'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Total Capacity')
    
    # Adds a callback for the reloue bungalows so that a team does not have to do too much bungalows at once
    
    def demand_callback_piscine(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands_pool'][from_node]
    
    demand_callback_index_reloue = routing.RegisterUnaryTransitCallback(
        demand_callback_piscine)
    
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index_reloue,
        0,  # null capacity slack
        data['pool_capacity'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Capacity Pool')
    
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 30
    search_parameters.log_search = True
    s = routing.SolveWithParameters(search_parameters)
    
    if s:
        # Print the general overview of the solution to a text file and return the solution as an array of arrays
        solution = get_solution(data, manager, routing, s)
        specialCleaning = getCleaningOfSpecials()
        nb_persons = getNbPersonsBuilding()
        nr_people = nr_interim + nr_no_inter
        for i in range(len(specialCleaning)):
            if specialCleaning[i] != 0:
                if nr_people >= nb_persons[i]:
                    for j in range(specialCleaning[i]):
                        for _ in range(nb_persons[i]):
                            all_bungalows.append(getDescriptionBuilding(i + 1))
                else:
                    for j in range(specialCleaning[i]):
                        for _ in range(nr_people):
                            all_bungalows.append(getDescriptionBuilding(i + 1))
        
        cache_tout = []
        for i in solution:
            cache = []
            for j in i:
                cache.append(all_bungalows[j - 1])
            cache_tout.append(cache)
        return cache_tout
    else:
        return []
