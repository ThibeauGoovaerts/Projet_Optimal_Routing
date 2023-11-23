function jsDateToString(jsdate, i=0){
    let string = ""
    string += jsdate.getDate() + "/" + (jsdate.getMonth()+1)
    if (i==0){
        if (jsdate.getMinutes() < 10){
            string += " " + (jsdate.getHours()) + ":0" + jsdate.getMinutes()
        }
        else{
            string += " " + (jsdate.getHours()) + ":" + jsdate.getMinutes()
        }

    }
    return string;
}

async function getAdminTimeTranche(name, dateFrame) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminTimeTranche/' + name.toString() + "/" + dateFrame.toString());
    return await response.json();
}

async function getKey(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getKey/' + name);
    return await response.json();
}

async function getAdminTimeJourn(name, dateFrame) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminTimeJourn/' + name.toString() + "/" + dateFrame.toString());
    return await response.json();
}

async function getItemsAgenda(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getItemsAgenda');
    return await response.json();
}

async function getTachesAdmin(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/allTaches');
    return await response.json();
}

async function getPersonelAdmin(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/allPersonel');
    return await response.json();
}

async function getBungalowCoordinates(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/bungalow/' +id.toString());
    return await response.json();
}

async function getAdminTempsDep(id){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminTempsDep/' +id.toString());
    return await response.json();
}

async function getPhoto(id){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getPhoto/' +id.toString());
    return await response.json();
}

async function getCautionAll(name) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/schoonmaak/caution/' +name.toString());
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

async function selectRemarque(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectRemarque/' + id);
    return await response.json();
}

async function selectMaterial(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectMaterial/' + id);
    return await response.json();
}

async function getAcceuilInterims(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/acceuilInterims/' +name.toString());
    return await response.json();
}

async function getAdminDepGarde(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminDepGarde');
    return await response.json();
}

async function getAdminJourCours(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminJourCours');
    return await response.json();
}

async function getAdminJourTerm(date){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminJourTerm/' + date);
    return await response.json();
}

async function getAdminDep(date){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminDep/' + date);
    return await response.json();
}

async function getAdminDepByNr(nr){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminDepByNr/' + nr.toString());
    return await response.json();
}

async function getDescriptionJournaliere(id){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getDescriptionJournaliere/' + id);
    return await response.json();
}

async function getAdminJourPasCom(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/adminJourPasCom');
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

async function getIdCautions() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getWaarborgIds/');
    return await response.json();
}

async function getCaution(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getAllWaarborg/' + id.toString());
    return await response.json();
}

async function getAdditionalInfo(id){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getBoekingnrId/' + id.toString());
    return await response.json();
}

async function getAllBungalowsTodayWithEquipe(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getAllBungalowsTodayWithEquipe');
    return await response.json();
}

async function getAllNamesInterims(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getAllNamesInterims');
    return await response.json();
}

async function getCommentAcceuil(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getCommentsAcceuil');
    return await response.json();
}

async function getCommentsControleApres(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getCommentsControleApres');
    return await response.json();
}

async function getAllControle(date) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/allControle/' + date.toString());
    return await response.json();
}

async function getAllAcceuil(date) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/allAcceuil/' + date.toString());
    return await response.json();
}

async function teamWithId(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/teamWithId/' + id.toString());
    return await response.json();
}

async function personelWithId(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/personelWithId/' + id.toString());
    return await response.json();
}

async function getAllCaution(date) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/allCaution/' + date.toString());
    return await response.json();
}

async function LadiesPresent() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/LadiesPresent');
    return await response.json();
}

async function findStillToDo() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/findStillToDo');
    return await response.json();
}

async function findAttributed() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/findAttributed');
    return await response.json();
}

function getIndex(nr, arr){
    for (let i=0;i<arr.length;i++){
        if (arr[i].IdBungalow === nr){
            return i;
        }
    }
    return -1
}

async function addCautions(arrayId, allINfoArray, addInfoArray, IdsWaarborg){

    Id = []
    let string = '<table style="width:100%" id="tableCautions"><tr>' +
        '<th class="Nr">N° Réservation</th>' +
        '<th class="NrBungalow">N° Bungalow</th>' +
        '<th class="Date">Date</th>' +
        '<th class="Degats">Dégats</th>' +
        '<th class="Linge">Linge</th>' +
        '<th class="Poubelle">Poubelle</th>' +
        '<th class="Sale">Sale</th>' +
        '<th class="Vaiselle">Vaiselle</th>' +
        '<th class="Remarque">Remarque</th>' +
        '<th></th>' +
        '</tr>'
    for (let i=0; i<arrayId.length; i++){
        allInfo = allINfoArray[i]
        addInfo = addInfoArray[i]
        string += '<tr>' +
            '<th class="Nr">' + addInfo.Boekingsnummer + '</th>' +
            '<th class="NrBungalow">' + addInfo.IdBungalow + '</th>' +
            '<th class="Date">' + new Date(addInfo.DateAcceuil).getDate() + '/' + ((new Date(addInfo.DateAcceuil).getMonth()) + 1) + '</th>' +
            '<th class="Degats">' + allInfo.Degats + '</th>' +
            '<th class="Linge">' + allInfo.Linge +'</th>' +
            '<th class="Poubelle">' + allInfo.Poubelle + '</th>' +
            '<th class="Sale">' + allInfo.Sale +'</th>' +
            '<th class="Vaiselle">' + allInfo.Vaiselle + '</th>' +
            '<th class="Remarque">' + allInfo.Remarque + '</th>' +
            '<th class="Confirm" id="caution'+ allInfo.Id +'">Confirmer</th>' +
            '</tr>'
    }
    string += '</table>'

    document.getElementById("cautions").innerHTML = string;

    for (let i=0; i<arrayId.length; i++){
        document.getElementById("caution" + IdsWaarborg[i]).addEventListener('click', async () => {
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/confirmCaution', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": IdsWaarborg[i],
                    "idReception": sessionStorage.getItem('Member')
                })
            });
            arrayId.splice(i, 1)
            addInfoArray.splice(i, 1)
            allINfoArray.splice(i, 1)
            IdsWaarborg.splice(i, 1)
            await addCautions(arrayId, allINfoArray, addInfoArray, IdsWaarborg)
        });
    }
}

async function addInterim(){
    let bungalows = await getAllBungalowsTodayWithEquipe()
    let names = await getAllNamesInterims()
    for (let i=0;i<bungalows.length;i++){
        bungalows[i] = bungalows[i].IdBungalow
    }
    let namesInFormat = []
    for (let i=0;i<names.length;i++){
        if (names[i].Prenom2 == null){
            namesInFormat.push(names[i].Prenom1)
        }
        else{
            namesInFormat.push(names[i].Prenom1)
        }
    }
    let string = '<div class="custom-select" style="width:100%;"><select class="selectInter" id="bungalows">'
    for (let i=0;i<bungalows.length;i++){
        string += '<option value="' + bungalows[i] + '">' + bungalows[i] + '</option>'
    }
    string += '</select>'
    string += '<select class="selectInter" id="names">'
    for (let i=0;i<namesInFormat.length;i++){
        string += '<option value="' + namesInFormat[i] + '">' + namesInFormat[i] + '</option>'
    }
    string += '</select>'
    string += '<div id="confirmInterimChange">Confirmer</div></div>'
    document.getElementById('interim').innerHTML=string;
    document.getElementById('confirmInterimChange').addEventListener('click', async () => {
        let name= document.getElementById('names').value
        let id = 0
        for (let i=0;i<names.length;i++){
            if (names[i].Prenom1 === name){
                id = names[i].Id;
            }
        }
        if (id === 0){
            return
        }
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/changeInterim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "nr": document.getElementById('bungalows').value
            })
        });
        await addInterim()
    })
}

