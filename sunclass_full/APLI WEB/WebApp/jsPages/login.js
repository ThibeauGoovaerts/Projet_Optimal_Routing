document.getElementById('sub').addEventListener('click', async e => {
    const name = document.getElementById("name");
    const password = document.getElementById("pass");
    const nameValue = name.value;
    const passwordValue = password.value;
    let formData = {}
    formData["password"] = passwordValue
    formData["name"] = nameValue
    let redirect = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/secureUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    let res = await redirect.json();
    if (res.status === "404"){
        document.getElementById("error").innerText = res.message;
    }else{
        sessionStorage.setItem("Password", passwordValue);
        let today = new Date();
        sessionStorage.setItem("AuthenticationExpires", today.setHours(today.getHours() + 5).toString());
        sessionStorage.setItem("Member", name.value.toString());
        sessionStorage.setItem("verifKey", res.key);
        window.open(res.message, '_self');
    }
})

document.getElementById('changepassw').addEventListener("click", async () => {
    document.getElementById('whiteboard').innerHTML = '<h1>Changer mot de passe</h1>\n' +
        '        <form method="post" action="">\n' +
        '            <input type="text" name="u" id="name" placeholder="Nom" required="required" />\n' +
        '            <input type="password" name="pOld" id="pOld" placeholder="Ancien mot de passe" required="required" />\n' +
        '            <input type="password" name="pNew" id="pNew" placeholder="Nouveau mot de passe" required="required" />\n' +
        '            <input type="password" name="pNewConfirm" id="pNewConfirm" placeholder="Confirmation nouveau mot de passe" required="required" />\n' +
        '            <input type="button" id="confirmChangement" class="btn btn-primary btn-block btn-large" value="Confirmer" />\n' +
        '            <div id="error"></div>' +
        '        </form>'
    
    document.getElementById('confirmChangement').addEventListener("click", async () => {
        if (document.getElementById('pNew').value != document.getElementById('pNewConfirm').value){
            document.getElementById('error').innerText = "La confirmation et le nouveau mot de passe ne sont pas identique."
        }
        else if(document.getElementById('pNew').value === ""){
            document.getElementById('error').innerText = "Le nouveau mot de passe ne peut pas etre vide."
        }
        else if (document.getElementById('pNew').value === document.getElementById('pOld').value){
            document.getElementById('error').innerText = "Le vieux et le nouveau mot de passe sont identique. On ne peut pas changer le mot de passe."
        }
        else{
            let formData = {}
            formData["password"] = document.getElementById('pOld').value;
            formData["name"] = document.getElementById('name').value;
            let redirect = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/secureUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            let res = await redirect.json();
            if (res.status === "404"){
                document.getElementById("error").innerText = "Le vieux mot de passe n'est pas correct";
            }else{
                let formDataExpress = {}
                formDataExpress["NamePersonel"] = document.getElementById('name').value;
                formDataExpress["PasswdOld"] = document.getElementById('pOld').value;
                formDataExpress["PasswdNew"] = document.getElementById('pNew').value;
                await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/setNewPasswd', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataExpress)
                });
                let formConfirm = {}
                formConfirm["password"] = document.getElementById('pNew').value;
                formConfirm["name"] = document.getElementById('name').value;
                let redirect = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/secureUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formConfirm)
                });
                let res = await redirect.json();
                console.log(res)
                if (res.status === "404"){
                    document.getElementById("error").innerText = "Le changement de mot de passe n'a pas su se faire.";
                }else{
                    document.getElementById('whiteboard').innerHTML = '<h1>Login</h1>\n' +
                        '        <form method="post" action="">\n' +
                        '            <input type="text" name="u" id="name" placeholder="Nom" required="required" />\n' +
                        '            <input type="password" name="p" id="pass" placeholder="Mot de passe" required="required" />\n' +
                        '            <a id="changepassw">Changer mot de passe</a>\n' +
                        '            <input type="button" id="sub" class="btn btn-primary btn-block btn-large" value="Login" />\n' +
                        '        </form>\n' +
                        '        <div id="error">le changement de mot de passe s\'est fait.</div>'

                    document.getElementById('sub').addEventListener('click', async e => {
                        const name = document.getElementById("name");
                        const password = document.getElementById("pass");
                        const nameValue = name.value;
                        const passwordValue = password.value;
                        let formData = {}
                        formData["password"] = passwordValue
                        formData["name"] = nameValue
                        let redirect = await fetch('http://ec2-3-68-93-242.eu-central-1.compute.amazonaws.com:3000/secureUser', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        });
                        let res = await redirect.json();
                        if (res.status === "404"){
                            document.getElementById("error").innerText = res.message;
                        }else{
                            sessionStorage.setItem("Password", passwordValue);
                            let today = new Date();
                            sessionStorage.setItem("AuthenticationExpires", today.setHours(today.getHours() + 5).toString());
                            sessionStorage.setItem("Member", name.value.toString());
                            sessionStorage.setItem("verifKey", res.key);
                            window.open(res.message, '_self');
                        }
                    })
                }
            }
        }
    })
    
})
