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

let pictures = {};

pictures.findByCleaning = (cleaning) => {
    return new Promise((resolve, reject) => {
        pool.query('select picture from pictures where cleaning=?', [cleaning], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

pictures.add = (cleaning, picture) => {
    return new Promise((resolve, reject) => {
        pool.query('insert into pictures(cleaning, picture) values (?, ?)', [cleaning, picture], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = pictures;