async function addComments(){
    let string = '<table style="width:100%" id="commentsTable"><tr>' +
        '<th class="marque">Type</th>' +
        '<th class="Nr">N° Réservation</th>' +
        '<th class="NrBungalow">N° Bungalow</th>' +
        '<th class="Remarque">Remarque</th>' +
        '</tr>'
    let accComments = await getCommentAcceuil();
    let ctrlComments = await getCommentsControleApres();
    for (let i=0;i<accComments.length;i++){
        string += '<tr>' +
            '<th class="marque">Acceuil</th>' +
            '<th class="Nr">'+ accComments[i].Boekingsnummer +'</th>' +
            '<th class="NrBungalow">'+ accComments[i].IdBungalow +'</th>' +
            '<th class="Remarque">'+ accComments[i].Remarque +'</th>' +
            '</tr>'
    }

    for (let i=0;i<ctrlComments.length;i++){
        string += '<tr>' +
            '<th class="marque">Controle après Interim</th>' +
            '<th class="Nr">'+ ctrlComments[i].Boekingsnummer +'</th>' +
            '<th class="NrBungalow">'+ ctrlComments[i].IdBungalow +'</th>' +
            '<th class="Remarque">'+ ctrlComments[i].Remarque +'</th>' +
            '</tr>'
    }

    document.getElementById("comments").innerHTML = string;
}

async function makeCaution(){
    document.getElementById("whiteboard").innerHTML = "<h1>Changer l'interim</h1>" +
        '<div id="interim"></div>' +
        '<h1>Cautions à regler</h1>' +
        '<div id="cautions"></div>' +
        '<h1>Commentaires</h1>' +
        '<div id="comments"></div>'
    let arrayId = await getIdCautions()
    Id = []
    IdsWaarborg = []
    allINfoArray = []
    addInfoArray = []
    for (let i=0; i<arrayId.length; i++){
        let allInfo = await getCaution(arrayId[i].Id)
        let addInfo = await getAdditionalInfo(arrayId[i].Id)
        addInfo = addInfo[0]
        allInfo = allInfo[0]
        if (allInfo.Degats === 0){
            allInfo.Degats = "OK"
        }
        else{
            allInfo.Degats = "!!ATTENTION!!"
        }
        if (allInfo.Linge === 0){
            allInfo.Linge = "OK"
        }
        else{
            allInfo.Linge = "!!ATTENTION!!"
        }
        if (allInfo.Poubelle === 0){
            allInfo.Poubelle = "OK"
        }
        else{
            allInfo.Poubelle = "!!ATTENTION!!"
        }
        if (allInfo.Sale === 0){
            allInfo.Sale = "OK"
        }
        else{
            allInfo.Sale = "!!ATTENTION!!"
        }
        if (allInfo.Vaiselle === 0){
            allInfo.Vaiselle = "OK"
        }
        else{
            allInfo.Vaiselle = "!!ATTENTION!!"
        }
        IdsWaarborg.push(allInfo.Id)
        allINfoArray.push(allInfo)
        addInfoArray.push(addInfo)
    }
    await addInterim()
    await addCautions(arrayId, allINfoArray, addInfoArray, IdsWaarborg)
    await addComments()
}

