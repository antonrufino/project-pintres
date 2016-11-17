const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pintres'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database is connected.');
    }
});

exports.login = () => {
    let query = 'SELECT username, display_name FROM pintres WHERE \
        username = PASSWORD(?) and password = PASSWORD(?);';

    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.send(rows);
        } else {
            res.send(rows);
        }
    });
}
