const mysql = require('mysql');

const CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pintres'
};

module.exports = mysql.createConnection(CONFIG, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected.');
    }
});
