'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(require('method-override')());
app.use('/', express.static(path.join(__dirname + '/../frontend')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require(__dirname + '/routes/post-routes')(express.Router()));
app.use(require(__dirname + '/routes/auth-routes')(express.Router()));

app.listen(8000);
console.log('Running at localhost:8000');
