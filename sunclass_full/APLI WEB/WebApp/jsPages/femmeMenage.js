async function getBungalowCoordinates(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/bungalow/' +id.toString());
    return await response.json();
}

async function getKey(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getKey/' + name);
    return await response.json();
}

async function getCaution(name) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/schoonmaak/caution/' +name.toString());
    return await response.json();
}

async function getIdsDistributeurs() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/peronelDistributeur/');
    return await response.json();
}

async function personelWithId(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/personelWithId/' + id.toString());
    return await response.json();
}

async function getControle(name) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/schoonmaak/controle/' +name.toString());
    return await response.json();
}

async function getAcceuil(name) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/schoonmaak/acceuil/' +name.toString());
    return await response.json();
}

async function getEigen(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/schoonmaakeigen/' +name.toString());
    return await response.json();
}

async function getAcceuilInterims(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/acceuilInterims/' +name.toString());
    return await response.json();
}

async function getBlocksPiscine(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/blocksPool/' +name.toString());
    return await response.json();
}

async function getInterims(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/equipeNom/' +name.toString());
    return await response.json();
}

async function getReloueStatus(id){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getReloueStatus/' + id.toString());
    return await response.json();
}

async function getNamesInterimsPerBungalowCaution(nr){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getNamesInterimsPerBungalowCaution/' + nr.toString());
    return await response.json();
}

async function getNamesInterimsPerBungalowControl(nr){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getNamesInterimsPerBungalowControl/' + nr.toString());
    return await response.json();
}

function createDivToPlace(container){
    let divToPlace = document.createElement('div');
    divToPlace.id = "explainDiv";
    let closeExplainButton = document.createElement('button')
    closeExplainButton.id = "closeExplainButton";
    closeExplainButton.innerText = 'X';
    const parent = document.getElementById('mapPark');
    container.appendChild(closeExplainButton);
    closeExplainButton.onclick = () => {
        parent.removeChild(
            container);
    };
    return closeExplainButton
}

