#TABLES EXAMPLES

### Bungalow

```js
[
    {
        Id: 1,
        xCoordinate: 964,
        yCoordinate: 432
    },{
        Id: 2,
        xCoordinate: 948,
        yCoordinate: 471
    }  
]
```

### Equipe

````js
[
    {
        ID: 1,
        Nom1: "Goovaerts",
        Prenom1: "Thibeau",
        Nom2: "Geens",
        Prenom2: "Sofie",
        NumeroEquipe: 1,
        Date: "2021-06-04"
    },{
        ID: 2,
        Nom1: "Goovaerts",
        Prenom1: "Thibeau",
        Nom2: null,
        Prenom2: null,
        NumeroEquipe: 1,
        Date: "2021-06-05"
    }  
]
````

### Waarborg

````js
[
    {
        ID: 1,
        Linge: true,
        Vaiselle: true,
        Poubelle: false,
        Sale: true,
        Degats: true,
        Remarques: null
    },{
        ID: 2,
        Linge: true,
        Vaiselle: true,
        Poubelle: true,
        Sale: true,
        Degats: false,
        Remarques: "Vase cassé"
    }
]
````


### Controle_apres

````js
[
    {
        ID: 1,
        IdPersonel: 5,
        Date: "2021-06-05",
        Done: true
    },{
        ID: 2,
        IdPersonel: 4,
        Date: "2021-06-05",
        Done: false
    }
]
````

### Personel

````js
[
    {
        ID: 1,
        Name: "Thibeau",
        Passwd: "1234",
        Departement: 2
    },{
          ID: 1,
          Name: "Monique",
          Passwd: "1234",
          Departement: 3
      }
]
````

### Acceuil

````js
[
    {
        ID: 1,
        IdPersonel: 5,
        Date: "2021-06-05",
        Done: true
    },{
        ID: 2,
        IdPersonel: 4,
        Date: "2021-06-05",
        Done: false
    }
]
````

### Check_Caution

````js
[
    {
        ID: 1,
        IdPersonel: 5,
        Date: "2021-06-05",
        Done: true,
        IdWaarborg: 2
    },{
        ID: 2,
        IdPersonel: 4,
        Date: "2021-06-05",
        Done: false,
        IdWaarborg: 1
    }
]
````

### Schoonmaak

````js
[
    {
        Boekingsnummer: 20210001,
        IdBungalow: 1,
        Date_make: "2021-06-05",
        Reloue: false,
        Done: false,
        IdEquipe: 2,
        IdControleApres: 2,
        IdAcceuil: 5,
        IdCheck_Caution: 2
    },{
        Boekingsnummer: 20210002,
        IdBungalow: 5,
        Date_make: "2021-06-05",
        Reloue: true,
        Done: true,
        IdEquipe: 2,
        IdControleApres: 5,
        IdAcceuil: 4,
        IdCheck_Caution: 7
    }
]
````

### Commentaire

````js
[
    {
        ID: 1,
        Commentaire: "Souris dans la cuisine, escalier",
        Date: "2021-06-05",
        Boekingsnummer_schoonmaak: 20210001
    },{
        ID: 2,
        Commentaire: "Poubelles sont laissé",
        Date: "2021-06-12",
        Boekingsnummer_schoonmaak: 20210001
    }
]
````

### Photo

````js
[
    {
        ID: 1,
        Photo_path: "..photos/aaee4252.png",
        Date: "2021-06-05",
        Boekingsnummer_schoonmaak: 20210001
    },{
        ID: 1,
        Photo_path: "..photos/zeifgfegz.png",
        Date: "2021-06-05",
        Boekingsnummer_schoonmaak: 20210001
    }
]
````


## UNITS

### Bungalow

```js
[
    {
        Id: int,
        xCoordinate: int,
        yCoordinate: int
    }
]
```

### Equipe

````js
[
    {
        ID: int,
        Nom1: varchar,
        Prenom1: varchar,
        Nom2: varchar,
        Prenom2: varchar,
        NumeroEquipe: int,
        DateEquipe: date
    }
]
````

### Waarborg

````js
[
    {
        ID: int,
        Linge: boolean,
        Vaiselle: boolean,
        Poubelle: boolean,
        Sale: boolean,
        Degats: boolean,
        Remarques: text
    }
]
````


### Controle_apres

````js
[
    {
        ID: int,
        IdPersonel: int,
        Date: date,
        Done: boolean
    }
]
````

### Personel

 For Departement, we use the following scheme,
 - 1: admin
 - 3: receptie
 - 4: schoonmaak
````js
[
    {
        ID: int,
        Name: varchar,
        Passwd: password,
        Departement: int
    }
]
````

### Acceuil

````js
[
    {
        ID: int,
        IdPersonel: int,
        Date: date,
        Done: boolean
    }
]
````

### Check_Caution

````js
[
    {
        ID: int,
        IdPersonel: int,
        Date: date,
        Done: boolean,
        IdWaarborg: int
    }
]
````

### Schoonmaak

````js
[
    {
        Boekingsnummer: int,
        IdBungalow: int,
        Date_make: date,
        Reloue: boolean,
        Done: boolean,
        IdEquipe: int,
        IdControleApres: int,
        IdAcceuil: int,
        IdCheck_Caution: int
    }
]
````

### Commentaire

````js
[
    {
        ID: 1,
        Commentaire: "Souris dans la cuisine, escalier",
        Date: "2021-06-05",
        Boekingsnummer_schoonmaak: 20210001
    }
]
````

### Photo

````js
[
    {
        ID: 1,
        Photo_path: "..photos/aaee4252.png",
        Date: "2021-06-05",
        Boekingsnummer_schoonmaak: 20210001
    }
]
````