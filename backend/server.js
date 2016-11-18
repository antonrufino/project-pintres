'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');

const app = express();

app.use(require('method-override')());
app.use(cookieSession({secret: 'p1ntr3s'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.session.user === undefined) {
        if (req.originalUrl.indexOf("login") !== -1) {
            next();
        } else if (req.originalUrl.startsWith('/api')) {
            res.status(403).send('Access denied!');
        } else {
            res.redirect('/login.html');
        }
    } else {
        next();
    }
})
app.use('/', express.static(path.join(__dirname + '/../frontend')));
app.use(require(__dirname + '/router')(express.Router()));

app.listen(8000);
console.log('Running at localhost:8000');
