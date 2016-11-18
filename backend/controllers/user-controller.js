const connection = require(__dirname + '/../db');

exports.getUser = (req, res) => {
    res.send(req.session.user);
};
