from tkinter import Tk, HORIZONTAL, Button, Label, ttk, Text, Entry, IntVar, Toplevel, Canvas
from tkinter.ttk import Progressbar
import os
from retrieveData import getNamesOfLadies, getNbInterims
import time
from fillDB import Equipe, addLadiesDistributeur
import random


def collectNbEquipes(waitvariable, needInterims):
    master1 = Toplevel()
    master1.geometry()
    master1.title("VERIFIER ACCEUILS")
    # initialises the first entry field, for the int representing the number of one person teams
    get_teams1 = Entry(master1, bg='lightgrey', width=20)
    # initialises the second entry field, for the int representing the number of two person teams
    get_teams2 = Entry(master1, bg='lightgrey', width=20)
    
    # initialises the button to confirm the number of teams, sets var to, this command is used to wait for the click of
    # this button
    def confirm_when_need_interim():
        teams1 = get_teams1.get()
        teams2 = get_teams2.get()
        try:
            if teams1 == '' or teams2 == '':
                ask_team1.config(bg='red')
                ask_team2.config(bg='red')
                return
            if int(teams1) == 0 and int(teams2) == 0:
                ask_team1.config(bg='red')
                ask_team2.config(bg='red')
                return
        except ValueError:
            ask_team1.config(bg='red')
            ask_team2.config(bg='red')
            return
        f = open("bin/teams.txt", "w")
        f.write(teams1 + ";" + teams2)
        f.close()
        waitvariable.set(1)
        master1.destroy()
        master1.update()
    
    def confirm_when_no_need_interim():
        teams1 = get_teams1.get()
        teams2 = get_teams2.get()
        try:
            if teams1 == '' or teams2 == '':
                ask_team1.config(bg='red')
                ask_team2.config(bg='red')
                return
            if int(teams1) < 0 or int(teams2) < 0:
                ask_team1.config(bg='red')
                ask_team2.config(bg='red')
                return
        except ValueError:
            ask_team1.config(bg='red')
            ask_team2.config(bg='red')
            return
        f = open("bin/teams.txt", "w")
        f.write(teams1 + ";" + teams2)
        f.close()
        waitvariable.set(1)
        master1.destroy()
        master1.update()
    
    if needInterims:
        confirm_teams_button = Button(master1, text="Bevestigen", command=confirm_when_need_interim)
    else:
        confirm_teams_button = Button(master1, text="Bevestigen", command=confirm_when_no_need_interim)
    # Initialise and configure the ask-numbers teams section
    ask_team1 = Label(master1, text='Aantal ploegen 1-persoon:', font=('Helvetica', 15, 'bold'), bg='lightgrey')
    ask_team2 = Label(master1, text='Aantal ploegen 2-persoon:', font=('Helvetica', 15, 'bold'), bg='lightgrey')
    confirm_teams_button.config(height=1, width=10, bg='orange')
    ask_team1.grid(row=1, pady=3, padx=3)
    get_teams1.grid(row=2, pady=3, padx=3)
    ask_team2.grid(row=3, pady=3, padx=3)
    get_teams2.grid(row=4, pady=3, padx=3)
    confirm_teams_button.grid(row=5, pady=3, padx=3)


def collectAddOns(waitVariable):
    addReloue = []
    addDepart = []
    root1 = Toplevel()
    root1.geometry("570x500")
    root1.config(bg='lightgrey')
    root1.title('Ajouter Chalets')
    
    def quit_t():
        f = open("bin/ajouts.txt", "w")
        for i in range(len(addReloue)):
            f.write(str(addReloue[i]))
            if i != len(addReloue) - 1:
                f.write(",")
        f.write(";")
        for i in range(len(addDepart)):
            f.write(str(addDepart[i]))
            if i != len(addDepart) - 1:
                f.write(",")
        f.close()
        waitVariable.set(1)
        root1.destroy()
    
    def change_color(btn):
        nr = int(btn['text'])
        # If they were not orava
        if btn['bg'] == 'red':
            btn['bg'] = 'green'
            addReloue.append(nr)
        elif btn['bg'] == 'green':
            btn['bg'] = 'orange'
            addReloue.remove(nr)
            addDepart.append(nr)
        elif btn['bg'] == 'orange':
            addDepart.remove(nr)
            btn['bg'] = 'red'
    
    for i in range(237):
        k = i
        rows = k // 20
        columns = k % 20
        button = Button(root1, text=str(i + 1), bg='red', height=1, width=2)
        button.configure(command=lambda btn=button: change_color(btn))
        button.grid(row=rows + 2, padx=2, pady=2, column=columns)
    Button(root1, text="Continuer", command=quit_t, bg="darkgrey", width=50, height=2).grid(columnspan=20, pady=5, padx=5)
    Label(root1, text='Rouge: rien\nVert: Reloué\nOrange: Départ', font=('Helvetica', 10, 'bold'), bg='lightgrey').grid(
        columnspan=20, pady=5, padx=5)