async function confirmWaarborg(remarque, nr, xCoordinate, yCoordinate){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    let names = await getNamesInterimsPerBungalowCaution(nr)
    names = names[0]
    commentBox.id = "commentBox"
    if (remarque === null){
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Caution</h1>'
    }
    else{
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Caution</h1><h1>' + remarque + '</h1>'
    }
    if (names === undefined){
        commentBox.innerHTML += '<form id="formCaution">' +
        '<input type="checkbox" id="linge" name="linge" value="linge"/>' +
        '<label for="linge"> Linge</label><br>'+
        '<input type="checkbox" id="vaiselle" name="vaiselle" value="vaiselle"/>'+
        '<label for="vaiselle"> Vaiselle</label><br>'+
        '<input type="checkbox" id="poubelle" name="poubelle" value="poubelle"/>'+
        '<label for="poubelle"> Poubelle</label><br>'+
        '<input type="checkbox" id="sale" name="sale" value="sale"/>'+
        '<label for="sale"> Sale</label><br>'+
        '<input type="checkbox" id="degats" name="degats" value="degats"/>'+
        '<label for="degats"> Degats</label><br><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' + 
        '<button id="confirmCaution" type="button">Valider</button>' + 
        '</form>'
    }else if (names.Nom2 == null){
        commentBox.innerHTML += '<h1>Interim: ' + names.Prenom1 + '</h1><form id="formCaution">' +
        '<input type="checkbox" id="linge" name="linge" value="linge"/>' +
        '<label for="linge"> Linge</label><br>'+
        '<input type="checkbox" id="vaiselle" name="vaiselle" value="vaiselle"/>'+
        '<label for="vaiselle"> Vaiselle</label><br>'+
        '<input type="checkbox" id="poubelle" name="poubelle" value="poubelle"/>'+
        '<label for="poubelle"> Poubelle</label><br>'+
        '<input type="checkbox" id="sale" name="sale" value="sale"/>'+
        '<label for="sale"> Sale</label><br>'+
        '<input type="checkbox" id="degats" name="degats" value="degats"/>'+
        '<label for="degats"> Degats</label><br><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' + 
        '<button id="confirmCaution" type="button">Valider</button>' + 
        '</form>'
    }else{
        commentBox.innerHTML += '<h1>Interims: ' + names.Prenom1 + ' + '+ names.Prenom2 + '</h1><form id="formCaution">' +
        '<input type="checkbox" id="linge" name="linge" value="linge"/>' +
        '<label for="linge"> Linge</label><br>'+
        '<input type="checkbox" id="vaiselle" name="vaiselle" value="vaiselle"/>'+
        '<label for="vaiselle"> Vaiselle</label><br>'+
        '<input type="checkbox" id="poubelle" name="poubelle" value="poubelle"/>'+
        '<label for="poubelle"> Poubelle</label><br>'+
        '<input type="checkbox" id="sale" name="sale" value="sale"/>'+
        '<label for="sale"> Sale</label><br>'+
        '<input type="checkbox" id="degats" name="degats" value="degats"/>'+
        '<label for="degats"> Degats</label><br><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' + 
        '<button id="confirmCaution" type="button">Valider</button>' + 
        '</form>'
    }

    commentBox.innerHTML += '<div id="TDAjout"><form id="formAcceuilDeppanage">' +
        '<label for="description">Dépanage:</label><br>'+
        '<input type="textarea" name="description" id="description"/><br>'+
        '<label for="cars">Level urgence:</label><br>' +
        '<select id="selectUrgence" name="cars">' +
        '<option value="2" id="normal">Normal (Blue)</option>' +
        '<option value="3" id="urgent">Urgent (Orange)</option>' +
        '<option value="1" id="purgent">Pas Urgent (Vert)</option>' +
        '</select><br>' +
        '<button id="confirmAjout" type="button">Ajouter</button>' +
        '</form></div>'

    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)

    document.getElementById('confirmAjout').addEventListener("click", async () => {
        const form = document.getElementById("formAcceuilDeppanage")
        let formData = {};
        formData["description"] =  form.description.value;
        formData["selectUrgence"] =  form.selectUrgence.value;
        formData["xCoordinate"] = xCoordinate;
        formData["yCoordinate"] = yCoordinate;
        formData["personel"] = sessionStorage.getItem('Member');
        console.log(formData)
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addDepanage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        document.getElementById("description").value = "Depannage envoyé !"
    })



    document.getElementById("confirmCaution").addEventListener('click', async () => {
        const form = document.getElementById("formCaution")
        let formData = {};
        formData["linge"] =  form.linge.checked;
        formData["vaiselle"] =  form.vaiselle.checked;
        formData["poubelle"] =  form.poubelle.checked;
        formData["sale"] =  form.sale.checked;
        formData["degats"] =  form.degats.checked;
        formData["remarque"] =  form.remarque.value;
        formData["nr"] =  nr;
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/waarborg', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
        });
        for (let i=0;i<form.files.files['length'];i++){
            let imageData = new FormData();
            imageData.append('image', form.files.files[i])
            let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/image-upload', {
              method: 'POST',
              body: imageData
            });
            let body = await response.json()
            urlImg = body.imageUrl
            let formData = {};
            formData["url"] = body.imageUrl;
            formData["nr"] =  nr;
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addPhoto', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
        closeExplainButton.click();
        location.reload();
    })
}

