'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');

const app = express();

app.use(require('method-override')());
app.use('/', express.static(path.join(__dirname + '/../frontend')));
app.use(cookieSession({secret: 'p1ntr3s'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require(__dirname + '/router')(express.Router()));

app.listen(8000);
console.log('Running at localhost:8000');
