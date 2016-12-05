const connection = require(__dirname + '/../db');

exports.searchUser = (req, res) => {
    let query = 'SELECT username FROM users WHERE username LIKE ?';

    connection.query(query, [
        '%' + req.query.keyword + '%'
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.searchTopic = (req, res) => {
    let query = 'CALL searchTopic(?)';

    connection.query(query, [
        '%' + req.query.keyword + '%'
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows[0]);
        }
    });
}

exports.searchBoard = (req, res) => {
    let query = 'CALL searchBoard(?)';

    connection.query(query, [
        '%' + req.query.keyword + '%'
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows[0]);
        }
    });
}
