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

let cleanings = {};

cleanings.check = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('select bungalow_nb from cleanings where check_checked=false and femme_check=?', [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cleanings.controle = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('select bungalow_nb from cleanings where control_checked=false and femme_controle=?', [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cleanings.bungalow = (nr) => {
    return new Promise((resolve, reject) => {
        pool.query('select * from cleanings where bungalow_nb=? and control_checked=false', [nr], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

cleanings.identifier = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select * from cleanings where identifier=?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = cleanings;