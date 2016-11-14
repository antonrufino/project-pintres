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
    let query = 'SELECT * FROM posts WHERE id = ?;'
    connection.query(query, [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.addPost = (req, res) => {
    let query = 'INSERT INTO posts(author_username, author_display_name, post_time, content, topic) VALUES(?, ?, NOW(), ?, ?);'

    connection.query(query, [
        req.body.author_username,
        req.body.author_display_name,
        req.body.content,
        req.body.topic
    ], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}
