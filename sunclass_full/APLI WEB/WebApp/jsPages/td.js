async function findStillToDo() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/findStillToDo');
    return await response.json();
}

async function findAttributed() {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/findAttributed');
    return await response.json();
}

async function selectRemarque(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectRemarque/' + id);
    return await response.json();
}

async function getKey(name){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getKey/' + name);
    return await response.json();
}

async function getItemsAgenda(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/getItemsAgenda');
    return await response.json();
}

async function selectPastDep(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectPastDep');
    return await response.json();
}

async function personelWithId(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/personelWithId/' + id.toString());
    return await response.json();
}

async function selectMaterial(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectMaterial/' + id);
    return await response.json();
}

async function copyById(id) {
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/copyById/' + id);
    return await response.json();
}

async function selectJournaliere(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectJournaliere');
    return await response.json();
}

async function selectJournalierePersonel(){
    let response = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/selectJournalierePersonel/' + sessionStorage.getItem('Member'));
    return await response.json();
}

function jsDateToString(jsdate, i=0){
    let string = ""
    string += jsdate.getDate() + "/" + (jsdate.getMonth()+1)
    if (i==0){
        string += " " + (jsdate.getHours()) + ":" + jsdate.getMinutes()
    }
    return string;
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

function createDivToPlaceEmpty(container){
    let divToPlace = document.createElement('div');
    divToPlace.id = "explainDiv";
    let closeExplainButton = document.createElement('button')
    closeExplainButton.id = "closeExplainButton";
    closeExplainButton.innerText = 'X';
    container.appendChild(closeExplainButton);
    closeExplainButton.onclick = async () => {
        await makePlanTD()
    };
    return closeExplainButton
}

function createDivToPlaceAgenda(container){
    let divToPlace = document.createElement('div');
    divToPlace.id = "explainDiv";
    let closeExplainButton = document.createElement('button')
    closeExplainButton.id = "closeExplainButton";
    closeExplainButton.innerText = 'X';
    container.appendChild(closeExplainButton);
    closeExplainButton.onclick = async () => {
        await choiceAgendaAccepted()
    };
    return closeExplainButton
}

function createDivToPlacePast(container){
    let divToPlace = document.createElement('div');
    divToPlace.id = "explainDiv";
    let closeExplainButton = document.createElement('button')
    closeExplainButton.id = "closeExplainButton";
    closeExplainButton.innerText = 'X';
    container.appendChild(closeExplainButton);
    closeExplainButton.onclick = async () => {
        await listeAttrib()
    };
    return closeExplainButton
}

async function makePlanGarde(){
    function formHoursToMinutes(timeStop){
        let hh = timeStop.split(":");
        let calc = hh[0] * 60;
        return parseInt(calc) + parseInt(hh[1]);
    }
    const container = document.getElementById('mapPark');
    container.innerHTML = '<img src="plan.png" class="planPark" id="planPark" usemap="#map">'
    const height = 1303;
    const length = 1170;
    let i = 4;
    while(i<1300){
        let f = 4;
        while(f<1165){
            const xCoordinate = f;
            const yCoordinate = i;
            const percentageL = (xCoordinate / length) * 100;
            const percentageH = (yCoordinate / height) * 100;
            let div = document.createElement('div')
            div.className = "action";
            div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2%; height: 2%; opacity: 0.1; border-radius:50%; position: absolute;"
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
                divSecond.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2%; height: 2%; opacity: 1; border-radius:50%; position: absolute;"
                container.appendChild(divSecond)
                document.getElementById('findingsElements').style = "visibility: visible;"
                document.getElementById('findingsElements').innerHTML = '<div id="TDAjout"><h1>Ajouter Dépannage De Garde</h1><form id="formAcceuil">' +
                    '<p>' + xCoordinate + ', ' + yCoordinate + '</p>' +
                    '<label for="description">Description:</label><br>'+
                    '<input type="textarea" name="description" id="description"/><br>' +
                    '<label for="nrBungalow">Nr Bungalow:</label><br>'+
                    '<input type="number" id="nrBungalow" name="nrBungalow"><br>' +
                    '<label for="remarque">Remarque:</label><br>'+
                    '<input type="textarea" id="remarque" name="remarque"><br>' +
                    '<label for="materielle">Materielle:</label><br>'+
                    '<input type="textarea" id="materielle" name="materielle"><br>' +
                    '<label>Temps mise: </label><br>' + '<input type="time" id="stopTime" step="300" value="02:00" min="02:00"><br>' +
                    '<button id="confirmAjout" type="button">Ajouter</button>' +
                    '</form></div>'
                createDivToPlaceEmpty(document.getElementById('TDAjout'))
                document.getElementById('confirmAjout').addEventListener("click", async () => {
                    const form = document.getElementById("formAcceuil")
                    let formData = {};
                    formData["name"] =  sessionStorage.getItem('Member');
                    formData["description"] =  form.description.value;
                    formData["xCoordinate"] = xCoordinate;
                    formData["yCoordinate"] = yCoordinate;
                    formData["idBungalow"] = form.nrBungalow.value;
                    formData["remarque"] = form.remarque.value;
                    formData["materielle"] = form.materielle.value;
                    formData["time"] = formHoursToMinutes(form.stopTime.value);
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addDepanageGarde', {
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

            f += 24;
        }
        i += 24;
    }
}

async function addDepannage(){
    const container = document.getElementById('mapPark');
    container.innerHTML = '<img src="plan.png" class="planPark" id="planPark" usemap="#map">'
    const height = 1303;
    const length = 1170;
    let i = 4;
    while(i<1300){
        let f = 4;
        while(f<1165){
            const xCoordinate = f;
            const yCoordinate = i;
            const percentageL = (xCoordinate / length) * 100;
            const percentageH = (yCoordinate / height) * 100;
            let div = document.createElement('div')
            div.className = "actionDepannage";
            div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2%; height: 2%; opacity: 0.1; border-radius:50%; position: absolute;"
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
                document.getElementById('findingsElements').style = "visibility: visible;"
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
                createDivToPlaceAgenda(document.getElementById('TDAjout'))
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
                    await fillPlan();
                })
            })
            container.appendChild(div)

            f += 24;
        }
        i += 24;
    }
}