async function confirmAcceuil(nr, xCoordinate, yCoordinate){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    commentBox.innerHTML = '<h1>B' + nr.toString() +' - Acceuil</h1><form id="formAcceuil">' +
    '<label for="remarque">Remarque:</label><br>'+
    '<input type="text" name="remarque" id="remarque"/><br>'+
    '<label for="files">Select files:</label><br>' +
    '<input type="file" id="files" name="files" multiple><br>' + 
    '<button id="confirmAcceuil" type="button">Valider</button>' + 
    '</form>'


    commentBox.innerHTML += '<div id="TDAjout"><form id="formAcceuilDeppanage">' +
        '<label for="description">Dépanage:</label><br>'+
        '<input type="textarea" name="description" id="description"/><br>'+
        '<label for="cars">Level urgence:</label><br>' +
        '<select id="selectUrgence" name="cars">' +
        '<option value="2" id="normal">Normal (Blue)</option>' +
        '<option value="3" id="urgent">Urgent (Orange)</option>' +
        '<option value="1" id="purgent">Pas Urgent (Vert)</option>' +
        '</select><br>' +
        '<button id="confirmAjout" type="button">Ajouter</button>' +
        '</form></div>'

    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)

    document.getElementById('confirmAjout').addEventListener("click", async () => {
        const form = document.getElementById("formAcceuilDeppanage")
        let formData = {};
        formData["description"] =  form.description.value;
        formData["selectUrgence"] =  form.selectUrgence.value;
        formData["xCoordinate"] = xCoordinate;
        formData["yCoordinate"] = yCoordinate;
        formData["personel"] = sessionStorage.getItem('Member');
        console.log(formData)
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addDepanage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        document.getElementById("description").value = "Depannage envoyé !"
    })


    document.getElementById("confirmAcceuil").addEventListener('click', async () => {
        const form = document.getElementById("formAcceuil")
        let formData = {};
        formData["remarque"] =  form.remarque.value;
        formData["nr"] =  nr;
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/acceuil', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
        });
        for (let i=0;i<form.files.files['length'];i++){
            let imageData = new FormData();
            imageData.append('image', form.files.files[i])
            let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/image-upload', {
              method: 'POST',
              body: imageData
            });
            let body = await response.json()
            urlImg = body.imageUrl
            let formData = {};
            formData["url"] = body.imageUrl;
            formData["nr"] =  nr;
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addPhoto', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
        closeExplainButton.click();
        location.reload();
    })
}

async function confirmControle(nr, xCoordinate, yCoordinate){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    let names = await getNamesInterimsPerBungalowControl(nr)
    names = names[0]
    commentBox.id = "commentBox"
    if (names === undefined){
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Controle</h1><form id="formControle">' +
        '<input type="checkbox" id="renvoie" name="renvoie" value="renvoie"/>' +
        '<label for="renvoie"> Renvoié Equipe</label><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' +
        '<button id="confirmControle" type="button">Valider</button>' + 
        '<button id="skipControle" type="button">SKIP CONTROLE</button>' + 
        '<button id="skipNettoyage" type="button">SKIP NETTOYAGE</button>' + 
        '</form>'
    }else if (names.Nom2 == null){
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Controle</h1><h1>Interim: ' + names.Prenom1 + '</h1><form id="formControle">' +
        '<input type="checkbox" id="renvoie" name="renvoie" value="renvoie"/>' +
        '<label for="renvoie"> Renvoié Equipe</label><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' +
        '<button id="confirmControle" type="button">Valider</button>' + 
        '<button id="skipControle" type="button">SKIP CONTROLE</button>' + 
        '<button id="skipNettoyage" type="button">SKIP NETTOYAGE</button>' + 
        '</form>'
    }else{
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Controle</h1><h1>Interims: ' + names.Prenom1 + ' + '+ names.Prenom2 + '</h1><form id="formControle">' +
        '<input type="checkbox" id="renvoie" name="renvoie" value="renvoie"/>' +
        '<label for="renvoie"> Renvoié Equipe</label><br>'+
        '<label for="remarque">Remarque:</label><br>'+
        '<input type="text" name="remarque" id="remarque"/><br>'+
        '<label for="files">Select files:</label><br>' +
        '<input type="file" id="files" name="files" multiple><br>' +
        '<button id="confirmControle" type="button">Valider</button>' + 
        '<button id="skipControle" type="button">SKIP CONTROLE</button>' + 
        '<button id="skipNettoyage" type="button">SKIP NETTOYAGE</button>' + 
        '</form>'
    }

    commentBox.innerHTML += '<div id="TDAjout"><form id="formAcceuilDeppanage">' +
        '<label for="description">Dépanage:</label><br>'+
        '<input type="textarea" name="description" id="description"/><br>'+
        '<label for="cars">Level urgence:</label><br>' +
        '<select id="selectUrgence" name="cars">' +
        '<option value="2" id="normal">Normal (Blue)</option>' +
        '<option value="3" id="urgent">Urgent (Orange)</option>' +
        '<option value="1" id="purgent">Pas Urgent (Vert)</option>' +
        '</select><br>' +
        '<button id="confirmAjout" type="button">Ajouter</button>' +
        '</form></div>'

    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)

    document.getElementById('confirmAjout').addEventListener("click", async () => {
        const form = document.getElementById("formAcceuilDeppanage")
        let formData = {};
        formData["description"] =  form.description.value;
        formData["selectUrgence"] =  form.selectUrgence.value;
        formData["xCoordinate"] = xCoordinate;
        formData["yCoordinate"] = yCoordinate;
        formData["personel"] = sessionStorage.getItem('Member');
        console.log(formData)
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addDepanage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        document.getElementById("description").value = "Depannage envoyé !"
    })

    document.getElementById("confirmControle").addEventListener('click', async () => {
        const form = document.getElementById("formControle")
        let formData = {};
        formData["remarque"] =  form.remarque.value;
        formData["renvoie"] =  form.renvoie.checked;
        formData["nr"] = nr;
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/controle', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
        });
        for (let i=0;i<form.files.files['length'];i++){
            let imageData = new FormData();
            imageData.append('image', form.files.files[i])
            let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/image-upload', {
              method: 'POST',
              body: imageData
            });
            let body = await response.json()
            urlImg = body.imageUrl
            let formData = {};
            formData["url"] = body.imageUrl;
            formData["nr"] =  nr;
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addPhoto', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
        closeExplainButton.click();
        location.reload();
    });
    document.getElementById('skipControle').addEventListener('click', async () => {
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipControle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"nr": nr})
            });
        closeExplainButton.click();
        location.reload();
    });
    document.getElementById('skipNettoyage').addEventListener('click', async () => {
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipSchoonmaak', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"nr": nr})
            });
        closeExplainButton.click();
        location.reload();
    });
}

