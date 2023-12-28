const express = require('express');
var indexRouter = require('./routes/index');
const fs = require('fs');
var path = require('path');
var https = require('https');
var http = require('http');

const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const port = 3072, https_port = 3073;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
//app.listen(port, () => {});

var privateKey  = fs.readFileSync('certs/private.key', 'utf8');
var certificate = fs.readFileSync('certs/certificate.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(https_port);