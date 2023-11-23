const express = require('express');
const router = express.Router();
const dbBungalows = require('../db/connectionBungalow.js');
const dbUsers = require('../db/connectionUsers.js');
const dbCleanings = require('../db/dbConnection.js');
const dbProblemes = require('../db/connectionProblemes.js');
const dbPictures = require('../db/connectionPictures.js');


// Return the coordinates of the bungalow passed as an Id
router.get('/bungalow/:id', async (req, res, next) => {
    try {
        let results = await dbBungalows.Unit(req.params.id);
        res.json(results)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// return an according message to the client, either the message that the user does not exist, or that the password is wrong, either the clearing of the member
router.get('/auth/:name/:password', async (req, res, next) => {
    try {
        let results = await dbUsers.User(req.params.name, req.params.password);
        if (results.length === 0) {
            let exists = await dbUsers.checkExistence(req.params.name);
            if (exists.length === 0) {
                results = { message: "Ce nom d'utilisateur n'est pas connu!", status: "404" }
            }
            else {
                results = { message: "Ce mot de passe n'est pas correct.", status: "404" }
            }
        }
        else {
            results = { message: results[0].clearing, status: "201" }
        }
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/cleanings/individual/:name', async (req, res, next) => {
    try {
        let resultsCheck = await dbCleanings.check(req.params.name);
        let resultsControl = await dbCleanings.controle(req.params.name);
        let bungalowsCheck = [];
        for (let i = 0; i < resultsCheck.length; i++) {
            bungalowsCheck.push(resultsCheck[i].bungalow_nb);
        }
        let bungalowsControle = [];
        for (let i = 0; i < resultsControl.length; i++) {
            bungalowsControle.push(resultsControl[i].bungalow_nb);
        }
        results = { check: bungalowsCheck, controle: bungalowsControle };
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/cleaningsSelect/:nr', async (req, res, next) => {
    try {
        let results = await dbCleanings.bungalow(req.params.nr);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/problemesCleaning/:cleaning', async (req, res, next) => {
    try {
        let results = await dbProblemes.findByCleaning(req.params.cleaning);
        let problemes = [];
        for (let i = 0; i < results.length; i++) {
            problemes.push(results[i].text)
        }
        results = { problemes: problemes }
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/addProbleme', async (req, res) => {
    try {
        const cleaning = req.body.cleaning;
        const text = req.body.text;
        let info_cleaning = await dbCleanings.identifier(cleaning);
        const bungalow_nb = info_cleaning[0].bungalow_nb;
        let results = await dbProblemes.add(bungalow_nb, cleaning, text);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    
});

router.post('/addPicture', async (req, res) => {
    try {
        const cleaning = req.body.cleaning;
        const blob = req.body.picture;
        let results = await dbPictures.add(cleaning, blob);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
        
});

router.get('/pictureCleaning/:cleaning', async (req, res, next) => {
    try {
        let results = await dbPictures.findByCleaning(req.params.cleaning);
        let pictures = [];
        for (let i = 0; i < results.length; i++) {
            pictures.push(results[i].picture)
        }
        results = { pictures: pictures }
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = router;