async function confirmOwnBuilding(nom, Id, block){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    commentBox.innerHTML ='<h1>' + nom + '</h1>' +
    '<button id="confirmBuilding" type="button">Valider</button>'
    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
    formData = {};
    formData['id'] = Id;
    formData['block'] = block;
    formData['name'] = sessionStorage.getItem('Member');
    document.getElementById("confirmBuilding").addEventListener('click', async () => {
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/confirmOwnBuilding', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
        });
        closeExplainButton.click();
        location.reload();
    })
}


async function addOverlay(acc, controle, check){
    let allChalets = acc.concat(controle)
    allChalets = allChalets.concat(check)
    allChalets = [...new Set(allChalets)]
    
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    let string = '<table style="width:80%" id=numbersTable><tr>' +
    '<th class="number">N° Bungalow</th>' +
    '<th class="action">Action</th>' +
    '<th class="action">Reloue</th>'+
    '</tr>'
    for (let i=0;i<allChalets.length;i++){
        let status = await getReloueStatus(allChalets[i])
        status = status[0].Reloue
        if (acc.includes(allChalets[i])){
            string += '<tr>' +
                '<th class="number">' + allChalets[i].toString() +'</th>' +
                '<th class="action">Acceuil</th>' + 
                '<th class="reloueyes"></th>'+
                '</tr>'
            
        }
        else if (controle.includes(allChalets[i]) && check.includes(allChalets[i])){
            if (status === 1){
                string += '<tr>' +
                '<th class="number">' + allChalets[i].toString() +'</th>' +
                '<th class="action">Caution & Controle</th>' + 
                '<th class="reloueyes"></th>'
                '</tr>'
            }else{
                string += '<tr>' +
            '<th class="number">' + allChalets[i].toString() +'</th>' +
            '<th class="action">Caution & Controle</th>' + 
            '<th class="relouenon"></th>'+
            '</tr>'
            }
        }
        else if (controle.includes(allChalets[i])){
            if (status === 1){
                string += '<tr>' +
                '<th class="number">' + allChalets[i].toString() +'</th>' +
                '<th class="action">Controle</th>' + 
                '<th class="reloueyes"></th>'
                '</tr>'
            }else{
                string += '<tr>' +
            '<th class="number">' + allChalets[i].toString() +'</th>' +
            '<th class="action">Controle</th>' + 
            '<th class="relouenon"></th>'+
            '</tr>'
            }
        }
        else{
            if (status === 1){
                string += '<tr>' +
                '<th class="number">' + allChalets[i].toString() +'</th>' +
                '<th class="action">Caution</th>' + 
                '<th class="reloueyes"></th>'
                '</tr>'
            }else{
                string += '<tr>' +
            '<th class="number">' + allChalets[i].toString() +'</th>' +
            '<th class="action">Caution</th>' + 
            '<th class="relouenon"></th>'+
            '</tr>'
            }
        }
    }
    string += '</table>'
    commentBox.innerHTML = string;
    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
}

