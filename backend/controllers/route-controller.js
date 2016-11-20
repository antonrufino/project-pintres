const path = require('path')

exports.main = (req, res) => {
    res.sendFile(path.join(__dirname, '/../../frontend/index.html'));
}

exports.notFound = (req, res) => {
    res.sendFile(path.join(__dirname, '/../../frontend/404.html'));
}
