const express = require('express');
const path = require('path');
var morgan = require('morgan')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../Frontend')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on 3000');
});