async function fillPlan(dateValue){

    let controle = await getAllControle(dateValue)
    let acceuil = await getAllAcceuil(dateValue)
    let caution = await getAllCaution(dateValue)
    let controleChalets = []
    for (let i=0;i<controle.length;i++){
        controleChalets.push(controle[i].IdBungalow)
    }
    let acceuilChalets = []
    for (let i=0;i<acceuil.length;i++){
        acceuilChalets.push(acceuil[i].IdBungalow)
    }
    let cautionChalets = []
    for (let i=0;i<caution.length;i++){
        cautionChalets.push(caution[i].IdBungalow)
    }

    let allChalets = cautionChalets.concat(acceuilChalets)
    allChalets = allChalets.concat(controleChalets)
    allChalets = [...new Set(allChalets)]
    allChalets.sort( function( a , b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });

    const container = document.getElementById('mapPark');
    container.innerHTML = '<img src="plan.png" class="planPark" id="planPark" usemap="#map">' + '<map name="map" id="map"></map>'
    const height = 1303;
    const length = 1170;
    for (let i = 0; i < allChalets.length; i++) {
        let responseCoord = await getBungalowCoordinates(allChalets[i]);
        const xCoordinate = responseCoord[0].xCoordinate-14;
        const yCoordinate = responseCoord[0].yCoordinate-14;
        let div = document.createElement('div')
        let indexControle = getIndex(allChalets[i], controle)
        if (indexControle != -1){
            if (controle[indexControle].done === 1){
                div.className = "actionAllDone";
            }else{
                div.className = "actionAll";
            }
        }else{
            div.className = "actionAll";
        }
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2.5%; height: 2.5%; opacity: 1; border-radius:50%; position: absolute;"
        div.addEventListener("click", async () => {
            const findings = document.getElementById("findingsElements")
            findings.innerHTML = "";
            let indexAcceuil = getIndex(allChalets[i], acceuil)
            let indexCaution = getIndex(allChalets[i], caution)
            let string = "<h1>" + allChalets[i] + "</h1>"
            if (indexCaution != -1){
                let cache1 = await personelWithId(caution[indexCaution].IdPersonel)
                let beaty = cache1[0].NamePersonel
                string += '<h2>Caution</h2>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">N° Réservation</th>' +
                    '<th class="Degats">Dégats</th>' +
                    '<th class="Linge">Linge</th>' +
                    '<th class="Poubelle">Poubelle</th>' +
                    '<th class="Sale">Sale</th>' +
                    '<th class="Vaiselle">Vaiselle</th>' +
                    '</tr>'
                string += '<tr>' +
                    '<th class="Nr">' + caution[indexCaution].Boekingsnummer + '</th>' +
                    '<th class="Degats">' + caution[indexCaution].Degats + '</th>' +
                    '<th class="Linge">' + caution[indexCaution].Linge +'</th>' +
                    '<th class="Poubelle">' + caution[indexCaution].Poubelle + '</th>' +
                    '<th class="Sale">' + caution[indexCaution].Sale +'</th>' +
                    '<th class="Vaiselle">' + caution[indexCaution].Vaiselle + '</th>'
                '</tr></table>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">Personel</th>' +
                    '<th class="Degats">Remarque</th>' +
                    '<th class="Linge">Done</th>' +
                    '</tr>'
                string += '<tr>' +
                    '<th class="Nr">' + beaty + '</th>' +
                    '<th class="Degats">' + caution[indexCaution].Remarque + '</th>'
                if (caution[indexCaution].done === 1){
                    string += '<th class="done"></th>'
                }
                else{
                    string += '<th class="notDone"></th>'
                }

                string += '</tr></table>'
            }
            if (indexControle != -1){
                let cache3 = await personelWithId(controle[indexControle].IdPersonel)
                let beaty = cache3[0].NamePersonel
                let cache2 = await teamWithId(controle[indexControle].IdEquipe)
                let beauty = cache2[0].Prenom1 + " " + cache2[0].Nom1 + " (" + controle[indexControle].IdEquipe + ")";
                string += '<h2>Controle</h2>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">N° Réservation</th>' +
                    '<th class="Degats">Equipe</th>' +
                    '<th class="Linge">Personel</th>' +
                    '<th class="Poubelle">Done</th>' +
                    '</tr>'
                string += '<tr>' +
                    '<th class="Nr">' + controle[indexControle].Boekingsnummer + '</th>' +
                    '<th class="Degats">' + beauty + '</th>' +
                    '<th class="Linge">' + beaty +'</th>'
                if (controle[indexControle].done === 1){
                    string += '<th class="done"></th>'
                }else{
                    string += '<th class="notDone"></th>'
                }
                string += '</tr></table>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">Remarque</th>' +
                    '</tr>' +
                    '<tr><th class="Sale">' + controle[indexControle].Remarque +'</th>' +
                    '</tr></table>'

            }
            if(indexAcceuil != -1){
                let cache4 = await personelWithId(acceuil[indexAcceuil].IdPersonel)
                let beauty = cache4[0].NamePersonel
                string += '<h2>Acceuil</h2>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">N° Réservation</th>' +
                    '<th class="Linge">Personel</th>' +
                    '<th class="Poubelle">Done</th>' +
                    '</tr>'
                string += '<tr>' +
                    '<th class="Nr">' + acceuil[indexAcceuil].Boekingsnummer + '</th>' +
                    '<th class="Linge">' + beauty +'</th>'
                if (acceuil[indexAcceuil].done === 1){
                    string += '<th class="done"></th>'
                }else{
                    string += '<th class="notDone"></th>'
                }
                string += '</tr></table>'
                string += '<table style="width:100%" class="numbersTable"><tr>' +
                    '<th class="Nr">Remarque</th>' +
                    '</tr>' +
                    '<tr><th class="Sale">' + acceuil[indexAcceuil].Remarque +'</th>' +
                    '</tr></table>'
            }
            findings.innerHTML += string;
        })
        container.appendChild(div)
    }

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

async function makePlanTD(){
    document.getElementById("whiteboard").innerHTML = '<div id="findings">' +
        '<div id="mapPark" class="mapPark">' +
        '</div>' +
        '</div>' +
        '<div id="findingsElements"></div>'
    const container = document.getElementById('mapPark');
    container.innerHTML = '<img src="plan.png" class="planPark" id="planPark" usemap="#map">'
    const height = 1303;
    const length = 1170;
    let i = 2;
    while(i<1300){
        let f = 2;
        while(f<1165){
            const xCoordinate = f;
            const yCoordinate = i;
            const percentageL = (xCoordinate / length) * 100;
            const percentageH = (yCoordinate / height) * 100;
            let div = document.createElement('div')
            div.className = "action";
            div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 1%; height: 1%; opacity: 0.1; border-radius:50%; position: absolute;"
            div.addEventListener('click', async () => {
                let deppanege = document.getElementById("PointDepannage")
                if(typeof(deppanege) != 'undefined' && deppanege != null){
                    container.removeChild(deppanege);
                }
                const percentageL = (xCoordinate / length) * 100;
                const percentageH = (yCoordinate / height) * 100;
                let divSecond = document.createElement('div')
                divSecond.className = "actionAll";
                divSecond.id = "PointDepannage"
                divSecond.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 1%; height: 1%; opacity: 1; border-radius:50%; position: absolute;"
                container.appendChild(divSecond)
                document.getElementById('findingsElements').innerHTML = '<div id="TDAjout"><h1>Ajouter Dépannage</h1><form id="formAcceuil">' +
                    '<p>' + xCoordinate + ', ' + yCoordinate + '</p>' +
                    '<label for="description">Description:</label><br><br>'+
                    '<input type="textarea" name="description" id="description"/>'+
                    '<div id="inputfield">'+
                    '<br><label for="dateInput">Date:</label><br>'+
                    '<input type="date" id="dateInput" name="dateInput"><br>'+
                    '<label for="cars">Level urgence:</label><br><br>' +
                    '<select id="selectUrgence" name="cars">' +
                    '<option value="2" id="normal">Normal (Blue)</option>' +
                    '<option value="3" id="urgent">Urgent (Orange)</option>' +
                    '<option value="1" id="purgent">Pas Urgent (Vert)</option>' +
                    '</select><br>' +
                    '<button id="confirmAjout" type="button">Ajouter</button>' +
                    '</form></div>'
                document.getElementById('confirmAjout').addEventListener("click", async () => {
                    const form = document.getElementById("formAcceuil")
                    let formData = {};
                    if (form.description.value === ""){
                        form.description.value = "Vous n'avez pas mise de description!";
                        document.getElementById("description").style = "background-color: red;"
                        return
                    }
                    formData["description"] =  form.description.value;
                    formData["selectUrgence"] =  form.selectUrgence.value;
                    formData["xCoordinate"] = xCoordinate;
                    formData["yCoordinate"] = yCoordinate;
                    formData["personel"] = sessionStorage.getItem('Member');
                    dateValue = new Date();
                    dateValue = dateValue.toISOString().split('T')[0]
                    if (form.dateInput.value === ""){
                        formData["dateLimit"] = dateValue;
                    }
                    else if (form.dateInput.value < dateValue){
                        formData["dateLimit"] = dateValue;
                    }
                    else{
                        formData["dateLimit"] = form.dateInput.value;
                    }
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addDepanageUpdated', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    await makePlanTD();
                })
            })
            container.appendChild(div)
            f += 12;
        }
        i += 12;
    }

    let attributed = await findAttributed()
    let open = await findStillToDo()
    // Add the delete and modify button
    for (let i=0;i<attributed.length;i++){
        const xCoordinate = attributed[i].XCoordinate-7;
        const yCoordinate = attributed[i].YCoordinate-7;
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        let divSecond = document.createElement('div')
        divSecond.className = "attributedTDGeneral";
        divSecond.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 1.5%; height: 1.5%; opacity: 1; border-radius:50%; position: absolute;"
        divSecond.addEventListener('click', async () => {
            document.getElementById('findingsElements').innerHTML = '<h1>' + attributed[i].Description + '</h1><h2>' + attributed[i].NamePersonel + '</h2>'+
                '<button id="modifyPlan" class="action">Remettre</button>'
            document.getElementById("modifyPlan").addEventListener('click', async () => {
                let dataTranche = {}
                dataTranche["id"] = attributed[i].Id;
                dataTranche["name"] =  attributed[i].NamePersonel;
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/refuseDepannage', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTranche)
                });
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/stopTranche', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTranche)
                });
                await makePlanTD();
            })
        })
        container.appendChild(divSecond)
    }

    for (let i=0;i<open.length;i++){
        const xCoordinate = open[i].XCoordinate-7;
        const yCoordinate = open[i].YCoordinate-7;
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        let div = document.createElement('div')
        div.className = "openTDGeneral";
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 1.5%; height: 1.5%; opacity: 1; border-radius:50%; position: absolute;"
        div.addEventListener('click', () => {
            document.getElementById('findingsElements').innerHTML = '<h1>' + open[i].Description + '</h1>'+
                '<button id="modifyPlan" class="action">Modifier</button>'
            document.getElementById('modifyPlan').addEventListener('click', async () => {
                let date = open[i].DateMake.split('T')
                let DateMake = date[0]
                let today = new Date()
                let DateToUse = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
                document.getElementById('findingsElements').innerHTML = '<table style="width:100%" class="tableGardes">' +
                    '<tr>' +
                    '<th><input type="textarea" name="description" id="descriptionPlanBigger" value="' + open[i].Description + '"></th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Date Mise: ' + DateMake +'</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<th><input type="date" id="dateInput" name="dateInput" value="' + DateToUse +'"></th>' +
                    '</tr>'+
                    '<button id="confirmModify" class="action">Modifier</button>' +
                    '<button id="deleteAgenda" class="action">Delete</button>'
                document.getElementById('deleteAgenda').addEventListener('click', async () => {
                    let formData = {};
                    formData["dateLimit"] =  document.getElementById('dateInput').value;
                    formData["description"] =  document.getElementById('descriptionPlanBigger').value;
                    formData["id"] = open[i].Id;
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updateAgenda', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    let dataTrancheRemarque = {}
                    dataTrancheRemarque["text"] = "MESSAGE DU SYSTEME: DELETE PAR PLAN DU PARC"
                    dataTrancheRemarque["id"] = open[i].Id
                    dataTrancheRemarque["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertRemarque', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTrancheRemarque)
                    });
                    let dataTranche = {}
                    dataTranche["id"] = open[i].Id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipDepannage', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    await makePlanTD();
                })
                document.getElementById('confirmModify').addEventListener('click', async () => {
                    let formData = {};
                    formData["dateLimit"] =  document.getElementById('dateInput').value;
                    formData["description"] =  document.getElementById('descriptionPlanBigger').value;
                    formData["id"] = open[i].Id;
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updateAgenda', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
                    await makePlanTD();
                });
            })
        })
        container.appendChild(div)

    }
}

