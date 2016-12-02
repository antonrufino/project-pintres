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
