from retrieveData import readParams, getCoordinates, getCleaningOfSpecials, getTimeTaken, getNbPersonsBuilding, \
	getCoordinatesBuilding, getNbInterims


def dataModelEquipes(all_bungalows_to_clean, bung_reloue):
	nb_ploegen_1, nb_ploegen_2 = getNbInterims()
	# All the neccesary cache_values
	tt_pl = nb_ploegen_1 + nb_ploegen_2
	aa_pers = nb_ploegen_2 * 2 + nb_ploegen_1
	bung_per_pers = len(all_bungalows_to_clean) // aa_pers
	rest = len(all_bungalows_to_clean) - (bung_per_pers * aa_pers)
	
	# The results are initialised as blank
	cap = []
	capacity_reloue = []
	
	# the capacities are loaded in
	capability_reloue_1team = readParams(reloue_equipe1=True)
	capability_reloue_2team = readParams(reloue_equipe2=True)
	
	while capability_reloue_1team * nb_ploegen_1 + nb_ploegen_2 * capability_reloue_2team < len(bung_reloue):
		capability_reloue_1team += 1
		capability_reloue_2team += 2
	
	# The max number of bungalows are loaded into the data model for the teams of 2 people
	for i in range(nb_ploegen_2):
		capacity_reloue.append(capability_reloue_2team)
		if rest > 0 and rest > tt_pl:
			cap.append((bung_per_pers * 2) + 2)
			rest -= 2
		elif rest > 0:
			cap.append((bung_per_pers * 2) + 1)
			rest -= 1
		else:
			cap.append(bung_per_pers * 2)
	
	# The max number of bungalows are loaded into the data model for the teams of 1 person
	for i in range(nb_ploegen_1):
		capacity_reloue.append(capability_reloue_1team)
		if rest > 0:
			cap.append(bung_per_pers + 1)
			rest -= 1
		else:
			cap.append(bung_per_pers)
	
	# The reception is put as starting area for all teams, this also concludes with reality, the reception also has no
	# demand, and is not reloue, so these are also initialised at 0
	locations = [(422, 819)]
	demands_total = [0]
	reloue = [0]
	time_window = [(0, 20)]
	# Each bungalow is then put into our data model, with its specifications, it needing cleaning and it being reloue
	for i in all_bungalows_to_clean:
		x, y = getCoordinates(i)
		locations.append((x, y))
		if i in bung_reloue:
			time_window.append((0, 360))
			reloue.append(1)
		else:
			time_window.append((0, 900))
			reloue.append(0)
		demands_total.append(1)
		
	# The data model is constructed
	data = {'locations': locations, 'num_vehicles': tt_pl, 'depot': 0, 'demands_total': demands_total,
	        'vehicle_capacities_total': cap, 'demands_reloue': reloue, 'vehicle_capacities_reloue': capacity_reloue,
	        'time_matrix': [[90 for i in range(len(all_bungalows_to_clean))] for i in range(len(all_bungalows_to_clean))],
	        'time_windows': time_window}
	print(data['time_matrix'])
	print(data['time_windows'])
	# the data model is returned
	return data


def create_data_model_for_controls(centers, nr_vast):
	capacity = []
	b_per_person = len(centers) // nr_vast
	rest = len(centers) % nr_vast
	for i in range(nr_vast):
		if rest > 0:
			capacity.append(b_per_person + 1)
			rest -= 1
		else:
			capacity.append(b_per_person)
	locations = [(422, 819)]
	demands_total = [0]
	
	for i in centers:
		locations.append(i)
		demands_total.append(1)
	data = {'locations': locations, 'num_vehicles': nr_vast, 'depot': 0, 'demands_total': demands_total,
	        'vehicle_capacities_total': capacity}
	
	return data


def create_Data_model_for_check_ups(all_bungalows, nr_interim, nr_no_inter):
	specialCleaning = getCleaningOfSpecials()
	time_per_special = getTimeTaken()
	nb_persons = getNbPersonsBuilding()
	extra_need = sum([specialCleaning[i] * time_per_special[i] * nb_persons[i] for i in range(len(time_per_special))])
	capacity = []
	capacity_pool = []
	upfront = nr_no_inter * 4
	nr_people = nr_interim + nr_no_inter
	total_to_check = len(all_bungalows) + extra_need
	people_pool = nb_persons[5]
	if total_to_check > upfront:
		total_to_check -= nr_no_inter * 4
		per_person = total_to_check // nr_people
		rest = total_to_check % nr_people
		for i in range(nr_no_inter):
			if rest > 0:
				capacity.append(per_person + 4 + 1)
				rest -= 1
			else:
				capacity.append(per_person + 4)
			if people_pool > 0:
				capacity_pool.append(1 * specialCleaning[5])
				people_pool -= 1
			else:
				capacity_pool.append(0)
		for i in range(nr_interim):
			if rest > 0:
				capacity.append(per_person + 1)
				rest -= 1
			else:
				capacity.append(per_person)
			if people_pool > 0:
				capacity_pool.append(1 * specialCleaning[5])
				people_pool -= 1
			else:
				capacity_pool.append(0)
	else:
		for i in range(nr_no_inter):
			capacity.append(4)
			if people_pool > 0:
				capacity_pool.append(1 * specialCleaning[5])
				people_pool -= 1
			else:
				capacity_pool.append(0)
		for i in range(nr_interim):
			capacity.append(0)
			if people_pool > 0:
				capacity_pool.append(1 * specialCleaning[5])
				people_pool -= 1
			else:
				capacity_pool.append(0)
	locations = [(422, 819)]
	demands_total = [0]
	demands_pool = []
	for b in all_bungalows:
		locations.append(getCoordinates(int(b)))
		demands_total.append(1)
		demands_pool.append(0)
	for i in range(len(specialCleaning)):
		if specialCleaning[i] != 0:
			if nr_people >= nb_persons[i]:
				for j in range(specialCleaning[i]):
					for _ in range(nb_persons[i]):
						locations.append(getCoordinatesBuilding(i + 1))
						demands_total.append(time_per_special[i])
						if i == 5:
							demands_pool.append(1)
						else:
							demands_pool.append(0)
			else:
				for j in range(specialCleaning[i]):
					for _ in range(nr_people):
						locations.append(getCoordinatesBuilding(i + 1))
						demands_total.append(time_per_special[i])
						if i == 5:
							demands_pool.append(1)
						else:
							demands_pool.append(0)
	data = {'locations': locations, 'num_vehicles': nr_people, 'depot': 0, 'demands_total': demands_total,
	        'vehicle_capacities_total': capacity, 'demands_pool': demands_pool, 'pool_capacity': capacity_pool}
	
	return data