async function confirmWaarborg(nr){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    let names = await getNamesInterimsPerBungalowCaution(nr)
    names = names[0]
    commentBox.id = "commentBox"
    if (names === undefined){
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Caution</h1><form id="formCaution">' +
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
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Caution</h1><h1>Interim: ' + names.Prenom1 + '</h1><form id="formCaution">' +
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
        commentBox.innerHTML = '<h1>B' + nr.toString() +' - Caution</h1><h1>Interims: ' + names.Prenom1 + ' + '+ names.Prenom2 + '</h1><form id="formCaution">' +
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

    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
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

async function confirmAcceuil(nr){
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
    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
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

async function confirmControle(nr){
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

    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
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
    formData['name'] = sessionStorage.getItem('MemberCache');
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
    let interim =await getAcceuilInterims(sessionStorage.getItem('MemberCache'))
    const Building = ["Bureau", "Machines à laver", "Flex", "Cantine", "Reception", "Piscine"]
    let IdBuildings = []
    for (let i = 0; i < listOwn.length; i++) {
        IdBuildings.push(listOwn[i].IdBuilding)
    }
    let listBlcoks = await getBlocksPiscine(sessionStorage.getItem('MemberCache'))
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
    string += '<tr id="Interim' + interim[0].AcceuilInterim +'">' +
        '<th class="number">' + "Acceuil INTERIMS" +'</th>' +
        '<th class="action">' + interim[0].AcceuilInterim + '</th>' +
        '</tr>'
    if (sessionStorage.getItem('MemberCache') === "Corinne" || sessionStorage.getItem('MemberCache') === "corinne"){
        string += '<tr id="Interim' + interim[0].AcceuilInterim +'">' +
            '<th class="number">' + "Distributeurs" +'</th>' +
            '<th class="action">' + "A faire" + '</th>' +
            '</tr>'
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
    bngNumbersToCaution = await getCautionAll(sessionStorage.getItem('MemberCache'))
    bngNumbersControle = await getControle(sessionStorage.getItem('MemberCache'))
    bngNumberAcceuil = await getAcceuil(sessionStorage.getItem('MemberCache'))
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
            await confirmWaarborg(bngCaution[i])
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
            await confirmControle(intersection[i])
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
            await confirmAcceuil(bngAcceuil[i])
        })
        container.appendChild(div)
    }

    await addOwnBuildings(await getEigen(sessionStorage.getItem('MemberCache')))
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
            await addOwnBuildings(await getEigen(sessionStorage.getItem('MemberCache')))
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

async function viewHK(){
    let response = await LadiesPresent()
    let alLadies = []
    for (let i=0;i<response.length;i++){
        alLadies.push(response[i].NamePersonel)
    }
    let string = ''
    for (let i=0;i<alLadies.length;i++){
        string += '<option value="' + alLadies[i] + '">' + alLadies[i] + '</option>'
    }
    document.getElementById("whiteboard").innerHTML = '<br><br><label for="selectLady">Femme: </label><br><br>' +
        '<select id="selectLady" name="selectLady">' +
        string +
        '</select><br>' +
        '<button id="ladyConfirm">Confirm</button>' +
        '<div id="findings">'+
        '<div id="mapPark" class="mapPark">'+
        '<img src="plan.png" class="planPark" id="planPark" usemap="#map">'+
        '<map name="map" id="map">'+
        '</map>'+
        '</div>'+
        '</div>'+
        '<div id="clickableButtons">'+
        '<div id="OwnBuilding" class="buttonToClick">Batiments à nous</div>'+
        '<div id="interims" class="buttonToClick">Interims</div>'+
        '<div id="overlays" class="buttonToClick">Liste</div>'+
        '</div>'
    document.getElementById('ladyConfirm').addEventListener('click', async () => {
        sessionStorage.setItem("MemberCache", document.getElementById('selectLady').value.toString());
        await viewHK()
        window.scrollTo(0,document.body.scrollHeight);
    })
    addEventClickers()
}

async function makePlan(){
    document.getElementById("whiteboard").innerHTML = '<div id="inputfield">'+
        '<label>Date:</label>'+
        '<input type="date" id="dateInput" name="dateInput">'+
        '<button id="dateConfirm">Confirm</button>'+
        '</div>'+
        '<div id="findings">'+
        '<div id="mapPark" class="mapPark">'+
        '</div>'+
        '</div>'+
        '<div id="findingsElements"></div>'
    let dateValue = new Date();
    dateValue = dateValue.toISOString().split('T')[0]
    await fillPlan(dateValue)
    document.getElementById("dateConfirm").addEventListener("click", async () => {
        let dateValue = document.getElementById("dateInput").value
        if (dateValue === ""){
            dateValue = new Date();
            dateValue = dateValue.toISOString().split('T')[0]
        }
        await fillPlan(dateValue)
    })
}

async function adminDepGarde(){
    let list = await getAdminDepGarde();
    let string = "<h1>Dépannage de garde</h1><div id='extraWhiteboard'></div>"
    document.getElementById("whiteboard").innerHTML = string
    document.getElementById("extraWhiteboard").style = "display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;"
    for (let i=0;i<list.length;i++){
        let date = list[i].DateMake.split('T')
        let hours = date[1].split(":")
        let div = document.createElement("div");
        div.className = "containerGardes"
        let name = await personelWithId(list[i].IdMake)
        div.innerHTML = '<h1>ID' + list[i].Id + ' : ' + date[0] + '</h1><h1>' + hours[0] + ':' + hours[1] + '</h1>' +
            '<table style="width:100%" class="tableGardes">' +
            '<tr>' +
            '<th class="titleGardes">Nr Bungalow</th>' +
            '<th>' + list[i].IdBungalow +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Description</th>' +
            '<th>' + list[i].Description +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Membre du personnel</th>' +
            '<th>' + name[0].NamePersonel +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Temps mise en minutes</th>' +
            '<th>' + list[i].TimeTaken +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Materielle</th>' +
            '<th>' + list[i].Materielle +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Remarque</th>' +
            '<th>' + list[i].Remarque +'</th>' +
            '</tr>'
        document.getElementById("extraWhiteboard").appendChild(div)
    }

}

async function fillTachesJournCompleted(date){
    document.getElementById("journComplet").innerHTML = "<h1 class='titleJourn'>Taches completées</h1>"
    let listAdminJourTerm = await getAdminJourTerm(date);
    for (let i=0;i<listAdminJourTerm.length;i++){
        let divCache = document.createElement('div');
        divCache.className = "tachesJournaliere"
        let beschrijving = await getDescriptionJournaliere(listAdminJourTerm[i].IdTache)
        let pers = await personelWithId(listAdminJourTerm[i].IdPersonel)
        divCache.innerHTML = "<h1>" + beschrijving[0].Beschrijving + "</h1><br><h3>Personel: " + pers[0].NamePersonel + "</h3>" +
            "<h2>Commentaire:<br>" + listAdminJourTerm[i].Commentaire + "</h2>"
        document.getElementById("journComplet").appendChild(divCache)
    }
}

async function adminJournaliere(){
    let listAdminJourCours = await getAdminJourCours();
    let listAdminJourPasCom = await getAdminJourPasCom();
    let string = '<div id="inputfield">'+
        '<br><label>Date:</label><br><br>'+
        '<input type="date" id="dateInput" name="dateInput"><br><br>'+
        '<button id="dateConfirm">Confirm</button>'+
        '</div>' +
        "<div id='journComplet'><h1 class='titleJourn'>Taches completées</h1></div><div id='jourCours'><h1 class='titleJourn'>Taches en cours</h1></div><div id='jourpasComm'><h1 class='titleJourn'>Taches pas encore completé</h1></div>"
    document.getElementById("whiteboard").innerHTML = string
    for (let i=0;i<listAdminJourCours.length;i++){
        let divCache = document.createElement('div');
        divCache.className = "tachesJournaliere"
        let beschrijving = await getDescriptionJournaliere(listAdminJourCours[i].IdTache)
        let pers = await personelWithId(listAdminJourCours[i].IdPersonel)
        divCache.innerHTML = "<h1>" + beschrijving[0].Beschrijving + "</h1><br><h3>Personel: " + pers[0].NamePersonel + "</h3>"
        document.getElementById("jourCours").appendChild(divCache)
    }

    for (let i=0;i<listAdminJourPasCom.length;i++){
        let divCache = document.createElement('div');
        divCache.className = "tachesJournaliere"
        let beschrijving = await getDescriptionJournaliere(listAdminJourPasCom[i].IdTache)
        divCache.innerHTML = "<h1>" + beschrijving[0].Beschrijving + "</h1>"
        document.getElementById("jourpasComm").appendChild(divCache)
    }

    let dateValue = new Date();
    dateValue = dateValue.toISOString().split('T')[0]
    await fillTachesJournCompleted(dateValue)
    document.getElementById("dateConfirm").addEventListener("click", async () => {
        let dateValue = document.getElementById("dateInput").value
        if (dateValue === ""){
            dateValue = new Date();
            dateValue = dateValue.toISOString().split('T')[0]
        }
        await fillTachesJournCompleted(dateValue)
    })
}

async function fillDepannagesDate(date){
    document.getElementById("extraWhiteBoard").innerHTML = ""
    let listAdminDep = await getAdminDep(date)
    for (let i=0;i<listAdminDep.length;i++){
        let value = listAdminDep[i]
        let divCache = document.createElement('div');
        divCache.className = "depannagesBox"
        let string = ""
        if (value.IdBungalow != null){
            string += '<h3 class="depNrBunaglow">bng' + value.IdBungalow + '</h3>'
        }else{
            string += '<h3 class="depNrBunaglow">' + value.XCoordinate + ', ' + value.YCoordinate + '</h3>'
        }
        date = value.DateMake.split("T")
        string += '<h3 class="depDate">' + date[0] + '<br>' + date[1].split("Z")[0] + '</h3>'
        string += '<h1 class="depDescription">' + value.Description + '</h1>'
        if (value.Done === 1){
            divCache.className = "depannagesBoxDone"
            string += '<div class="depDone"></div>'
        }else if (value.Done === 0 && value.Skip === 1){
            divCache.className = "depannagesBoxSkip"
            string += '<div class="depSkip"></div>'
        }else{
            divCache.className = "depannagesBoxNot"
            string += '<div class="depNotDone"></div>'
        }
        let personelMake = await personelWithId(value.IdMake)
        string += '<h2 class="depMake">Creé par: ' + personelMake[0].NamePersonel + '</h2>'
        if (value.Done === 1){
            let personelDone = await personelWithId(value.IdDone)
            string += '<h2 class="depMake">Fait par: ' + personelDone[0].NamePersonel + '</h2>'
        }
        let tab_pics = await getPhoto(value.Id)
        for (let j=0;j<tab_pics.length;j++){
            console.log(tab_pics[j].data_pic)
            string += '<img src="' + tab_pics[j].data_pic + '" style="width:150px;height: 200px;">'
        }
        string += '<h1>Remarques</h1>'
        let remarquesTD = await selectRemarque(value.Id)
        for (let i=0;i<remarquesTD.length;i++){
            let dateTD = new Date(remarquesTD[i].Date_remarque)
            dateTD.setHours(dateTD.getHours() - 2)
            let addDate = jsDateToString(dateTD)
            string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">'+ addDate + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + remarquesTD[i].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + remarquesTD[i].Remarque_text + '</th></tr></table></div><br>'
        }
        string += '<h1>Materiel</h1>'
        let materielTD = await selectMaterial(value.Id)
        for (let i=0;i<materielTD.length;i++){
            let dateTD = new Date(materielTD[i].Date_material)
            dateTD.setHours(dateTD.getHours() - 2)
            let addDate = jsDateToString(dateTD)

            string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">'+ addDate + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + materielTD[i].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + materielTD[i].Material + '</th></tr></table></div><br>'
        }
        if (value.Done === 1){
            string += '<h1>Horaires</h1>'
            let tranches = await getAdminTempsDep(value.Id)
            for (let i=0;i<tranches.length;i++) {
                let dateTDBegin = new Date(tranches[i].HeureDebut)
                dateTDBegin.setHours(dateTDBegin.getHours() - 2)
                let dateTDEnd = new Date(tranches[i].HeureFin)
                dateTDEnd.setHours(dateTDEnd.getHours() - 2)
                let total = tranches[i].total
                if (tranches[i].IdPersonel != null) {
                    let personelMake = await personelWithId(tranches[i].IdPersonel)
                    string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">' + personelMake[0].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDBegin) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDEnd) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + total.toString() + '</th></tr></table></div><br>'
                } else {
                    string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">\'' + jsDateToString(dateTDBegin) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDEnd) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + total + ' minutes</th></tr></table></div><br>'
                }
            }
        }
        divCache.innerHTML = string
        document.getElementById("extraWhiteBoard").appendChild(divCache)
    }
}

async function fillDepannagesId(nr){
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    }

    //Usage example:
    var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
    document.getElementById("extraWhiteBoard").innerHTML = ""
    let listAdminDep = await getAdminDepByNr(nr)
    for (let i=0;i<listAdminDep.length;i++){
        let value = listAdminDep[i]
        let divCache = document.createElement('div');
        divCache.className = "depannagesBox"
        let string = ""
        if (value.IdBungalow != null){
            string += '<h3 class="depNrBunaglow">bng' + value.IdBungalow + '</h3>'
        }else{
            string += '<h3 class="depNrBunaglow">' + value.XCoordinate + ', ' + value.YCoordinate + '</h3>'
        }
        date = value.DateMake.split("T")
        string += '<h3 class="depDate">' + date[0] + '<br>' + date[1].split("Z")[0] + '</h3>'
        string += '<h1 class="depDescription">' + value.Description + '</h1>'
        if (value.Done === 1){
            divCache.className = "depannagesBoxDone"
            string += '<div class="depDone"></div>'
        }else if (value.Done === 0 && value.Skip === 1){
            divCache.className = "depannagesBoxSkip"
            string += '<div class="depSkip"></div>'
        }else{
            divCache.className = "depannagesBoxNot"
            string += '<div class="depNotDone"></div>'
        }
        let personelMake = await personelWithId(value.IdMake)
        string += '<h2 class="depMake">Creé par: ' + personelMake[0].NamePersonel + '</h2>'
        if (value.Done === 1){
            let personelDone = await personelWithId(value.IdDone)
            string += '<h2 class="depMake">Fait par: ' + personelDone[0].NamePersonel + '</h2>'
        }
        let tab_pics = await getPhoto(value.Id)
        for (let j=0;j<tab_pics.length;j++){
            console.log(tab_pics[j].data_pic)
            string += '<img src="' + tab_pics[j].data_pic + '" style="width:150px;height: 200px;">'
        }
        string += '<h1>Remarques</h1>'
        let remarquesTD = await selectRemarque(value.Id)
        for (let i=0;i<remarquesTD.length;i++){
            let dateTD = new Date(remarquesTD[i].Date_remarque)
            dateTD.setHours(dateTD.getHours() - 2)
            let addDate = jsDateToString(dateTD)
            string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">'+ addDate + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + remarquesTD[i].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + remarquesTD[i].Remarque_text + '</th></tr></table></div><br>'
        }
        string += '<h1>Materiel</h1>'
        let materielTD = await selectMaterial(value.Id)
        for (let i=0;i<materielTD.length;i++){
            let dateTD = new Date(materielTD[i].Date_material)
            dateTD.setHours(dateTD.getHours() - 2)
            let addDate = jsDateToString(dateTD)

            string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">'+ addDate + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + materielTD[i].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + materielTD[i].Material + '</th></tr></table></div><br>'
        }
        if (value.Done === 1){
            string += '<h1>Horaires</h1>'
            let tranches = await getAdminTempsDep(value.Id)
            for (let i=0;i<tranches.length;i++) {
                let dateTDBegin = new Date(tranches[i].HeureDebut)
                dateTDBegin.setHours(dateTDBegin.getHours() - 2)
                let dateTDEnd = new Date(tranches[i].HeureFin)
                dateTDEnd.setHours(dateTDEnd.getHours() - 2)
                let total = tranches[i].total
                if (tranches[i].IdPersonel != null) {
                    let personelMake = await personelWithId(tranches[i].IdPersonel)
                    string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">' + personelMake[0].NamePersonel + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDBegin) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDEnd) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + total.toString() + '</th></tr></table></div><br>'
                } else {
                    string += '<div class="remarqueInText"><table style="width: 100%; text-align: center;"><th><th style="border: 1px grey solid; padding: 5px;">\'' + jsDateToString(dateTDBegin) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + jsDateToString(dateTDEnd) + "</th><th style=\"border: 1px grey solid; padding: 5px;\">" + total + ' minutes</th></tr></table></div><br>'
                }
            }
        }
        divCache.innerHTML = string
        document.getElementById("extraWhiteBoard").appendChild(divCache)
    }
}

async function adminDep(){
    let string = '<div id="inputfieldDateDep" id>'+
        '<br><label>Date:</label><br><br>'+
        '<input type="date" id="dateInput" name="dateInput"><br><br>'+
        '<button id="dateConfirm">Confirm</button>'+
        '</div>' +
        '<div id="inputfieldNrDep">'+
        '<br><label>Nr Bungalow:</label><br><br>'+
        '<input type="textarea" id="nrInput" name="nrInput"><br><br>'+
        '<button id="nrInputConfirm">Confirm</button>'+
        '</div>' +
        '<div id="extraWhiteBoard"></div>'
    document.getElementById('whiteboard').innerHTML=string
    let dateValue = new Date();
    dateValue = dateValue.toISOString().split('T')[0]
    await fillDepannagesDate(dateValue)
    document.getElementById('nrInputConfirm').addEventListener('click', async () => {
        await fillDepannagesId(document.getElementById('nrInput').value)
    })
    document.getElementById("dateConfirm").addEventListener("click", async () => {
        let dateValue = document.getElementById("dateInput").value
        if (dateValue === ""){
            dateValue = new Date();
            dateValue = dateValue.toISOString().split('T')[0]
        }
        await fillDepannagesDate(dateValue)
    })
}

async function adminUtilTemps(){

    let string = '<div id="inputfieldHours">'+
        '<br><label>Date:</label><br><br>'+
        '<div id="HoursInputAlignment">'+
        '<input type="date" id="dateInput" name="dateInput" style="width: 250px; height: 25px; ">'+
        '<input type="text" id="nameInput" name="nameInput" style="width: 250px; height: 25px; margin-left: 25px;"><br><br></div>'+
        '<button id="dateConfirm">Confirm</button>'+
        '</div><div id="extraWhiteBoardHourBlocks">' +
        '</div>'
    document.getElementById('whiteboard').innerHTML=string
    document.getElementById("dateConfirm").addEventListener("click", async () => {
        document.getElementById("extraWhiteBoardHourBlocks").innerHTML =         '<h3>8H</h3><div id="hour8" class="hourblock"></div>' +
            '<h3>9H</h3><div id="hour9" class="hourblock"></div>' +
            '<h3>10H</h3><div id="hour10" class="hourblock"></div>' +
            '<h3>11H</h3><div id="hour11" class="hourblock"></div>' +
            '<h3>12H</h3><div id="hour12" class="hourblock"></div>' +
            '<h3>13H</h3><div id="hour13" class="hourblock"></div>' +
            '<h3>14H</h3><div id="hour14" class="hourblock"></div>' +
            '<h3>15H</h3><div id="hour15" class="hourblock"></div>' +
            '<h3>16H</h3><div id="hour16" class="hourblock"></div>' +
            '<h3>17H</h3><div id="hour17" class="hourblock"></div>' +
            '<h3>18H</h3><div id="hour18" class="hourblock"></div>' +
            '<h3>19H</h3><div id="hour19" class="hourblock"></div>' +
            '<h3>20H</h3><div id="hour20" class="hourblock"></div>' +
            '<h3>21H</h3><div id="hour21" class="hourblock"></div>' +
            '<h3>22H</h3><div id="hour22" class="hourblock"></div>'
        let dateValue = document.getElementById("dateInput").value
        let nameValue = document.getElementById("nameInput").value
        let resJourn = await getAdminTimeJourn(nameValue, dateValue)
        let resDep = await getAdminTimeTranche(nameValue, dateValue)
        for (let i=0;i<resJourn.length;i++){
            let hStart = resJourn[i].TimeStart.split("T")[1].split(":")[0]
            let timeTaken = parseInt(resJourn[i].total.split(":")[1]) + 1
            let div = document.createElement('div')
            div.className = "blockTacheJourn"
            let h = timeTaken * 1.5;
            let strring = "height: " + h.toString() + "%;"
            div.style = strring
            let trancheFound = document.getElementById("hour" + hStart.toString())
            if (trancheFound != null){
                trancheFound.appendChild(div)
            }
        }
        for (let i=0;i<resDep.length;i++){
            let hStart = resDep[i].HeureDebut.split("T")[1].split(":")[0]
            let timeTaken = parseInt(resDep[i].total.split(":")[1]) + 1
            let div = document.createElement('div')
            div.className = "blockDepanage"
            let h = timeTaken * 1.5;
            let strring = "height: " + h.toString() + "%;"
            div.style = strring
            let trancheFound = document.getElementById("hour" + hStart.toString())
            if (trancheFound != null){
                trancheFound.appendChild(div)
            }
        }
    })
}

async function makeBoardAgenda(){
    let list = await getItemsAgenda()
    let string = "<h1>Agenda TD</h1><div id='extraWhiteboard'></div>"
    document.getElementById("whiteboard").innerHTML = string
    document.getElementById("extraWhiteboard").style = "display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;"
    for (let i=0;i<list.length;i++){
        let date = list[i].DateMake.split('T')
        let DateMake = date[0]
        date = list[i].dateLimit.split("T")
        let DateLimit = date[0]
        let div = document.createElement("div");
        div.className = "containerGardes"
        let name = list[i].maker
        div.innerHTML = '<h1>ID' + list[i].Id + '</h1>'+
            '<table style="width:100%" class="tableGardes">' +
            '<tr>' +
            '<th class="titleGardes">Description</th>' +
            '<th>' + list[i].Description +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Jour créé</th>' +
            '<th>' + DateMake +'</th>' +
            '</tr>' +
            '<tr>' +
            '<th class="titleGardes">Jour planifié</th>' +
            '<th>' + DateLimit +'</th>' +
            '</tr>' +
            '<button id="modifyAgenda' + list[i].Id +'" class="action">Modifier</button>'
        document.getElementById("extraWhiteboard").appendChild(div)
    }
    for (let i=0;i<list.length;i++){
        document.getElementById('modifyAgenda' + list[i].Id).addEventListener('click', async () => {
            document.getElementById("extraWhiteboard").innerHTML=""
            let date = list[i].DateMake.split('T')
            let DateMake = date[0]
            date = list[i].dateLimit.split("T")
            let DateLimit = date[0]
            let div = document.createElement("div");
            div.className = "containerGardesModif"
            let name = list[i].maker
            div.innerHTML = '<h1>ID' + list[i].Id + '</h1>'+
                '<table style="width:100%" class="tableGardes">' +
                '<tr>' +
                '<th class="titleGardes">Description</th>' +
                '<th><input type="textarea" rows="5" cols="50" name="description" class="descriptionAgenda" id="descriptionAgenda" value="' + list[i].Description + '"></th>' +
                '</tr>' +
                '<tr>' +
                '<th class="titleGardes">Jour créé</th>' +
                '<th>' + DateMake +'</th>' +
                '</tr>' +
                '<tr>' +
                '<th class="titleGardes">Jour planifié</th>' +
                '<th><input type="date" id="dateInput" name="dateInput" value="' + DateLimit +'"></th>' +
                '</tr>'+
                '<button id="confirmModify" class="action">Modifier</button>' +
                '<button id="deleteAgenda" class="action">Delete</button>'
            document.getElementById("extraWhiteboard").appendChild(div)
            document.getElementById('deleteAgenda').addEventListener('click', async () => {
                let dataTrancheRemarque = {}
                dataTrancheRemarque["text"] = "MESSAGE DU SYSTEME: DELETE PAR AGENDA"
                dataTrancheRemarque["id"] = list[i].Id
                dataTrancheRemarque["name"] =  sessionStorage.getItem('Member');
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertRemarque', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTrancheRemarque)
                });
                let dataTranche = {}
                dataTranche["id"] = list[i].Id
                dataTranche["name"] =  sessionStorage.getItem('Member');
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipDepannage', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTranche)
                });
                await makeBoardAgenda();
            })
            document.getElementById('confirmModify').addEventListener('click', async () => {
                let formData = {};
                formData["dateLimit"] =  document.getElementById('dateInput').value;
                formData["description"] =  document.getElementById('descriptionAgenda').value;
                formData["id"] = list[i].Id;
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updateAgenda', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                await makeBoardAgenda();
            });
        });
    }
}

