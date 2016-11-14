let mysql = require('mysql');

let connection = mysql.createConnection({
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

exports.getPost = (req, res) => {
    res.send(req.params.id);
}

exports.addPost = (req, res) => {
    res.send('Hello!');
}