async function makePlanTD(){
    document.getElementById("whiteboard").innerHTML = '<div id="findings">' +
        '<div class="switch-holder">'+
        '<div class="switch-label">' +
        '<i class="fa fa-bluetooth-b"></i><span>Mode</span>' +
        '</div>' +
        '<div class="switch-toggle">' +
        '<input type="checkbox" id="bluetooth">' +
        '<label for="bluetooth"></label>' +
        '</div></div>' +
        '<div id="mapPark" class="mapPark">' +
        '</div>' +
        '<div id="findingsElements" style="visibility: hidden"></div></div>'

    let option = document.getElementById('bluetooth')
    option.addEventListener('change', async () => {
        if(option.checked) {
            document.getElementById('mapPark').innerHTML = '';
            document.getElementById('findingsElements').innerHTML = '';
            await makePlanGarde()
        } else {
            document.getElementById('mapPark').innerHTML = '';
            document.getElementById('findingsElements').innerHTML = '';
            await addDepannage()
        }
    })
    await addDepannage()
}

async function acceptDep(todo){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    commentBox.innerHTML = '<h1>' + todo.Description + '</h1>' +
    '<h2>Numéro du chalet:</h2>'+
    '<input type="number" id="nrBungalow" name="nrBungalow"><br>' +
    '<button id="accept" class="acceptButtons">Accepter</button>'+
    '<button id="skipButton" class="acceptButtons">Skip</button>'
    mapPark.appendChild(commentBox)
    document.getElementById("accept").addEventListener('click', async () => {
        let nr = document.getElementById('nrBungalow').value
        if (nr === ''){
            nr=null
        }
        else if (nr > 237 || nr < 0){
            return await acceptDep(todo)
        }
        let formData = {};
        formData["IdBungalow"] =  nr
        formData["name"] = sessionStorage.getItem('Member');
        formData["id"] =  todo.Id
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/takeDepannage', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
        });
        let dataTranche = {}
        dataTranche["id"] = todo.Id
        dataTranche["name"] =  sessionStorage.getItem('Member');
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/startTranche', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataTranche)
        });
        document.getElementById("acepte").click()
    })
    document.getElementById("skipButton").addEventListener('click', async () => {
        let dataTranche = {}
        dataTranche["id"] = todo.Id
        dataTranche["name"] =  sessionStorage.getItem('Member');
        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipDepannage', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataTranche)
        });
        document.getElementById("buttonPlan").click()
    })
    let closeExplainButton = createDivToPlace(commentBox)
}