async function addOwnBuildings(listOwn){
    let interim = await getAcceuilInterims(sessionStorage.getItem('Member'))
    const Building = ["Bureau", "Machines à laver", "Flex", "Cantine", "Reception", "Piscine"]
    let IdBuildings = []
    for (let i = 0; i < listOwn.length; i++) {
        IdBuildings.push(listOwn[i].IdBuilding)
    }
    let listBlcoks = await getBlocksPiscine(sessionStorage.getItem('Member'))
    let block = []
    for (let i = 0; i < listBlcoks.length; i++) {
        block.push(listBlcoks[i].block)
    }
    block.sort()
    mapPark = document.getElementById("mapPark")
    ownBuilding = document.createElement("div")
    ownBuilding.id = "ownBuilding"
    let string = '<table style="width:100%" id=OwnBuildingTable><tr>' +
    '<th class="number">Batiments</th>' +
    '<th class="action">Block</th>' +
    '</tr>'
    let index = 0
    if (interim[0] != null){
        string += '<tr id="Interim' + interim[0].AcceuilInterim +'"  style="background-color: green">' +
            '<th class="number">' + "Acceuil INTERIMS" +'</th>' +
            '<th class="action">' + interim[0].AcceuilInterim + '</th>' +
            '</tr>'
    }
    let idDistributeurs = await getIdsDistributeurs()
    for (let i=0;i<idDistributeurs.length;i++){
        let name = await personelWithId(idDistributeurs[i].idPersonel)
        if (name[0].NamePersonel === sessionStorage.getItem('Member')){
            string += '<tr id="distributeurs" style="background-color: green">' +
                '<th class="number">' + "Distributeurs" +'</th>' +
                '<th class="action">' + "A faire" + '</th>' +
                '</tr>'
        }
    }
    for (let i = 0; i < IdBuildings.length; i++) {
        if (IdBuildings[i] === 6){
            string += '<tr id="' + i.toString() +'Building">' +
            '<th class="number">' + Building[IdBuildings[i]-1] +'</th>' +
            '<th class="action">' + block[index] + '</th>' + 
            '</tr>'
            index ++;
        }
        else{
            string += '<tr id="' + i.toString() +'Building">' +
            '<th class="number">' + Building[IdBuildings[i]-1] +'</th>' +
            '<th class="action">A Nettoyer</th>' + 
            '</tr>'
        }
    }
    ownBuilding.innerHTML = string;
    mapPark.appendChild(ownBuilding)
    for (let i = 0; i < IdBuildings.length; i++) {
        let div = document.getElementById(i.toString() + "Building")
        div.addEventListener('click', async () => {
            let divToPlace = document.getElementById("commentBox");
            
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                divToPlace.parentElement.removeChild(divToPlace);
            }
            
            await confirmOwnBuilding(div.firstChild.innerHTML, Building.indexOf(div.firstChild.innerHTML)+1, div.lastChild.innerHTML);
        });
    }
}

