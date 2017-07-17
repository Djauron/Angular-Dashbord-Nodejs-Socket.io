// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
//
// exports.jsonPost = function(request, response){
//     var data = request.body;
//     io.sockets.emit('r', data);
//
//     response.render("index", {data: data});
// };