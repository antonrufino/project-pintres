'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(require('method-override')());
app.use(bodyParser.json());

app.listen(8000);
