const connection = require(__dirname + '/../db');

exports.login = (req, res) => {
    let query = 'SELECT username, display_name FROM users WHERE \
        username = ? and password = PASSWORD(?);';

    connection.query(query, [
        req.body.username,
        req.body.password
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.send(rows);
        } else {
            if (rows.length > 0) {
                req.session.user = {
                    username: req.body.username
                };

                res.redirect('/main');
            } else {
                res.send({success: false});
            }
        }
    });
}

// testing only.
exports.logintest = (req, res) => {
    let query = 'SELECT username, display_name FROM users WHERE \
        username = PASSWORD(?) and password = PASSWORD(?);';

    req.session.user = {
        username: 'antonrufino'
    }

    res.redirect('/main');
}

exports.logout = (req, res) => {
    req.session = null;
    res.redirect('/login');
}