async function setTableInterims(nom){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    let listInterims = await getInterims(nom)
    let IdChalet = []
    let IdEquipe = []
    let Nom1 = []
    let Nom2 = []
    for (let i=0; i<listInterims.length;i++){
        IdChalet.push(listInterims[i].IdBungalow)
        IdEquipe.push(listInterims[i].IdEquipe)
        Nom1.push(listInterims[i].Nom1)
        Nom2.push(listInterims[i].Nom2)
    }
    let string = '<input type="text" id="interimsearcher" placeholder="Nom..."><button id="confirmsearchinterim" type="button">Rechercher</button>'
    string += '<table style="width:80%" id=numbersTable><tr>' +
    '<th class="number">N° Bungalow</th>' +
    '<th class="action">Id Equipe</th>' +
    '<th class="action">Nom 1</th>' +
    '<th class="action">Nom 2</th>' +
    '</tr>'
    for (let i=0; i<listInterims.length;i++){
        if (Nom2[i] === null){
            string += '<tr>' +
        '<th class="number">' + IdChalet[i] +'</th>' +
        '<th class="action">' + IdEquipe[i] + '</th>' + 
        '<th class="action">' + Nom1[i] + '</th>' + 
        '</tr>'
        }else{
            string += '<tr>' +
            '<th class="number">' + IdChalet[i] +'</th>' +
            '<th class="action">' + IdEquipe[i] + '</th>' + 
            '<th class="action">' + Nom1[i] + '</th>' + 
            '<th class="action">' + Nom2[i] + '</th>' + 
            '</tr>'
        }
    }
    commentBox.innerHTML = string;
    mapPark.appendChild(commentBox)
    createDivToPlace(commentBox)
    document.getElementById("confirmsearchinterim").addEventListener('click', async () => {
        let nom = document.getElementById('interimsearcher').value;
        if (nom != ""){
            mapPark.removeChild(commentBox)
            setTableInterims(nom)
        }
        else{
            return;
        }
    });
}

async function searchInterims(){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    string = '<input type="text" id="interimsearcher" placeholder="Nom..."><button id="confirmsearchinterim" type="button">Rechercher</button>'
    commentBox.innerHTML = string;
    mapPark.appendChild(commentBox)
    createDivToPlace(commentBox)
    document.getElementById("confirmsearchinterim").addEventListener('click', async () => {
        let nom = document.getElementById('interimsearcher').value;
        if (nom != ""){
            mapPark.removeChild(commentBox)
            setTableInterims(nom)
        }
        else{
            return;
        }

    });

}


