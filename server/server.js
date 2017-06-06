require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var http = require('http');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/authenticate', '/users/register', '/climates', '/'] }));

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/climates', require('./controllers/climates.controller'));
app.use('/irrigations', require('./controllers/irrigations.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;

var server  = http.createServer(app);
require('./socket-io')(app, server);

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});