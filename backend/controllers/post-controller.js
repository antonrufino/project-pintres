const connection = require(__dirname + '/../db');

exports.getPost = (req, res) => {
    const query = 'SELECT * FROM posts WHERE id = ?;'
    connection.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.getAllPosts = (req, res) => {
    const query = 'SELECT posts.id, posts.author_username, users.display_name \
        as author_display_name, posts.post_time, posts.content, posts.topic \
        FROM posts JOIN users ON users.username = posts.author_username;';
    connection.query(query, [], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.addPost = (req, res) => {
    const query = 'INSERT INTO posts(author_username, post_time, content, topic) VALUES(?, NOW(), ?, ?);'

    connection.query(query, [
        req.session.user.username,
        req.body.content,
        req.body.topic
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

exports.deletePost = (req, res) => {
    const query = 'DELETE FROM posts WHERE id = ?';

    connection.query(query, [req.body.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.editPost = (req, res) => {
    const query = 'UPDATE posts SET content = ?, topic = ? WHERE id = ?';

    connection.query(query, [
        req.body.content,
        req.body.topic,
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
