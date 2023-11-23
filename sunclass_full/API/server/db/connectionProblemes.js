const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });


// Connection to the database, in this case called dbsunclass
const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
});

let problemes = {};

problemes.findByCleaning = (cleaning) => {
    return new Promise((resolve, reject) => {
        pool.query('select text from problemes where cleaning=?', [cleaning], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

problemes.add = (nr_bungalow, cleaning, text) => {
    return new Promise((resolve, reject) => {
        pool.query('insert into problemes(nr_bungalow, cleaning, text, seen, done) values (?, ?, ?, false, false)', [nr_bungalow, cleaning, text], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = problemes;