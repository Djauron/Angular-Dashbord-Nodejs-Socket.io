// NodeJs APP

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');
var engines = require('consolidate');

app.use(bodyParser.json());
app.set('views', path.join('./app/', 'views'));

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static('public'));

app.post('/result', function(req, res){
   io.sockets.emit('jsonReq', req.body);
   res.send({});
});

app.get('/result', function(req, res){
    res.render('index');
});

// If you need other page you can config it with route.js and IoTController
//require('./app/config/route.js')(app);


server.listen(8080);