async function explainOtherDep(todo){
    mapPark = document.getElementById("mapPark")
    commentBox = document.createElement("div")
    commentBox.id = "commentBox"
    commentBox.innerHTML = '<h1>' + todo.Description + '</h1>' +
    '<h2>'+ todo.NamePersonel + '</h2>'
    mapPark.appendChild(commentBox)
    let closeExplainButton = createDivToPlace(commentBox)
}

async function fillPlan(){
    document.getElementById("whiteboard").innerHTML = '<div id="mapPark" class="mapPark">' +
    '<img src="plan.png" class="planPark" id="planPark" usemap="#map">'+
    '<map name="map" id="map">'+
    '</map>'+'</div>'
    let todo = await findStillToDo()
    let attributed = await findAttributed()
    const height = 1303;
    const length = 1170;
    const container = document.getElementById('mapPark');
    for (let i=0;i<attributed.length;i++){
        let todos = attributed[i]
        const xCoordinate = attributed[i].XCoordinate-7;
        const yCoordinate = attributed[i].YCoordinate-7;
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        let div = document.createElement('div')
        div.className = "attributed"
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2%; height: 2%; opacity: 0.5; border-radius:50%; position: absolute;"
        div.addEventListener("click", async () => {
            let divToPlace = document.getElementById("commentBox");
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                container.removeChild(divToPlace);
            }
            await explainOtherDep(todos)
        })
        container.appendChild(div)
    }
    for (let i=0;i<todo.length;i++){
        let todos = todo[i]
        const xCoordinate = todo[i].XCoordinate;
        const yCoordinate = todo[i].YCoordinate;
        const percentageL = (xCoordinate / length) * 100;
        const percentageH = (yCoordinate / height) * 100;
        let div = document.createElement('div')
        if (todo[i].CodeUrgence === 1){
            div.className = "purgent";
        }else if (todo[i].CodeUrgence === 2){
            div.className = "normal";
        } else if(todo[i].CodeUrgence === 3){
            div.className = "urgent";
        }  
        div.style = "left: " + percentageL + "%; top: " + percentageH + "%; width: 2%; height: 2%; opacity: 0.7; border-radius:50%; position: absolute;"
        div.addEventListener("click", async () => {
            let divToPlace = document.getElementById("commentBox");
            if(typeof(divToPlace) != 'undefined' && divToPlace != null){
                container.removeChild(divToPlace);
            }
            await acceptDep(todos)
        })
        container.appendChild(div)
    }

}

async function makeBoardAgenda(){
    let list = await getItemsAgenda()
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
            '<button id="modifyAgenda' + list[i].Id +'" class="actionAgenda">Modifier</button>'
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
                '<button id="confirmModify" class="actionAgenda">Modifier</button>' +
                '<button id="deleteAgenda" class="actionAgenda">Delete</button>'
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
                await choiceAgendaAccepted();
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
                await choiceAgendaAccepted();
            });
        });
    }
}

