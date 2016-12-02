const connection = require(__dirname + '/../db');

exports.getUser = (req, res) => {
    res.send(req.session.user);
};

exports.getSubsrcibedTopics = (req, res) => {
    let query = 'SELECT topic FROM user_topic WHERE username = ?';

    console.log(req.params);

    connection.query(query, [
        req.params.username
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });
}

exports.createUser = (req, res) => {
    let query = 'INSERT INTO users VALUES(?, PASSWORD(?), ?)';

    connection.query(query, [
        req.body.username,
        req.body.password,
        req.body.email
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            req.session.user = {
                username: req.body.username
            }

            res.status(200).send({success: true});
        }
    });
}
