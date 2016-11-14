'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(require('method-override')());
app.use(bodyParser.json());
app.use(require(__dirname + '/router')(express.Router()));

app.listen(8000);
console.log('Running at localhost:8000');
