const connection = require(__dirname + '/../db');

exports.searchBoardUser = (req, res) => {
    const query = 'SELECT * FROM board_user WHERE board_id = ?;'
    connection.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.getAllBoardUsers = (req, res) => {
    const query = 'SELECT * FROM board_user'
    connection.query(query, [], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.addBoardUser = (req, res) => {
    const query = 'INSERT INTO board_user(board_id, username) VALUES(?, ?);'

    connection.query(query, [
	    req.params.id,
        req.session.user.username,
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.deleteBoardUser = (req, res) => {
    const query = 'DELETE FROM board_user WHERE board_id = ? AND username = ?';

    connection.query(query, [
        req.params.id,
        req.session.user.username
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.isSubscribed = (req, res) => {
    const query = 'SELECT * FROM board_user WHERE board_id = ? AND username = ?';

    connection.query(query, [
        req.params.id,
        req.session.user.username
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}
