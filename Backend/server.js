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

app.post('/index',(req, res)=>{
  res.redirect('index.html')
})




server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

// Add a listener to the connection event to handle new connections from clients:
io.on('connection', (socket) => {

    const connectedClients = Object.keys(io.sockets.sockets).map((socketId) => {
        return io.sockets.sockets[socketId];
    });
      
      // Logging information about each connected client
    connectedClients.forEach((clientSocket) => {
        console.log('Client ID:', clientSocket.id);
      });
      
      // Example usage: Sending a message to all connected clients
    io.emit('message', 'Hello, everyone! This is a broadcast message.');

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

io.sockets.on('connection', newConnection);
function newConnection(socket){
    console.log('new connection ' + socket.id);

    socket.on('mouse', mouseMsg);
    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log(data);
    }
}


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

