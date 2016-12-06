const connection = require(__dirname + '/../db');

exports.getUser = (req, res) => {
    res.send(req.session.user);
};

exports.getSubscribedTopics = (req, res) => {
    let query = 'CALL getSubscribedTopics(?)';

    connection.query(query, [
        req.params.username
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows[0]);
        }
    });
}

exports.getSubscribedBoards = (req, res) => {
    let query = 'CALL getSubscribedBoards(?)';

    connection.query(query, [
        req.params.username
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows[0]);
        }
    });
}

exports.getBoardsByUser = (req, res) => {
    let query = 'CALL getBoardsByUser(?)';

    connection.query(query, [
        req.params.username
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows[0]);
        }
    });
}

exports.getPostsByUser = (req, res) => {
    let query = 'SELECT * FROM posts WHERE author_username = ?';

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
    let query = 'INSERT INTO users(username, passowrd, email) VALUES(?, PASSWORD(?), ?)';

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

exports.editUser = (req, res) => {
    let query = `
        UPDATE users
        SET username = ?, password = PASSWORD(?), description = ?
        WHERE username = ?
    `;

    connection.query(query, [
        req.body.username,
        req.body.password,
        req.body.description,
        req.params.username
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            req.session.user.username = req.body.username;
            res.status(200).send(rows);
        }
    });
}