async function choiceAgendaAccepted(){
    document.getElementById('whiteboard').innerHTML = '<div id="findings">' +
    '<div class="switch-holder">'+
    '<div class="switch-label">' +
    '<i class="fa fa-bluetooth-b"></i><span>Mode</span>' +
    '</div>' +
    '<div class="switch-toggleAgenda">' +
    '<input type="checkbox" id="bluetooth">' +
    '<label for="bluetooth"></label>' +
    '</div></div>' +
    '<div id="mapPark" class="mapPark">' +
    '</div>' +
    '<div id="extraWhiteboard"></div></div>'
    let option = document.getElementById('bluetooth')
    option.addEventListener('change', async () => {
        if(option.checked) {
            document.getElementById('extraWhiteboard').innerHTML = '';
            document.getElementById("extraWhiteboard").style = "";
            await makeBoardAgenda()
        } else {
            document.getElementById('extraWhiteboard').innerHTML = '';
            document.getElementById("extraWhiteboard").style = "";
            await ListAccepted()
        }
    })
    await ListAccepted()
}

async function ListAccepted(){
    async function getBase64(file, id) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
            formData = {}
            formData["data_pic"] = reader.result;
            formData["id_depannage"] = id;
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/addPhotoTD', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            await choiceAgendaAccepted()
        };
        reader.onerror = async function (error) {
            window.alert("Le fichier n'a pas été trouvé !")
            await choiceAgendaAccepted()
        };
    }
    let container = document.getElementById('extraWhiteboard')
    container.innerHTML = ""
    let name = sessionStorage.getItem('Member');
    let attributed = await findAttributed()
    for (let i=0;i<attributed.length;i++){
        if (attributed[i].NamePersonel === name){
            const id = attributed[i].Id
            let div = document.createElement('div')
            div.className = "containerAccepted"
            div.id = "containerAccepted" + id
            let string = ""
            if (attributed[i].IdBungalow != null){
                string += '<h1>B ' + attributed[i].IdBungalow + '</h1>'
            }else{
                string += '<h3>Pas de chalet</h3>'
            }
            string += '<h1>' + attributed[i].Description + '</h1>'

            string += '<h5>Materiel:</h5><br><div class="remarquesProduit">'
            let materielTD = await selectMaterial(attributed[i].Id)
            for (let i=0;i<materielTD.length;i++){
                let dateTD = new Date(materielTD[i].Date_material)
                dateTD.setHours(dateTD.getHours() - 2)
                let addDate = jsDateToString(dateTD)
                
                string += '<div class="remarqueInText">- '+ addDate + " -- " + materielTD[i].NamePersonel + " -- " + materielTD[i].Material + '</div><br>'
            }
            string += '</div>'
            if (attributed[i].Pause === 0){
                string += '<input type="text" name="materiel" class="remarque" id="materielToAdd' + id + '"/><br>' +
                '<button id="materielButton' + id + '" class="acceptButtons ajoutRemarque">Ajouter Materiel</button>'
            }

            string += '<h5>Remarque:</h5><br><div class="remarquesProduit">'
            let remarquesTD = await selectRemarque(attributed[i].Id)
            for (let i=0;i<remarquesTD.length;i++){
                let dateTD = new Date(remarquesTD[i].Date_remarque)
                dateTD.setHours(dateTD.getHours() - 2)
                let addDate = jsDateToString(dateTD)
                string += '<div class="remarqueInText">- '+ addDate + " -- " + remarquesTD[i].NamePersonel + " -- " + remarquesTD[i].Remarque_text + '</div><br>'
            }
            string += '</div>'
            if (attributed[i].Pause === 0){
                string += '</div><input type="text" name="remarque" class="remarque" id="remarque' + id + '"/><br>' +
                '<button id="ajoutRemarque' + id + '" class="acceptButtons ajoutRemarque">Ajouter Remarque</button>' +
                '<label for="files">Ajouter fichiers:</label><br>' +
                '<input type="file" id="files" name="files" multiple><br>' +
                '<button id="ajoutFichier' + id + '" class="acceptButtons">Ajouter Fichier</button>'
            }
            
            if (attributed[i].Pause === 0){
                string += '<button id="doneButton' + id + '" class="doneButton">Fini</button><br>' + '<button id="pauseButton' + id + '" class="pauseButton">Pause</button>'+
                '<button id="skipButton' + id + '" class="acceptButtons skipButton">Skip</button>' +
                '<button id="remetreButton' + id + '" class="acceptButtons remetreButton">Remettre</button>' +
                '<button id="planifierPlusTard' + id + '" class="acceptButtons planifierPlusTard">Agenda</button>' +
                '<button id="demandeAide' + id + '" class="acceptButtons demandeAide">Aide</button>'
            }else{
                string += '<button id="continuerButton' + id + '" class="pauseButton">Continuer</button>'
            }
            div.innerHTML = string
            container.appendChild(div)

            if (attributed[i].Pause === 0){
                document.getElementById('materielButton' + id).addEventListener('click', async () => {
                    let dataTranche = {}
                    dataTranche["text"] = document.getElementById('materielToAdd' + id).value;
                    dataTranche["id"] = id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertMaterial', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    document.getElementById("acepte").click()
                });

                document.getElementById('ajoutRemarque' + id).addEventListener('click', async () => {
                    let dataTranche = {}
                    dataTranche["text"] = document.getElementById('remarque' + id).value;
                    dataTranche["id"] = id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertRemarque', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    document.getElementById("acepte").click()
                });

                document.getElementById('demandeAide' + id).addEventListener('click', async () => {
                    let divToPlace = document.createElement('div');
                    divToPlace.id = "overlayDepannage"
                    divToPlace.innerHTML = '><button id="confirmAide" class="acceptButtons">Confirmer la demande</button>'
                    document.getElementById("containerAccepted" + id).appendChild(divToPlace)
                    createDivToPlaceAgenda(divToPlace)
                    document.getElementById('confirmAide').addEventListener('click', async () => {
                        await copyById(id)
                        await choiceAgendaAccepted()
                    })
                })

                document.getElementById('planifierPlusTard' + id).addEventListener('click', async () => {
                    if (document.getElementById('remarque' + id).value !== ""){
                        let dataTrancheRemarque = {}
                        dataTrancheRemarque["text"] = document.getElementById('remarque' + id).value;
                        dataTrancheRemarque["id"] = id
                        dataTrancheRemarque["name"] =  sessionStorage.getItem('Member');
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertRemarque', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTrancheRemarque)
                        });
                    }
                    if (document.getElementById('materielToAdd' + id).value !== ""){
                        let dataTrancheMateriel = {}
                        dataTrancheMateriel["text"] = document.getElementById('materielToAdd' + id).value;
                        dataTrancheMateriel["id"] = id
                        dataTrancheMateriel["name"] =  sessionStorage.getItem('Member');
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertMaterial', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTrancheMateriel)
                        });
                    }
                    let divToPlace = document.createElement('div');
                    let today = new Date()
                    let DateToUse = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
                    divToPlace.id = "overlayDepannage"
                    divToPlace.innerHTML = '<label>Planifier pour: </label><br>' + '<input type="date" id="dateToPlan"' +
                        'value=' + DateToUse + '><button id="finalAgendaButton" class="acceptButtons">Accepter</button>'
                    document.getElementById("containerAccepted" + id).appendChild(divToPlace)
                    createDivToPlaceAgenda(divToPlace)
                    document.getElementById('finalAgendaButton').addEventListener('click', async () => {
                        let dataTranche = {}
                        dataTranche["id"] = id
                        dataTranche["name"] =  sessionStorage.getItem('Member');
                        dataTranche["dateLimit"] = document.getElementById('dateToPlan').value //12:26
                        dataTranche["description"] = attributed[i].Description;
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/refuseDepannage', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTranche)
                        });
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/updateAgenda', {
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
                        document.getElementById("buttonPlan").click()
                    });
                })

                document.getElementById('doneButton' + id).addEventListener('click', async () => {
                    function getHoursOfDate() {
                        string = new Date().getHours();
                        string += ":" + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();
                        return string;
                    }
                    if (document.getElementById('remarque' + id).value !== ""){
                        let dataTrancheRemarque = {}
                        dataTrancheRemarque["text"] = document.getElementById('remarque' + id).value;
                        dataTrancheRemarque["id"] = id
                        dataTrancheRemarque["name"] =  sessionStorage.getItem('Member');
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertRemarque', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTrancheRemarque)
                        });
                    }
                    if (document.getElementById('materielToAdd' + id).value !== ""){
                        let dataTrancheMateriel = {}
                        dataTrancheMateriel["text"] = document.getElementById('materielToAdd' + id).value;
                        dataTrancheMateriel["id"] = id
                        dataTrancheMateriel["name"] =  sessionStorage.getItem('Member');
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/insertMaterial', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTrancheMateriel)
                        });
                    }
                    let divToPlace = document.createElement('div');
                    divToPlace.id = "overlayDepannage"
                    divToPlace.innerHTML = '<label>Fini: </label><br>' + '<input type="time" id="stopTime" step="300" value=' + getHoursOfDate() + '><button id="finalDoneButton" class="acceptButtons">Accepter</button>'
                    document.getElementById("containerAccepted" + id).appendChild(divToPlace)
                    createDivToPlaceAgenda(divToPlace)
                    document.getElementById('finalDoneButton').addEventListener('click', async () => {
                        let dataTranche = {}
                        dataTranche["id"] = id
                        dataTranche["name"] =  sessionStorage.getItem('Member');
                        dataTranche["stopTime"] = document.getElementById('stopTime').value //12:26
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/doneDepannage', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTranche)
                        });
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/endTrancheCustom', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTranche)
                        });
                        document.getElementById("buttonPlan").click()
                    });
                });

                document.getElementById('pauseButton' + id).addEventListener('click', async () => {
                    let dataTranche = {}
                    dataTranche["id"] = id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/pauseDepannage', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/endTranche', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    document.getElementById("acepte").click()
                });

                document.getElementById('skipButton' + id).addEventListener('click', async () => {
                    let divToPlace = document.createElement('div');
                    divToPlace.id = "overlayDepannage"
                    divToPlace.innerHTML = '<button id="finalDoneButton" class="acceptButtons" style="margin-top: 80px;">Confirmer</button>'
                    document.getElementById("containerAccepted" + id).appendChild(divToPlace)
                    createDivToPlaceAgenda(divToPlace)
                    document.getElementById('finalDoneButton').addEventListener('click', async () => {
                        let dataTranche = {}
                        dataTranche["id"] = id
                        dataTranche["name"] =  sessionStorage.getItem('Member');
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipDepannage', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTranche)
                        });
                        await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/endTranche', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(dataTranche)
                        });
                        document.getElementById("buttonPlan").click()
                    });
                });

                document.getElementById('remetreButton' + id).addEventListener('click', async () => {
                    let dataTranche = {}
                    dataTranche["id"] = id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
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
                    document.getElementById("buttonPlan").click()
                });

                document.getElementById('ajoutFichier' + id).addEventListener('click', async () => {
                    let pics = document.getElementById('files').files;
                    await getBase64(pics[0], id)
                })

            }else{
                document.getElementById('continuerButton' + id).addEventListener('click', async () => {
                    let dataTranche = {}
                    dataTranche["id"] = id
                    dataTranche["name"] =  sessionStorage.getItem('Member');
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/depauseDepannage', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/startTranche', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataTranche)
                    });
                    document.getElementById("acepte").click()
                });
            }
        }
    }
}

