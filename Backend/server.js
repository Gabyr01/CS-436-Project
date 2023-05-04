
const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
//const io_routing = require('./io/routing.js')

const PORT = 3051

// Create a new instance of the http module 
const http = require('http');

//server is the object returned by the http.createServer() method
const server = http.createServer(app);

//import the socket.io module and create a new instance of it:
const { Server } = require("socket.io");
const io = new Server(server);

app.use(morgan('dev'));

//pathing to frontend
app.use('/', express.static(path.join(__dirname, '../Frontend/static')));
app.use('/', express.static(path.join(__dirname, '../Frontend/styles')));
app.use('/', express.static(path.join(__dirname, '../Frontend/code')));

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

// Add a listener to the connection event to handle new connections from clients:
io.on('connection', (socket) => {

    console.log('a user connected');

    // socket.on('createRoom', () => {
    //     const roomName = generateLobbyCode(6);
    //     socket.join(roomName);
    //     console.log(`Room "${roomName}" created.`);
    // });

    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg);
      });
    
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

// When a new user connects, you can assign them to a new room or join an existing room:
var roomno = 1;

io.on('connection', function(socket) {
    console.log(socket.rooms); // Set { <socket.id> }
    socket.join("room-" + roomno);
    //Send this event to everyone in the room.
    io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
    console.log(socket.rooms); // Set { <socket.id>, "room1" }
    console.log("you are in room: ", roomno);
    //socket.leave("room-"+roomno);//to leave the room 
});

