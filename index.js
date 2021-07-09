// Express initializes app to be a function handler that you can supply to an http server (as seen in line 6)

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/*  We define a route handler / that gets called when we hit our website home/
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});
*/

// lets refactor the route handler to use sendFile instead 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/* io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
*/

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value'});

/* io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
*/

// we make the http server listen on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});

/*
Socket.IO is composed of two parts. 
1. A server that integrates with (or mounts on) the Node.JS HTTP server socket.io
2. a client library that loads on the browser side socket.io-client
During development, socket.io serves the client automatically for us, as we'll see, so you only need to install one module.
*/