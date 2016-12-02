const connection = require(__dirname + '/../db');

exports.subscribe = (req, res) => {
    let query = 'INSERT INTO user_topic VALUES(?, ?)';

    connection.query(query, [
        req.body.username,
        req.body.topic
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });
}

exports.unsubscribe = (req, res) => {
    let query = 'DELETE FROM user_topic WHERE username = ? AND topic = ?';

    connection.query(query, [
        req.body.username,
        req.body.topic
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });
}