def getNamesEquipes(waitVariable4):
    def confirm(all_teams, two_teams):
        index = 0
        for i in range(len(all_teams)):
            if i < two_teams:
                e = Equipe(all_teams[index]['nom1'].get(), all_teams[index]['prenom1'].get(),
                           all_teams[index]['nom2'].get(), all_teams[index]['prenom2'].get(), index + 1)
            else:
                e = Equipe(all_teams[index]['nom'].get(), all_teams[index]['prenom'].get(), numero=index + 1)
            index += 1
            e.putInDB()
        waitVariable4.set(1)
        master4.destroy()
    
    master4 = Toplevel()
    master4.geometry("400x900")
    master4.title("Nom des equipes")
    container = ttk.Frame(master4, width=300, height=900)
    canvas = Canvas(container, width=300, height=900)
    scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
    scrollable_frame = ttk.Frame(canvas)
    scrollable_frame.bind(
        "<Configure>",
        lambda e: canvas.configure(
            scrollregion=canvas.bbox("all")
        )
    )
    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)
    one_member, two_member = getNbInterims()
    all_teams = []
    row_count = 0
    row_count = 0
    for i in range(two_member):
        Label(master=scrollable_frame, text="Equipe " + str(i + 1)).grid(row=row_count)
        cache_nom = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_nom.insert(0, "Nom")
        cache_prenom = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_prenom.insert(0, "Prenom")
        cache_nom2 = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_nom2.insert(0, "Nom")
        cache_prenom2 = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_prenom2.insert(0, "Prenom")
        all_teams.append({'nom1': cache_nom, 'prenom1': cache_prenom, 'nom2': cache_nom2, 'prenom2': cache_prenom2})
        cache_nom.grid(row=row_count + 1)
        cache_prenom.grid(row=row_count + 2)
        cache_nom2.grid(row=row_count + 3)
        cache_prenom2.grid(row=row_count + 4)
        row_count += 5
    for i in range(one_member):
        Label(master=scrollable_frame, text="Equipe " + str(i + 1 + two_member)).grid(row=row_count)
        cache_nom = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_nom.insert(0, "Nom")
        cache_prenom = Entry(scrollable_frame, bg='lightgrey', width=50)
        cache_prenom.insert(0, "Prenom")
        all_teams.append({"nom": cache_nom, "prenom": cache_prenom})
        cache_nom.grid(row=row_count + 1)
        cache_prenom.grid(row=row_count + 2)
        row_count += 3
    Button(scrollable_frame, text="Confirm", command=lambda: confirm(all_teams, two_member)).grid(row=row_count)
    container.pack()
    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")


def getWorkingLadies(waitVariable):
    master3 = Toplevel(width=1500, height=1500)
    master3.title("Qui est la aujourd'hui?")
    present = []
    distributeur = []
    
    def putPresent(but):
        if but['bg'] == 'red':
            but['bg'] = 'green'
            present.append(but['text'])
        elif but['bg'] == 'green':
            but['bg'] = 'purple'
            distributeur.append(but['text'])
        elif but['bg'] == 'purple':
            distributeur.remove(but['text'])
            but['bg'] = 'red'
            present.remove(but['text'])
    
    def quit_t(l):
        if len(present) == 0:
            l['bg'] = 'red'
            return
        random.shuffle(present)
        if distributeur:
            for i in distributeur:
                present.remove(i)
                present.append(i)
                addLadiesDistributeur(i)
        print(present)
        master3.update()
        time.sleep(5)
        f = open("bin/femmes.txt", "w")
        for i in range(len(present)):
            f.write(present[i])
            if i != len(present) - 1:
                f.write(",")
        f.close()
        waitVariable.set(1)
        master3.destroy()

    Label(master=master3, text="- Rouge: Absent").grid(row=1)
    Label(master=master3, text="- Vert: Present").grid(row=2)
    Label(master=master3, text="- Mauve: Present/Distributeur").grid(row=3)
    crew = getNamesOfLadies()
    rowCount = 4
    for i in crew:
        button = Button(master3, text=i['NamePersonel'], bg='red', height=1, width=15)
        button.configure(command=lambda but=button: putPresent(but))
        button.grid(row=rowCount, pady=10, padx=15)
        rowCount += 1
    b = Button(master3, text="Continuer", bg="darkgrey", width=50, height=2)
    b.config(command=lambda button=b: quit_t(button))
    b.grid(pady=5, padx=5)


def mainCollectData(waitVariable1, waitVariable2, waitVariable3, waitVariable4, root, needInterims):
    getWorkingLadies(waitVariable3)
    root.wait_variable(waitVariable3)
    
    collectNbEquipes(waitVariable1, needInterims)
    root.wait_variable(waitVariable1)

    collectAddOns(waitVariable2)
    root.wait_variable(waitVariable2)

    getNamesEquipes(waitVariable4)
    root.wait_variable(waitVariable4)
    
    return
