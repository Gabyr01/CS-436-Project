const express = require('express');
const path = require('path');
var morgan = require('morgan')
const app = express();
// Create a new instance of the http module 
const http = require('http');


/****/

/****/
//server is the object returned by the http.createServer() method
const server = http.createServer(app);

//import the socket.io module and create a new instance of it:
const { Server } = require("socket.io");
const io = new Server(server);

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../Frontend')));


server.listen(3000, () => {
    console.log('listening on 3000');
});

// Add a listener to the connection event to handle new connections from clients:
io.on('connection', (socket) => {
    console.log('a user connected');
    // send a message to the client, use the emit method on the socket object:
    socket.emit('hello', 'Hello, client!');
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