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


// Handle POST request to "/index"
app.post("/index", (req, res) => {
    // Extract lobby code and username from request body
    const { lobbyCode, username } = req.body;

    // Do something with lobby code and username
    // ...

    // Send response to client
    res.send("POST request received");
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

const rooms = {};


// Find an existing user in a room
function findExistingUser(roomId, username) {
    const room = rooms[roomId];
    if (!room || !room.users) {
        return null;
    }
    return room.users.find((user) => user.username === username);
}


const addUser = (roomId, user) => {
    // Create the room object if it doesn't exist
    if (!rooms[roomId]) {
        rooms[roomId] = { users: [] };
    }

    // Add the user to the users array of the room
    rooms[roomId].users.push(user);
};

// Add a listener to the connection event to handle new connections from clients:
io.on('connection', (socket) => {

    console.log('a user connected');
    console.log(`User ${socket.id} connected`);
    console.log()


    socket.on('createRoom', (lobbyCode) => {
        // socket.join(lobbyCode);
        // console.log(`Room "${lobbyCode}" created.`);
        const roomId = lobbyCode; // Convert lobby code to lower case and use it as roomId

        // Add room to the rooms object
        rooms[roomId] = {
            users: [],
            // gameData: {},
        };

        socket.join(roomId);
        console.log(`Room "${roomId}" created.`);
    });
    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log(`User ${socket.id} disconnected`);
        // Remove the user from the room's users array
        Object.keys(rooms).forEach((roomId) => {
            rooms[roomId].users = rooms[roomId].users.filter((user) => user.id !== socket.id);
        });

    });

    socket.on('joinRoom', ({ lobbyCode, username }, callback) => {
        const existingUser = findExistingUser(lobbyCode, username);

        if (existingUser) {
            // User with same username already exists in the room
            callback({ status: 'error', message: 'Username already taken' });
        } else if (!rooms[lobbyCode]) {
            // Room does not exist
            callback({ status: 'error', message: 'Room does not exist' });

        } else {
            // Add user to the room
            const user = { id: socket.id, username };
            addUser(lobbyCode, user);

            // Join the room
            socket.join(lobbyCode);

            // Send a welcome message to the user
            //socket.emit('message', { username: 'admin', text: `Welcome to the lobby, ${user.username}!` });
            console.log(`Welcome to the room ${ user.roomId}, ${ user.username }!`);
            // Broadcast a message to everyone in the room except the user
            socket.to(lobbyCode).emit('message', { username: 'admin', text: `
                                    $ { user.username }
                                    has joined the lobby ` });
            // Send the status of the join request to the client
            callback({ status: 'success', message: 'Joined lobby successfully' });
        }
    });

});















// When a new user connects, you can assign them to a new room or join an existing room:
// var roomno = 1;

// io.on('connection', function(socket) {
//     console.log(socket.rooms); // Set { <socket.id> }
//     socket.join("room-" + roomno);
//     //Send this event to everyone in the room.
//     io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
//     console.log(socket.rooms); // Set { <socket.id>, "room1" }
//     console.log("you are in room: ", roomno);
//     //socket.leave("room-"+roomno);//to leave the room 
// });