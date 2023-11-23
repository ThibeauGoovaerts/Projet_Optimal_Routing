import datetime
import mysql.connector
from mysql.connector import errorcode

weekdays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]


def getNewTaches():
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
	cursor.execute(f"Select Id, IdTache from Journaliere where Done=0 and Skip=0")
	allNotDone = [{"id": i[0], "Tache": i[1]} for i in cursor.fetchall()]
	cursor.execute(f"Select Id from TachesJournaliere where {weekdays[datetime.datetime.now().weekday()]}=1")
	data = [i[0] for i in cursor.fetchall()]
	reports = []
	finalize = []
	for i in allNotDone:
		if i["Tache"] not in data:
			reports.append(i["id"])
			print("Tache pas conclu hier et remise à aujourd'hui: ID" + str(i["id"]))
		else:
			finalize.append(i["id"])
	for i in data:
		cursor.execute(f"insert into Journaliere (IdTache, DatePlanned) values ({i}, date(now()))")
		mydb.commit()
	for i in finalize:
		cursor.execute(f"update Journaliere set Skip=1 where Id={i}")
		mydb.commit()


if __name__ == '__main__':
	getNewTaches()