async function tachesAdmin(){
    let list = await getTachesAdmin()
    let string = "<h1>Taches Journalières</h1><div id='extraWhiteboard'>" +
        "</div>"
    document.getElementById("whiteboard").innerHTML = string
    string = '<table style="width:100%" id="tableCautions"><tr>' +
        '<th class="Nr">Description</th>' +
        '<th class="NrBungalow">Remarque</th>' +
        '<th class="Date">Lu</th>' +
        '<th class="Degats">Ma</th>' +
        '<th class="Linge">Me</th>' +
        '<th class="Poubelle">Je</th>' +
        '<th class="Sale">Ve</th>' +
        '<th class="Vaiselle">Sa</th>' +
        '<th class="Remarque">Di</th>' +
        '<th class="Confirm" id="adminTachesAjouterTache">Ajouter Tache</th>' +
        '</tr>'
    for (let i=0;i<list.length;i++){
        string += '<tr id="adminTaches' + list[i].Id + '">' +
            '<th class="Nr">' + list[i].Beschrijving + '</th>' +
            '<th class="NrBungalow">' + list[i].Remarque + '</th>' +
            '<th class="Date">' + list[i].lundi + '</th>' +
            '<th class="Degats">' + list[i].mardi + '</th>' +
            '<th class="Linge">' + list[i].mercredi +'</th>' +
            '<th class="Poubelle">' + list[i].jeudi + '</th>' +
            '<th class="Sale">' + list[i].vendredi +'</th>' +
            '<th class="Vaiselle">' + list[i].samedi + '</th>' +
            '<th class="Remarque">' + list[i].dimanche + '</th>' +
            '<th class="Confirm" id="adminTachesConfirm'+ list[i].Id +'">Modifier</th>' +
            '</tr>'
    }
    document.getElementById("extraWhiteboard").innerHTML = string

    document.getElementById('adminTachesAjouterTache').addEventListener('click', async () => {
        let formData = {}
        formData["Beschrijving"] = "Ajouter encore une description"
        formData["Remarque"] = " "
        formData["lundi"] = false
        formData["mardi"] = false
        formData["mercredi"] = false
        formData["jeudi"] = false
        formData["vendredi"] = false
        formData["samedi"] = false
        formData["dimanche"] = false
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertTache', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        await tachesAdmin();
        window.scrollTo(0,document.body.scrollHeight);
    })

    for (let i=0;i<list.length;i++){
        document.getElementById("adminTachesConfirm" + list[i].Id).addEventListener('click', async () => {
            let newString = '<th class="Nr"><input id="beschrijving' + list[i].Id + '" type="textarea" value="' + list[i].Beschrijving + '"></input></th>' +
                '<th class="Nr"><input id="remarque' + list[i].Id + '" type="textarea" value="' + list[i].Remarque + '"></input></th>'
            if (list[i].lundi){
                newString += '<th class="Date"><input id="lundi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="lundi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].mardi){
                newString += '<th class="Date"><input id="mardi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="mardi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].mercredi){
                newString += '<th class="Date"><input id="mercredi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="mercredi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].jeudi){
                newString += '<th class="Date"><input id="jeudi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="jeudi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].vendredi){
                newString += '<th class="Date"><input id="vendredi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="vendredi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].samedi){
                newString += '<th class="Date"><input id="samedi' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="samedi' + list[i].Id + '" type="checkbox"></input></th>'
            }
            if (list[i].dimanche){
                newString += '<th class="Date"><input id="dimanche' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
            }else{
                newString += '<th class="Date"><input id="dimanche' + list[i].Id + '" type="checkbox"></input></th>'
            }
            newString += '<th class="Confirm" id="adminTachesConfirmFinale'+ list[i].Id +'">Confirmer</th>'
            document.getElementById('adminTaches' + list[i].Id).innerHTML= newString
            document.getElementById('adminTachesConfirmFinale' + list[i].Id).addEventListener('click', async () => {
                let formData = {}
                formData["Beschrijving"] = document.getElementById("beschrijving" + list[i].Id).value;
                formData["Remarque"] = document.getElementById("remarque" + list[i].Id).value;
                formData["lundi"] = document.getElementById("lundi" + list[i].Id).checked;
                formData["mardi"] = document.getElementById("mardi" + list[i].Id).checked;
                formData["mercredi"] = document.getElementById("mercredi" + list[i].Id).checked;
                formData["jeudi"] = document.getElementById("jeudi" + list[i].Id).checked;
                formData["vendredi"] = document.getElementById("vendredi" + list[i].Id).checked;
                formData["samedi"] = document.getElementById("samedi" + list[i].Id).checked;
                formData["dimanche"] = document.getElementById("dimanche" + list[i].Id).checked;
                formData["Id"] = list[i].Id;
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updateTache', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                await tachesAdmin();
            })
        })
    }
}

