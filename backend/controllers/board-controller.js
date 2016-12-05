const connection = require(__dirname + '/../db');

exports.searchBoard = (req, res) => {
    const query = 'SELECT * FROM boards WHERE id = ?;'
    connection.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.getAllBoards = (req, res) => {
    const query = 'SELECT * FROM boards'
    connection.query(query, [], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.addBoard = (req, res) => {
    const query = 'INSERT INTO boards(name, creator) VALUES(?, ?);'

    connection.query(query, [
	    req.body.name,
        req.session.user.username
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            rows.insertDate = new Date();
            res.send(rows);
        }
    });
}

exports.deleteBoard = (req, res) => {
    const query = 'DELETE FROM boards WHERE id = ?';

    connection.query(query, [req.body.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.editBoard = (req, res) => {
    const query = 'UPDATE boards SET name = ? WHERE id = ?';

    connection.query(query, [
        req.body.name,
        req.body.id
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.getBoardPosts = (req, res) => {
    const query = `
        SELECT posts.id, author_username, content, topic, post_time FROM posts
        JOIN board_post ON
            board_post.post_id = posts.id
        WHERE board_post.board_id = ?;
    `;

    connection.query(query, [
        req.params.id
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}
