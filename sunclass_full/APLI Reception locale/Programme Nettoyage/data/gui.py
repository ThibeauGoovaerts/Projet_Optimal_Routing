from tkinter import Tk, HORIZONTAL, Button, Label, ttk, Text, Entry, IntVar, Toplevel
from tkinter.ttk import Progressbar
import mysql.connector
from mysql.connector import errorcode
from settings.test_modify_parametres import main_parametres
import sys
import os
from PIL import Image
from collectData import mainCollectData
from SystemInput import readExcel
from testTD import getNewTaches
from ortoolsPart import findSolutionInterims, divide_teams_in_controls, divide_controls_mains
from retrieveData import getNumberMainControllers, getListWorkingLadies
from fillDB import compute_documents_main_workers, fillLadiesInterims
from fpdf import FPDF


# redirects a standard output to a text field whenever turned on
class StdoutRedirector(object):
    def __init__(self, text_widget):
        self.text_space = text_widget

    def write(self, string):
        self.text_space.insert('end', string)
        self.text_space.see('end')

    def flush(self):
        pass


def find_equipes_db(file_name):
    try:
        mydb = mysql.connector.connect(
            host="ID355097_sunclass.db.webhosting.be",
            user="ID355097_sunclass",
            password='Sunclass6970',
            database='ID355097_sunclass'
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')
    cursor = mydb.cursor(buffered=True)
    cursor.execute(
        "SELECT s.`IdBungalow`, e.Nom1, e.Prenom1, s.Reloue FROM `Schoonmaak` s inner join equipe e on s.IdEquipe=e.Id where e.DateEquipe=date(now())")
    teams = cursor.fetchall()
    names = []
    for i in teams:
        bool = False
        for j in names:
            if i[1] == j['nom'] and i[2] == j['prenom']:
                j['nr'].append(i[0])
                j['reloue'].append(i[3])
                bool = True
        if not bool:
            names.append({
                'nom': i[1],
                'prenom': i[2],
                'nr': [i[0]],
                'reloue': [i[3]]
            })
    my_path = desktop + f"/schoonmaaklijst/{file_name}/"
    with open(my_path + "InterimAll.txt", "w") as f:
        for i in names:
            f.write(str(i['prenom'] + " " + i['nom']) + "\n")
            f.write("--------------------\n")
            for j in range(len(i['nr'])):
                if i['reloue'][j] == 1:
                    f.write(str(i['nr'][j]) + " R, ")
                else:
                    f.write(str(i['nr'][j]) + ", ")
            f.write("\n\n\n")
    return


def prepare_database():
    print("Preparation de la base de données, si ceci est une deuxieme execution, les données seront écrasés!")
    root.update_idletasks()
    root.update()
    try:
        mydb = mysql.connector.connect(
            host="ID355097_sunclass.db.webhosting.be",
            user="ID355097_sunclass",
            password='Sunclass6970',
            database='ID355097_sunclass'
        )
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None

    cursor = mydb.cursor(buffered=True)
    cursor.execute(
        f"update Schoonmaak set Done=1 where Reloue=1 and (select ControleApres.DateControlApres from ControleApres where Id=Schoonmaak.IdControleApres)<>date(now())")
    mydb.commit()
    cursor.execute(
        f"DELETE FROM `LadiesInterims` WHERE `DateMade`=date(now())")
    mydb.commit()
    cursor.execute(
        f"DELETE FROM femmeDistributeur WHERE `dateDistributeur`=date(now())")
    mydb.commit()
    cursor.execute(
        f"UPDATE Schoonmaak set IdEquipe=null where IdEquipe>=(SELECT MIN(equipe.Id) from equipe where equipe.DateEquipe=date(now()))")
    mydb.commit()
    cursor.execute(
        f"DELETE FROM `equipe` WHERE `DateEquipe`=date(now())")
    mydb.commit()
    cursor.execute(
        f"DELETE FROM `SchoonmaakEigen` WHERE `DateMade`=date(now())")
    mydb.commit()
    cursor.close()
    mydb.close()
    return


# Will quit the GUI
def stop_program():
    root.destroy()
    root.quit()
    sys.exit()


# Makes one pdf for easier printing from all the different png files
def images_to_pdf(imagelist, file_name):
    pdf = FPDF()
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')
    # We add all pages in imagelist to the pdf, this includes all teams plus all overviews, this excludes all general
    # overviews
    for image in imagelist:
        cache = Image.open(image)
        cache2 = cache.rotate(90, expand=True)
        cache2.save(image)
        pdf.add_page()
        pdf.image(image, w=180, h=260)
    pdf.output(desktop + f"/schoonmaaklijst/{file_name}/recapitulatif_IMPRIMER.pdf", "F")


# We update the progress bar fully, this to get rid of inaccurate behaviour


def programLaunch(waitVariable1, waitVariable2, waitVariable3, waitVariable4):
    btn = root.nametowidget('start_button')
    btn.config(state='disabled')
    btn['text'] = "Running"
    # TD program to put taches journaliere in place
    # getNewTaches()
    # prepare_database()
    reloue, departs, acceuils, check_Caution, boekingsnummers_bungnummer, file_name, needControle = readExcel()
    
    if not departs:
        mainCollectData(waitVariable1, waitVariable2, waitVariable3, waitVariable4, root, False)
    else:
        mainCollectData(waitVariable1, waitVariable2, waitVariable3, waitVariable4, root, True)
    
    root.update_idletasks()
    root.update()
    if reloue is None and departs is None and acceuils is None and check_Caution is None:
        return
    if not departs:
        division_interims, imagelist = [], []
    else:
        division_interims, imagelist = findSolutionInterims(reloue, departs, file_name, root)
    
    nr_interim, nr_no_inter = getNumberMainControllers()
    if not departs:
        nr_no_inter += nr_interim
        nr_interim = 0
    working_ladies = getListWorkingLadies()
    fillLadiesInterims(nr_interim, nr_no_inter, working_ladies)
    nr_all = nr_interim + nr_no_inter
    if not departs:
        apres_midi = [[] for _ in range(nr_all)]
    else:
        apres_midi = divide_teams_in_controls(division_interims, nr_all)
        
    avant_midi = divide_controls_mains(check_Caution, acceuils, nr_interim, nr_no_inter, needControle)
    
    if apres_midi == [] or avant_midi == []:
        print(">> Quelque chose ne marche pas dans la division des teams.")
        return
    
    imagelist = imagelist + compute_documents_main_workers(
        apres_midi=apres_midi,
        chalets_equipes=division_interims,
        acceuil=acceuils,
        avant_midi=avant_midi,
        reloue=reloue,
        departures=check_Caution,
        boekingsnummers_bungnummer=boekingsnummers_bungnummer)
    images_to_pdf(imagelist, file_name)
    find_equipes_db(file_name)
    root.destroy()


def main_gui():
    # --------------  INITIALISATION ----------------------
    # initialises the text box
    text_box = Text(root, wrap='word', height=10, width=75, bg='lightgrey')
    waitVariable1 = IntVar()
    waitVariable2 = IntVar()
    waitVariable3 = IntVar()
    waitVariable4 = IntVar()
    start_btn = Button(root, text="Start",
                       command=lambda: programLaunch(waitVariable1, waitVariable2, waitVariable3, waitVariable4),
                       font=('Helvetica', 40, 'bold'), name='start_button')
    stop_btn = Button(root, text="Stop", command=stop_program, font=('Helvetica', 40, 'bold'), name='stop_button')

    # --------------  CONFIGURATION ----------------------
    # Configuration of both buttons
    start_btn.config(height=1, width=15, bg='darkgreen')
    stop_btn.config(height=1, width=15, bg='darkred')
    # Redirection of stdErr and stdOut
    sys.stdout = StdoutRedirector(text_box)
    sys.stderr = StdoutRedirector(text_box)

    # --------------  IMPLEMENTATION ----------------------
    start_btn.grid(row=11, column=0, columnspan=2, sticky='W')
    stop_btn.grid(row=11, column=2, pady=20, columnspan=2, sticky='E')
    c_span = 4
    text_box.grid(row=10, columnspan=c_span, pady=25)


global root
root = Tk()
main_gui()
root.mainloop()
