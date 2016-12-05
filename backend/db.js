const mysql = require('mysql');

const CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'jasonbourne03',
    database: 'pintres'
};

module.exports = mysql.createConnection(CONFIG, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected.');
    }
});
