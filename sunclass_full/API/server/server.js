const express = require('express');
const apiRouter = require('./routes/routesIndex.js');
const bodyParser = require('body-Parser');
const dotenv = require('dotenv');

dotenv.config({ path: "../.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '200mb'
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use('/api/sunclass', apiRouter);
app.listen(process.env.PORT || '3000', () => {

    const port = process.env.PORT || '3000'
    console.log('Server is running on port : ' + port)
});

