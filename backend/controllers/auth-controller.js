const connection = require(__dirname + '/../db');

exports.login = (req, res) => {
    let query = 'SELECT username, display_name FROM users WHERE \
        username = PASSWORD(?) and password = PASSWORD(?);';

    db.connection.query(query, [
        req.body.username,
        req.body.password
    ], (err, rows) => {
        if (err) {
            console.log(err);
            res.send(rows);
        } else {
            if (rows.length > 0) {
                req.session.user = {
                    username: req.body.username,
                    display_name: rows[0].display_name
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
        username: 'antonrufino',
        display_name: 'Anton Rufino'
    }

    res.redirect('/main');
}

exports.logout = (req, res) => {
    req.session = null;
    res.redirect('/login');
}
