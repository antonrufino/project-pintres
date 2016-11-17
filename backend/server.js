'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

app.use(require('method-override')());
app.use('/', express.static(path.join(__dirname + '/../frontend')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require(__dirname + '/routes/post-routes')(express.Router()));

app.listen(8000);
console.log('Running at localhost:8000');