async function putColorsOnPlan() {
    const height = 1303;
    const length = 1170;
    const container = document.getElementById('mapPark');
    bngNumbersToCaution = await getCaution(sessionStorage.getItem('Member'))
    bngNumbersControle = await getControle(sessionStorage.getItem('Member'))
    bngNumberAcceuil = await getAcceuil(sessionStorage.getItem('Member'))
    bngCaution = []
    bngControle = []
    bngAcceuil = []
    for (let i = 0; i < bngNumbersToCaution.length; i++) {
        bngCaution.push(bngNumbersToCaution[i].idBungalow)
    }
    
    for (let i = 0; i < bngNumbersControle.length; i++) {
        bngControle.push(bngNumbersControle[i].idBungalow)
    }

    for (let i = 0; i < bngNumberAcceuil.length; i++) {
        bngAcceuil.push(bngNumberAcceuil[i].IdBungalow)
    }

    
    let intersection = bngControle.filter(x => !bngCaution.includes(x));

    for (let i = 0; i < bngCaution.length; i++) {
        let responseCoord = await getBungalowCoordinates(bngCaution[i]);
        const xCoordinate = responseCoord[0].xCoordinate-14;
        const yCoordinate = responseCoord[0].yCoordinate-14;
        let div = document.createElement('div')
        div.className = "caution";
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2.5%; height: 2.5%; opacity: 1; border-radius:50%; position: absolute;"
        div.addEventListener('click', async () => {
            let divToPlace = document.getElementById("commentBox");
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                container.removeChild(divToPlace);
            }
            await confirmWaarborg(bngNumbersToCaution[i].remarque_gen, bngCaution[i], xCoordinate, yCoordinate)
        })
        container.appendChild(div)
    }
    
    for (let i = 0; i < intersection.length; i++) {
        let responseCoord = await getBungalowCoordinates(intersection[i]);
        const xCoordinate = responseCoord[0].xCoordinate-11;
        const yCoordinate = responseCoord[0].yCoordinate-11;
        let div = document.createElement('div')
        div.className = "controle";
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2.5%; height: 2.5%; opacity: 1; border-radius:50%; position: absolute;"
        div.addEventListener('click', async () => {
            let divToPlace = document.getElementById("commentBox");
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                container.removeChild(divToPlace);
            }
            await confirmControle(intersection[i], xCoordinate, yCoordinate)
        })
        container.appendChild(div)
    }

    for (let i = 0; i < bngAcceuil.length; i++) {
        let responseCoord = await getBungalowCoordinates(bngAcceuil[i]);
        const xCoordinate = responseCoord[0].xCoordinate-11;
        const yCoordinate = responseCoord[0].yCoordinate-11;
        let div = document.createElement('div')
        div.className = "acceuil";
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2.5%; height: 2.5%; opacity: 1; border-radius:50%; position: absolute;"
        div.addEventListener('click', async () => {
            let divToPlace = document.getElementById("commentBox");
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                container.removeChild(divToPlace);
            }
            await confirmAcceuil(bngAcceuil[i], xCoordinate, yCoordinate)
        })
        container.appendChild(div)
    }

    const acceuils = document.getElementById('acceuils')
    acceuils.innerHTML = bngNumberAcceuil.length;

    const cautions = document.getElementById('cautions')
    cautions.innerHTML = bngNumbersToCaution.length;

    const controles = document.getElementById('controles')
    controles.innerHTML = bngNumbersControle.length;
    await addOwnBuildings(await getEigen(sessionStorage.getItem('Member')))
    document.getElementById("overlays").addEventListener('click', async () => {
        let divToPlace = document.getElementById("commentBox");
        if(typeof(divToPlace) != 'undefined' && divToPlace != null){
            container.removeChild(divToPlace);
        }
        else{
            await addOverlay(bngAcceuil, bngControle, bngCaution)
        }

    });
    document.getElementById("OwnBuilding").addEventListener('click', async () => {
        let divToPlace = document.getElementById("ownBuilding");
        if(typeof(divToPlace) != 'undefined' && divToPlace != null){
            container.removeChild(divToPlace);
        }
        else{
            await addOwnBuildings(await getEigen(sessionStorage.getItem('Member')))
        }

    });
    document.getElementById("interims").addEventListener('click', async () => {
        let divToPlace = document.getElementById("commentBox");
        if(typeof(divToPlace) != 'undefined' && divToPlace != null){
            container.removeChild(divToPlace);
        }
        else{
            await searchInterims()
        }

    });
}

function addEventClickers() {
    putColorsOnPlan()
}

async function main() {
    if (sessionStorage.getItem('Password') == null || sessionStorage.getItem("Member") == null){
        window.open("./login.html", "_self");
    }else{
        let formData = {}
        formData["password"] = sessionStorage.getItem('Password')
        formData["name"] = sessionStorage.getItem("Member")
        let redirect = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/secureUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        let res = await redirect.json();
        let key = res.key;
        let keySess = sessionStorage.getItem('verifKey')
        //Is the user authenticated?
        if (key != keySess){
            window.open("./login.html", "_self");
        }
        //Is their authentication token still valid?
        else if (Date.now > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
            window.open("./login.html", "_self");
        }
        else if (key.charAt(0) != 4){
            window.open("./login.html", "_self");
        }
        document.getElementById('namePerson').innerHTML = "Bienvenue " + sessionStorage.getItem('Member')
        addEventClickers()
    }

}

main()