async function listeFaire(){
    let todo = await findStillToDo()
    let string = '<table style="width:100%" id=tableAFaire><tr>' +
    '<th class="actionDo">Date</th>' +
    '<th class="actionDo">Description</th>' +
    '<th class="actionDo">Urgence</th>' +
    '</tr>'
    for (let i=0;i<todo.length;i++){
        let dateTD = new Date(todo[i].DateMake)
        dateTD.setHours(dateTD.getHours() - 2)
        let addDate = jsDateToString(dateTD)
        if (todo[i].CodeUrgence === 1){
            string += '<tr>' +
            '<th class="actionDo">' + addDate +'</th>' +
            '<th class="actionDo">' + todo[i].Description + '</th>' + 
            '<th class="purgent actionDo"></th>'
            '</tr>'
        }else if(todo[i].CodeUrgence === 2){
            string += '<tr>' +
            '<th class="actionDo">' + addDate +'</th>' +
            '<th class="actionDo">' + todo[i].Description + '</th>' + 
            '<th class="normal actionDo"></th>'
            '</tr>'
        }else if(todo[i].CodeUrgence === 3){
            string += '<tr>' +
            '<th class="actionDo">' + addDate +'</th>' +
            '<th class="actionDo">' + todo[i].Description + '</th>' + 
            '<th class="urgent actionDo"></th>'
            '</tr>'
        }
    }
    document.getElementById("whiteboard").innerHTML = string
}

