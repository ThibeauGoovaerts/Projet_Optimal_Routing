import mysql.connector
from mysql.connector import errorcode
import os
import datetime
import time

def readParams(bng_orava_list: bool = False, reloue_equipe1: bool = False, reloue_equipe2: bool = False,
               timer: bool = False, clean_all: bool = False, bungalows_not_renting: bool = False, total1: bool= False, total2: bool= False):
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
    
    if bng_orava_list:
        cursor.execute("select Id from bungalow where orava=1")
        data = [i[0] for i in cursor.fetchall()]
        return data
    if reloue_equipe1:
        cursor.execute("select reloue1 from settings where Id=1")
        return int(cursor.fetchone()[0])
    if reloue_equipe2:
        cursor.execute("select reloue2 from settings where Id=1")
        return int(cursor.fetchone()[0])
    if timer:
        cursor.execute("select timer from settings where Id=1")
        return int(cursor.fetchone()[0])
    if clean_all:
        cursor.execute("select cleanAll from settings where Id=1")
        return cursor.fetchone()[0]
    if bungalows_not_renting:
        cursor.execute("select Id from bungalow where location=1")
        data = [i[0] for i in cursor.fetchall()]
        return data
    if total1:
        cursor.execute("select total1 from settings where Id=1")
        return int(cursor.fetchone()[0])
    if total2:
        cursor.execute("select total2 from settings where Id=1")
        return int(cursor.fetchone()[0])
    else:
        return []


def getNumberMainControllers():
    f = open("bin/femmes.txt", "r")
    whole_line = f.read()
    splitted = whole_line.split(",")
    total_nb = len(splitted)
    nbINTERIMS = getNbInterims()
    total = nbINTERIMS[0] + nbINTERIMS[1]
    interim = min((total // 10)+1, total_nb)
    not_interim = total_nb - interim
    return interim, not_interim


def getNameEquipe(nb):
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
    cursor.execute(f"SELECT Nom1, Prenom1, Nom2, Prenom2 from equipe where DateEquipe=date(now()) and NumeroEquipe={nb}")
    crew = cursor.fetchone()
    crew = [x for x in crew if x is not None]
    cursor.close()
    mydb.close()
    return crew


def getNamesOfLadies():
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
    cursor.execute("SELECT Id, NamePersonel FROM Personel where Departement=4 and Actif=1")
    crew = []
    for (Id, NamePersonel) in cursor:
        crew.append({"Id": Id, "NamePersonel": NamePersonel})
    cursor.close()
    mydb.close()
    return crew


def getListWorkingLadies():
    f = open("bin/femmes.txt", "r")
    whole_line = f.read()
    f.close()
    splitted = whole_line.split(",")
    result = []
    for i in splitted:
        result.append(i)
    return result


def getAddedReloues():
    f = open("bin/ajouts.txt", "r")
    whole_line = f.read()
    splitted = whole_line.split(";")
    reloue = []
    for i in splitted[0].split(","):
        if not i == '':
            reloue.append(int(i))
    return reloue


def getAddDeparts():
    f = open("bin/ajouts.txt", "r")
    whole_line = f.read()
    splitted = whole_line.split(";")
    departs = []
    for i in splitted[1].split(","):
        if not i == '':
            departs.append(int(i))
    return departs


def getAddCheckCaution():
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
    cursor.execute("select IdBungalow from Schoonmaak where (select done from CheckCaution where Id=IdCheckCaution)=False and Done=False and Cleaned=0 and Reloue=0")
    data = [i[0] for i in cursor.fetchall()]
    cursor.close()
    mydb.close()
    return data


def getNotCleaned():
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
    cursor.execute("SELECT IdBungalow FROM Schoonmaak where Done=False and (IdControleApres is null or (select done from ControleApres where Id=IdControleApres)=false) and Cleaned=0 and Schoonmaak.IdAcceuil is null")
    data = [i[0] for i in cursor.fetchall()]
    cursor.close()
    mydb.close()
    return data


def getNeedControle():
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
    cursor.execute("SELECT IdBungalow FROM Schoonmaak where Done=False and Skip=1 and Cleaned=1 and Reloue=0")
    data = [i[0] for i in cursor.fetchall()]
    cursor.close()
    mydb.close()
    return data


def getCoordinates(nr):
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
    cursor.execute(f"select xCoordinate, yCoordinate from bungalow where Id={nr}")
    line = cursor.fetchone()
    cursor.close()
    mydb.close()
    time.sleep(0.5)
    return int(line[0]), int(line[1])


def getCleaningOfSpecials():
    weekday = datetime.datetime.now().weekday()
    scheme_cleaning = [4,1,5,3,7,2,6]
    nb_to_check_in_db = scheme_cleaning[weekday]
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
    cursor.execute(f"select frequency from Building")
    data = [i[0] for i in cursor.fetchall()]
    return_data = [0, 0, 0, 0, 0, 0]
    counter = 0
    for i in data:
        while int(i) > 7:
            return_data[counter] += 1
            i = int(i) - 7
        if int(i) >= nb_to_check_in_db:
            return_data[counter] += 1
        counter += 1
    cursor.close()
    mydb.close()
    return return_data


def getTimeTaken():
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
    cursor.execute(f"select TimeTaken from Building")
    data = [i[0] for i in cursor.fetchall()]
    cursor.close()
    mydb.close()
    return data


def getNbPersonsBuilding():
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
    cursor.execute(f"select NbPersons from Building")
    data = [i[0] for i in cursor.fetchall()]
    cursor.close()
    mydb.close()
    return data


def getCoordinatesBuilding(Id):
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
    cursor.execute(f"select xCoordinate, yCoordinate from Building where Id={Id}")
    data = cursor.fetchone()
    cursor.close()
    mydb.close()
    return int(data[0]), int(data[1])


def getDescriptionBuilding(Id):
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
    cursor.execute(f"select Beschrijving from Building where Id={Id}")
    data = cursor.fetchone()
    cursor.close()
    mydb.close()
    return data[0][:1]


def getNbInterims():
    f = open("bin/teams.txt", "r")
    whole_line = f.read()
    splitted = whole_line.split(";")
    return int(splitted[0]), int(splitted[1])