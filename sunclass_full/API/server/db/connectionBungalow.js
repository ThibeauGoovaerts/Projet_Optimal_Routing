const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({ path: '.env' });

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
});


let bungalow = {};

bungalow.Unit = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select xCoordinate, yCoordinate from bungalows where Id=?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = bungalow;