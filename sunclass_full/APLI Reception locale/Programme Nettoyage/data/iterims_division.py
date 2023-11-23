import mysql.connector
from mysql.connector import errorcode
import os

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
    cursor.execute("SELECT s.`IdBungalow`, e.Nom1, e.Prenom1, s.Reloue FROM `Schoonmaak` s inner join equipe e on s.IdEquipe=e.Id where e.DateEquipe=date(now())")
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
    with open(my_path+"InterimAll.txt", "w") as f:
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

find_equipes_db("14-08-2021")

