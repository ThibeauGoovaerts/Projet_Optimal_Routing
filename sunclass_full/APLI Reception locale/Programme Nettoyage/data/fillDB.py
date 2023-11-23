import datetime
import mysql.connector
from mysql.connector import errorcode
import time
from retrieveData import getListWorkingLadies


class Equipe:
	def __init__(self, nom1, prenom1, nom2=None, prenom2=None, numero=0):
		self.nom1 = nom1
		self.prenom1 = prenom1
		self.prenom2 = prenom2
		self.numero = numero
		self.nom2 = nom2
		self.date = datetime.datetime.now()
	
	def putInDB(self):
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
		if self.nom2 is not None:
			command = "insert into equipe (Nom1, Prenom1, Nom2, Prenom2, NumeroEquipe, DateEquipe) values (%s, %s, %s, %s, %s, now())"
			values = (self.nom1, self.prenom1, self.nom2, self.prenom2, self.numero)
		else:
			command = "insert into equipe (Nom1, Prenom1, NumeroEquipe, DateEquipe) values (%s, %s, %s, now())"
			values = (self.nom1, self.prenom1, self.numero)
		cursor.execute(command, values)
		mydb.commit()
		cursor.close()
		mydb.close()


def make_both_parts_equal(avant_midi, apres_midi):
	new_apres_midi = [[] for _ in range(len(apres_midi))]
	cpt = 0
	ladies = getListWorkingLadies()
	finalListLadies = []
	for f in avant_midi:
		most = [0 for x in range(len(apres_midi))]
		for j in range(len(f)):
			for i in range(len(apres_midi)):
				if f[j] in apres_midi[i]:
					most[i] += 1
		f = most.index(max(most))
		while apres_midi[f] == []:
			if f == len(apres_midi)-1:
				break
			f += 1
		new_apres_midi[cpt] += apres_midi[f]
		finalListLadies.append(ladies[f])
		apres_midi[f] = []
		cpt += 1
	file = open("bin/femmes.txt", "w")
	for i in range(len(ladies)):
		file.write(ladies[i])
		if i != len(ladies) - 1:
			file.write(",")
	file.close()
	return new_apres_midi


def reform_teams(teams_division, teams):
	reformed = []
	for i in teams_division:
		cache = []
		for j in i:
			for b in teams[j - 1]:
				cache.append(b)
		reformed.append(cache)
	return reformed


def addLadiesDistributeur(name):
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
		f"INSERT INTO femmeDistributeur (idPersonel, dateDistributeur) values ((SELECT Id from Personel where NamePersonel='{name}') ,date(now()))")
	mydb.commit()
	


def fillLadiesInterims(nr_interim, nr_no_interim, list_ladies):
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
	for i in range(nr_interim):
		value = list_ladies[i]
		cursor.execute(
			f"INSERT INTO LadiesInterims (DateMade, IdPersonel, AcceuilInterim) values (date(now()), (SELECT Id from Personel where NamePersonel='{list_ladies[i]}'), 1)")
		mydb.commit()
	for i in range(nr_no_interim):
		cursor.execute(
			f"INSERT INTO LadiesInterims (DateMade, IdPersonel, AcceuilInterim) values (date(now()), (SELECT Id from Personel where NamePersonel='{list_ladies[i + nr_interim]}'), 0)")
		mydb.commit()
	cursor.close()


