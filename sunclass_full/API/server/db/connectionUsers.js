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


let users = {};

users.User = (name, password) => {
    return new Promise((resolve, reject) => {
        pool.query('select clearing from users where name=? and password=?', [name, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

users.checkExistence = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('select Id from users where name=?', [name], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = users;