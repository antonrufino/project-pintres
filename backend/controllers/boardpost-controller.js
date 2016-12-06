const connection = require(__dirname + '/../db');

exports.searchBoardPost = (req, res) => {
    const query = 'SELECT * FROM board_post WHERE board_id = ?;'
    connection.query(query, [req.params.id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.getAllBoardPosts = (req, res) => {
    const query = 'SELECT * FROM board_post'
    connection.query(query, [], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.send(rows);
        }
    });
}

exports.addBoardPost = (req, res) => {
    const query = 'INSERT INTO board_post(board_id, post_id) VALUES(?, ?);'
    console.log('kek2')
    connection.query(query, [
    	req.body.board_id,
    	req.body.post_id
    ], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            rows.insertDate = new Date();
            res.status(200).send(rows);
        }
    });
}

exports.deleteBoardPost = (req, res) => {
    const query = 'DELETE FROM board_post WHERE post_id = ?';
    console.log('kek1')
    connection.query(query, [req.body.post_id], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            console.log(err);
        } else {
            res.status(200).send(rows);
        }
    });
}