async function listeAttrib(){
    let todo = await findAttributed()
    let past = await selectPastDep()
    console.log(past)
    let string = '<h1>Dépanages prises</h1><table style="width:100%" id=tableAFaire><tr>' +
    '<th class="actionDo">Bungalow</th>' +
    '<th class="actionDo">Description</th>' +
    '<th class="actionDo">Pers.</th>' +
    '</tr>'
    for (let i=0;i<todo.length;i++){
        string += '<tr>' +
        '<th class="actionDo">' + todo[i].IdBungalow +'</th>' +
        '<th class="actionDo">' + todo[i].Description + '</th>' + 
        '<th class="actionDo">' + todo[i].NamePersonel + '</th>'
        '</tr>'
    }
    string += '</table><h1>Dépanages passée</h1><table style="width:100%" id=tableAFairePast><tr>' +
        '<th class="actionDo">Bungalow</th>' +
        '<th class="actionDo">Description</th>' +
        '<th class="actionDo">Pers.</th>' +
        '</tr>'
    for (let i=0;i<past.length;i++){
        let name = await personelWithId(past[i].IdDone)
        string += '<tr id="pastDepannage' + past[i].Id + '">' +
            '<th class="actionDo">' + past[i].IdBungalow +'</th>' +
            '<th class="actionDo">' + past[i].Description + '</th>' +
            '<th class="actionDo">' + name[0].NamePersonel + '</th>' +
        '</tr>'
    }
    string += '</table>'
    document.getElementById("whiteboard").innerHTML = string
    for (let i=0;i<past.length;i++){
        document.getElementById("pastDepannage" + past[i].Id).addEventListener('click', async () => {
            let divToPlace = document.createElement('div');
            divToPlace.id = "overlayPast"
            divToPlace.innerHTML = '<button id="finalDoneButton" class="acceptButtons" style="margin-top: 80px;">Confirmer</button>'
            document.getElementById("whiteboard").appendChild(divToPlace)
            createDivToPlacePast(divToPlace)
            document.getElementById("finalDoneButton").addEventListener('click', async () => {
                let dataTranche = {}
                dataTranche["id"] = past[i].Id
                dataTranche["name"] =  sessionStorage.getItem('Member');
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/startTranche', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTranche)
                });
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/reprendreDepannage', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataTranche)
                });
                await choiceAgendaAccepted()
            })
        })
    }

}

