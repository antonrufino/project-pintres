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

exports.login = (req, res) => {
    let query = 'SELECT username, display_name FROM users WHERE \
        username = PASSWORD(?) and password = PASSWORD(?);';

    connection.query(query, [
        req.body.username,
        req.body.password
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.send(rows);
        } else {
            if (rows.length > 0) {
                req.session.username = rows[0].username;
                req.session.display_name = rows[0].display_name;
                res.send({success: true});
            } else {
                res.send({success: false});
            }
        }
    });
}

// testing only.
exports.logintest = (req, res) => {
    let query = 'SELECT username, display_name FROM users WHERE \
        username = PASSWORD(?) and password = PASSWORD(?);';

    req.session.username = 'antonrufino';
    req.session.password = 'whatpassword';

    res.redirect('/index.html');
}
