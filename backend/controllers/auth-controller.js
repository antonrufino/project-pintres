const connection = require(__dirname + '/../db');

exports.login = (req, res) => {
    let query = 'SELECT username FROM users WHERE \
        username = ? and password = PASSWORD(?);';

    connection.query(query, [
        req.body.username,
        req.body.password
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if (rows.length > 0) {
                req.session.user = {
                    username: req.body.username
                };
            }
            res.send(rows); 
        }
    });
}

exports.logout = (req, res) => {
    req.session = null;
    res.redirect('/login');
}