def eliminateOwnBuildings(avant_midi, mydb):
	cursor = mydb.cursor(buffered=True)
	list_working_ladies = getListWorkingLadies()
	freq_pool = 0
	for different_lady in range(len(avant_midi)):
		for item in avant_midi[different_lady]:
			if item == 'z':
				freq_pool += 1
	if len(avant_midi) == 1:
		freq_list = [(x + 1) for x in range(freq_pool)]
	else:
		freq_list = [(x % (freq_pool // 2)) + 1 for x in range(freq_pool)]
	index = 0
	for different_lady in range(len(avant_midi)):
		for item in avant_midi[different_lady]:
			command = (
				"insert into SchoonmaakEigen (DateMade, IdPersonel, Done, IdBuilding, block) values (now(), %s, False, %s, %s)")
			values = None
			cursor.execute(f"select Id from Personel where NamePersonel='{list_working_ladies[different_lady]}'")
			Id_lady = int(cursor.fetchone()[0])
			if item == 'b':
				values = (Id_lady, 1, 0)
			if item == 'w':
				values = (Id_lady, 2, 0)
			if item == 'f':
				values = (Id_lady, 3, 0)
			if item == 'c':
				values = (Id_lady, 4, 0)
			if item == 'r':
				values = (Id_lady, 5, 0)
			if item == 'z':
				values = (Id_lady, 6, freq_list[index])
				index += 1
			if values is not None:
				cursor.execute(command, values)
				mydb.commit()
		avant_midi[different_lady] = [x for x in avant_midi[different_lady] if
		                              x != 'b' and x != 'w' and x != 'f' and x != 'c' and x != 'r' and x != 'z']
	cursor.close()
	return avant_midi


def findBoekingsnummer(boekingsnummers_bungnummer, bng):
	for i in boekingsnummers_bungnummer:
		if i['bung_nummer'] == bng:
			return i['boekingsnummer']
	return None


def getId(list_ladies, bungalow_nb, mydb):
	time.sleep(0.5)
	cursor = mydb.cursor(buffered=True)
	list_working_ladies = getListWorkingLadies()
	for lady in range(len(list_ladies)):
		if bungalow_nb in list_ladies[lady]:
			cursor.execute(f"select Id from Personel where NamePersonel='{list_working_ladies[lady]}'")
			id = int(cursor.fetchone()[0])
			cursor.close()
			return id
	return None


def FindSchoonmaakWaarborg(bungalow_nr, boekingsnummers_bungnummer, mydb):
	cursor = mydb.cursor(buffered=True)
	cursor.execute(
		f"select Id from Schoonmaak where (select done from CheckCaution where Id=IdCheckCaution)=False and Done=False and IdBungalow={bungalow_nr}")
	id = cursor.fetchone()
	if id is None:
		boekingsnummer = findBoekingsnummer(boekingsnummers_bungnummer, bungalow_nr)
		if boekingsnummer is None:
			cursor.execute(
				f"select Id from Schoonmaak where Done=False and IdBungalow={bungalow_nr} and (select done from CheckCaution where Id=IdCheckCaution)=True")
			id = cursor.fetchone()
			if id is not None:
				cursor.close()
				return id[0], 1
		command = (
			"insert into Schoonmaak (Boekingsnummer, IdBungalow, DateMake, Reloue, Done) values (%s, %s, date(now()), %s, false)")
		values = (boekingsnummer, bungalow_nr, False)
		cursor.execute(command, values)
		mydb.commit()
		cursor.close()
		return cursor.lastrowid, 0
	else:
		cursor.close()
		return id[0], 0


def findSchoonmaakTotal(bungalow_nr, boekingsnummers_bungnummer, reloue, IdEquipe, mydb):
	cursor = mydb.cursor(buffered=True)
	cursor.execute(
		f"select Id from Schoonmaak where IdBungalow={bungalow_nr} and Done=0")
	id = cursor.fetchone()
	if id is None:
		boekingsnummer = findBoekingsnummer(boekingsnummers_bungnummer, bungalow_nr)
		command = (
			"insert into Schoonmaak (Boekingsnummer, IdBungalow, DateMake, Reloue, Done, IdEquipe) values (%s, %s, date(now()), %s, false, %s)")
		values = (boekingsnummer, bungalow_nr, reloue, IdEquipe)
		cursor.execute(command, values)
		mydb.commit()
		cursor.close()
		return cursor.lastrowid, 0
	else:
		id_cursor = id[0]
		cursor.execute(
			f"select CheckCaution.done from CheckCaution where CheckCaution.Id=(select IdCheckCaution from Schoonmaak where Id={id_cursor})")
		done_cursor = cursor.fetchone()
		cursor.execute(
			f"update Schoonmaak set IdEquipe={IdEquipe}, Reloue={reloue} where Id={id_cursor}")
		mydb.commit()
		cursor.close()
		if done_cursor is None:
			return id_cursor, 0
		return id_cursor, done_cursor[0]


def FindSchoonmaakAcceuil(bungalow_nr, mydb):
	cursor = mydb.cursor(buffered=True)
	cursor.execute(
		f"select Id from Schoonmaak where IdBungalow={bungalow_nr} and Reloue=false and Done=False")
	id = cursor.fetchone()
	if id is None:
		command = ("insert into Schoonmaak (IdBungalow, DateMake, Reloue, Done) values (%s, date(now()), %s, false)")
		values = (bungalow_nr, False)
		cursor.execute(command, values)
		mydb.commit()
		cursor.close()
		return cursor.lastrowid
	else:
		cursor.close()
		return id[0]


def FindSchoonmaakControle(bungalow_nr, mydb):
	cursor = mydb.cursor(buffered=True)
	cursor.execute(
		f"select Id from Schoonmaak where IdBungalow={bungalow_nr} and Reloue=false and Done=False")
	id = cursor.fetchone()
	if id is None:
		command = ("insert into Schoonmaak (IdBungalow, DateMake, Reloue, Done) values (%s, date(now()), %s, false)")
		values = (bungalow_nr, False)
		cursor.execute(command, values)
		mydb.commit()
		cursor.close()
		return cursor.lastrowid
	else:
		cursor.close()
		return id[0]


def insertAcceuil(id_schoonmaak, id_lady, mydb):
	cursor = mydb.cursor(buffered=True)
	command = ("insert into Acceuil (DateAcceuil, idPersonel, Done) values (date(now()), %s, %s)")
	values = (id_lady, False)
	cursor.execute(command, values)
	mydb.commit()
	id_acceuil = cursor.lastrowid
	command = ("update Schoonmaak set idAcceuil=%s where Id=%s")
	values = (id_acceuil, id_schoonmaak)
	cursor.execute(command, values)
	mydb.commit()
	cursor.close()


def insertCheckCaution(id_schoonmaak, id_lady, mydb):
	cursor = mydb.cursor(buffered=True)
	command = ("insert into waarborg (Done, Linge, Vaiselle, Poubelle, Sale, Degats) values (%s, %s, %s, %s, %s, %s)")
	values = (False, False, False, False, False, False)
	cursor.execute(command, values)
	mydb.commit()
	id_waarborg = cursor.lastrowid
	command = ("insert into CheckCaution (IdPersonel, DateAcceuil, done, IdWaarborg) values (%s, date(now()), %s, %s)")
	values = (id_lady, False, id_waarborg)
	cursor.execute(command, values)
	mydb.commit()
	id_caution = cursor.lastrowid
	command = ("update Schoonmaak set idCheckCaution=%s where Id=%s")
	values = (id_caution, id_schoonmaak)
	cursor.execute(command, values)
	mydb.commit()
	cursor.close()


def insertControleApres(id_schoonmaak, id_lady, mydb):
	cursor = mydb.cursor(buffered=True)
	command = ("insert into ControleApres (IdPersonel, DateControlApres, done) values (%s, date(now()), %s)")
	values = (id_lady, False)
	cursor.execute(command, values)
	mydb.commit()
	id_caution = cursor.lastrowid
	command = ("update Schoonmaak set IdControleApres=%s where Id=%s")
	values = (id_caution, id_schoonmaak)
	cursor.execute(command, values)
	mydb.commit()
	cursor.close()


def findIdEquipe(chalets_equipes, bungalow_nb, mydb):
	cursor = mydb.cursor(buffered=True)
	for equipe in range(len(chalets_equipes)):
		if bungalow_nb in chalets_equipes[equipe]:
			cursor.execute(f"select Id from equipe where NumeroEquipe={equipe + 1} and DateEquipe=date(now())")
			id = int(cursor.fetchone()[0])
			cursor.close()
			return id
	return None

def eraseProblemsDoubleChalets(mydb):
    cursor = mydb.cursor(buffered=True)
    cache_value = 0
    for i in range(237):
        cursor.execute(f"SELECT COUNT(Id), Id FROM `Schoonmaak` WHERE `IdBungalow`={i+1} and Done=0")
        a = cursor.fetchone()
        if a[0] > 1:
            if a[0] > cache_value:
                cache_value = a[0]
            print(f"Probleme trouvé à l'hauteur du chalet {i+1}")
            cursor.execute(f"update Schoonmaak set Done=1 where Id={a[1]}")
            mydb.commit()
            print(f"Probleme {i + 1}: RESOLU")
    return cache_value


def compute_documents_main_workers(apres_midi, chalets_equipes, acceuil, avant_midi, reloue, departures,
                                   boekingsnummers_bungnummer):
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
	
	avant_midi = eliminateOwnBuildings(avant_midi, mydb)
	bungalows_apres_midi = reform_teams(apres_midi, chalets_equipes)
	bungalows_apres_midi = make_both_parts_equal(avant_midi, bungalows_apres_midi)
	all_bungalows_apres = []
	all_bungalows_avant = []
	
	for i in bungalows_apres_midi:
		for b in i:
			all_bungalows_apres.append(b)
	for i in avant_midi:
		for b in i:
			all_bungalows_avant.append(b)
	
	all_bungalows = list(set(all_bungalows_avant + all_bungalows_apres))
	for bungalow in all_bungalows:
		# only an acceuil
		if bungalow in acceuil:
			insertAcceuil(FindSchoonmaakAcceuil(bungalow, mydb), getId(avant_midi, bungalow, mydb), mydb)
		# only checking the waarborg
		elif bungalow not in all_bungalows_apres and bungalow in departures:
			id, done = FindSchoonmaakWaarborg(bungalow, boekingsnummers_bungnummer, mydb)
			if done == 0:
				insertCheckCaution(id, getId(avant_midi, bungalow, mydb), mydb)
		# all except for acceuil
		elif bungalow in all_bungalows_apres and bungalow in departures:
			Id_schoonmaak, done = findSchoonmaakTotal(bungalow, boekingsnummers_bungnummer, bungalow in reloue,
			                                          findIdEquipe(chalets_equipes, bungalow, mydb), mydb)
			if done == 0:
				insertCheckCaution(Id_schoonmaak, getId(avant_midi, bungalow, mydb), mydb)
			insertControleApres(Id_schoonmaak, getId(bungalows_apres_midi, bungalow, mydb), mydb)
		elif bungalow in all_bungalows_apres and bungalow not in departures:
			Id_schoonmaak, done = findSchoonmaakTotal(bungalow, boekingsnummers_bungnummer, bungalow in reloue,
			                                    findIdEquipe(chalets_equipes, bungalow, mydb), mydb)
			insertControleApres(Id_schoonmaak, getId(bungalows_apres_midi, bungalow, mydb), mydb)
		elif bungalow in all_bungalows_avant:
			Id_schoonmaak = FindSchoonmaakControle(bungalow, mydb)
			insertControleApres(Id_schoonmaak, getId(avant_midi, bungalow, mydb), mydb)
	degreeProblem = eraseProblemsDoubleChalets(mydb)
	if degreeProblem > 1:
		i = 0
		while i < degreeProblem:
			eraseProblemsDoubleChalets(mydb)
			i += 1
	return []