async function changePersonel(){
    let list = await getPersonelAdmin()
    let string = "<h1>Personnel</h1><div id='extraWhiteboard'>" +
        "</div>"
    document.getElementById("whiteboard").innerHTML = string
    string = '<table style="width:100%" id="tableCautions"><tr>' +
        '<th class="Nr">Id</th>' +
        '<th class="NrBungalow">Nom</th>' +
        '<th class="Date">Mot de passe</th>' +
        '<th class="Degats">Departement</th>' +
        '<th class="Linge">Actif</th>' +
        '<th class="Poubelle">Remarque</th>' +
        '<th class="Confirm" id="adminTachesAjouterTache">Ajouter Membre</th>' +
        '</tr>'
    for (let i=0;i<list.length;i++){
        if (list[i].Departement == 1){
            list[i].Departement = "Administration"
        }else if (list[i].Departement == 2){
        }else if (list[i].Departement == 3){
            list[i].Departement = "Reception"
        }else if (list[i].Departement == 4){
            list[i].Departement = "HK"
        }else if (list[i].Departement == 5){
            list[i].Departement = "TD"
        }
        if (list[i].Departement != 2){
            string += '<tr id="adminTaches' + list[i].Id + '">' +
                '<th class="Nr">' + list[i].Id + '</th>' +
                '<th class="NrBungalow">' + list[i].NamePersonel + '</th>' +
                '<th class="Date">****</th>' +
                '<th class="Degats">' + list[i].Departement + '</th>' +
                '<th class="Linge">' + list[i].Actif +'</th>' +
                '<th class="Poubelle">' + list[i].Remarque + '</th>' +
                '<th class="Confirm" id="adminTachesConfirm'+ list[i].Id +'">Modifier</th>' +
                '</tr>'
        }

    }
    document.getElementById("extraWhiteboard").innerHTML = string

    document.getElementById('adminTachesAjouterTache').addEventListener('click', async () => {
        if (confirm("Êtes vous sûr de vouloir ajouter un membre du Personnel")){
            let formData = {}
            formData["NamePersonel"] = "Inconnu"
            formData["Passwd"] = " "
            formData["Departement"] = 0
            formData["Actif"] = 1
            formData["Remarque"] = "Crée par " + sessionStorage.getItem('Member')
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertPersonel', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            await changePersonel();
            window.scrollTo(0,document.body.scrollHeight);
        }else{
            await changePersonel()
        }
    })

    for (let i=0;i<list.length;i++){
        if (list[i].Departement != 2){
            document.getElementById("adminTachesConfirm" + list[i].Id).addEventListener('click', async () => {
                if (confirm("Êtes vous sûr de vouloir modifier les données de " + list[i].NamePersonel)){
                    let newString = '<th class="Nr">' + list[i].Id + '</th>' +
                        '<th class="NrBungalow"><input id="namePerson' + list[i].Id + '" type="textarea" value="' + list[i].NamePersonel + '"></input></th>' +
                        '<th class="Date"><input id="passwd' + list[i].Id + '" type="textarea" value="' + list[i].Passwd + '"></input></th>' +
                        '<th class="Degats"><select id="cars" name="cars">' +
                        '<option value="1">Administration</option>' +
                        '<option value="3">Reception</option>' +
                        '<option value="4" selected>HK</option>' +
                        '<option value="5">TD</option>' +
                        '</select></th>'
                    if (list[i].Actif){
                        newString += '<th class="Date"><input id="actif' + list[i].Id + '" type="checkbox" checked="' + 'checked' + '"></input></th>'
                    }else{
                        newString += '<th class="Date"><input id="actif' + list[i].Id + '" type="checkbox"></input></th>'
                    }
                    newString += '<th class="Poubelle"><input id="remarque' + list[i].Id + '" type="textarea" value="' + list[i].Remarque + '"></input></th>' +
                        '<th class="Confirm" id="adminPersonelFinale'+ list[i].Id +'">Confirmer</th>'
                    document.getElementById('adminTaches' + list[i].Id).innerHTML= newString
                    document.getElementById('adminPersonelFinale' + list[i].Id).addEventListener('click', async () => {
                        if (confirm("Vous êtes en train de modifier les données de " + list[i].NamePersonel + ", continuer?")){
                            let formData = {}
                            formData["NamePersonel"] = document.getElementById("namePerson" + list[i].Id).value;
                            formData["Passwd"] = document.getElementById("passwd" + list[i].Id).value;
                            formData["Departement"] = document.getElementById("cars").value;
                            formData["Actif"] = document.getElementById("actif" + list[i].Id).checked;
                            formData["Remarque"] = document.getElementById("remarque" + list[i].Id).value;
                            formData["Id"] = list[i].Id;
                            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updatePersonel', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            });
                            await changePersonel();
                        }else{
                            await changePersonel();
                        }

                    })
                }else{
                    await changePersonel()
                }
            })
        }
    }
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
        else if (key.charAt(0) != 1){
            window.open("./login.html", "_self");
        }
        await makePlanTD()
        document.getElementById("buttonCaution").addEventListener("click", async () => {
            await makeCaution();
        });
        document.getElementById("buttonPlan").addEventListener("click", async () => {
            await makePlan();
        });
        document.getElementById("buttonTD").addEventListener("click", async () => {
            await makePlanTD();
        });
        document.getElementById("viewHK").addEventListener("click", async () => {
            await viewHK();
        });
        document.getElementById("depGarde").addEventListener("click", async () => {
            await adminDepGarde();
        });
        document.getElementById("depJour").addEventListener("click", async () => {
            await adminDep();
        });
        document.getElementById("tacheJourn").addEventListener("click", async () => {
            await adminJournaliere();
        });
        document.getElementById("utilTemps").addEventListener("click", async () => {
            await adminUtilTemps()
        });
        document.getElementById('agenda').addEventListener("click", async () => {
            await makeBoardAgenda();
        });
        document.getElementById('taches').addEventListener("click", async () => {
            await tachesAdmin();
        });
        document.getElementById('personel').addEventListener("click", async () => {
            await changePersonel();
        });
    }

}

main()