async function createFrameJournaliere(){
    document.getElementById("whiteboard").innerHTML = '<h1 id="commence">Commencé</h1><h1 id="libre">À Faire</h1>'
    const listNonStarted = await selectJournaliere()
    const listStarted = await selectJournalierePersonel()
    const com = document.getElementById("commence")
    for (let i=0;i<listStarted.length;i++){
        let container = document.createElement('div');
        container.className = "journaliereItem"
        let dateNew = new Date(listStarted[i].DatePlanned)
        container.innerHTML = "<h3>" + jsDateToString(dateNew, 1) + "</h3><h1>"+ listStarted[i].Beschrijving + "</h1>"
        if (listStarted[i].Remarque != " " && listStarted[i].Remarque != "  " && listStarted[i].Remarque != ""){
            container.innerHTML += "<p> >>>  " + listStarted[i].Remarque + "</p>"
        }
        let id = listStarted[i].id
        container.innerHTML += '<label for="remarque">Remarque:</label><br>' +
            '<input type="text" class="remarqueJourn" name="remarque" id="remarque' + id + '"/>'
        container.innerHTML += '<button id="skip' + id.toString() + '" class="acceptButtons skipButtonJourn">Skip</button>' +
            '<button id="done' + id.toString() + '" class="acceptButtons doneButtonJourn">Done</button>'
        com.appendChild(container)
    }

    for (let i=0;i<listStarted.length;i++){
        let id = listStarted[i].id
        document.getElementById('skip' + id.toString()).addEventListener("click", async () =>{
            let dataTranche = {}
            dataTranche["id"] = id
            dataTranche["name"] =  sessionStorage.getItem('Member');
            dataTranche["comment"] = document.getElementById("remarque" + id.toString()).value
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/skipJournaliere', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTranche)
            });
            document.getElementById("journal").click()
        })
        document.getElementById('done' + id.toString()).addEventListener("click", async () =>{
            let dataTranche = {}
            dataTranche["id"] = id;
            dataTranche["comment"] = document.getElementById("remarque" + id.toString()).value
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/stopJournaliere', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTranche)
            });
            document.getElementById("journal").click()
        })
    }

    const libre = document.getElementById("libre")
    for (let i=0;i<listNonStarted.length;i++){
        let container = document.createElement('div');
        container.className = "journaliereItem"
        let dateNew = new Date(listNonStarted[i].DatePlanned)
        container.innerHTML = "<h3>" + jsDateToString(dateNew, 1) + "</h3><h1>"+ listNonStarted[i].Beschrijving + "</h1>"
        if (listNonStarted[i].Remarque != " " && listNonStarted[i].Remarque != "  " && listNonStarted[i].Remarque != ""){
            container.innerHTML += "<p> >>>  " + listNonStarted[i].Remarque + "</p>"
        }
        let id = listNonStarted[i].id
        container.innerHTML += '<button id="accept' + id.toString() + '" class="acceptButtons acceptJourn">Accepter</button>'
        libre.appendChild(container)
    }

    for (let i=0;i<listNonStarted.length;i++){
        let id = listNonStarted[i].id
        document.getElementById('accept' + id).addEventListener("click", async () =>{
            let dataTranche = {}
            dataTranche["id"] = id
            dataTranche["name"] =  sessionStorage.getItem('Member');
            await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/startJournaliere', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataTranche)
            });
            document.getElementById("journal").click()
        })
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
        else if (key.charAt(0) != 5){
            window.open("./login.html", "_self");
        }

        await fillPlan()

        document.getElementById("journal").addEventListener("click", async () => {
            await createFrameJournaliere();
        })
        document.getElementById("buttonPlan").addEventListener("click", async () => {
            await fillPlan()
        })
        document.getElementById("acepte").addEventListener("click", async () => {
            await choiceAgendaAccepted()
        })
        document.getElementById("garde").addEventListener("click", async () => {
            await makePlanTD()
        })
        document.getElementById("listeFaire").addEventListener("click", async () => {
            await listeFaire()
        })
        document.getElementById("listeAccepte").addEventListener("click", async () => {
            await listeAttrib()
        })
    }

}

main()