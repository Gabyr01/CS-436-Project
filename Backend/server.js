// import socket.io
//import a function & immediately call it to get socket.io object
const io = require('socket.io')();


//inline arrow function
//gives us a client object
//client object will allow us  to communicate back to the client that has just connected

io.on('connection', client => {
    //sending an object with the data key that states hello
    client.emit('init', { data: 'hello' })
});
io.listen(8000);