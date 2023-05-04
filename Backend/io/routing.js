const io_routing = (socket) => {
    console.log('a user connected');

    // socket.on('createRoom', () => {
    //     const roomName = generateLobbyCode(6);
    //     socket.join(roomName);
    //     console.log(`Room "${roomName}" created.`);
    // });

    socket.on('chat-message', (msg) => {
        console.log(msg);
        io.emit('chat-message', msg); // emit the message to all connected clients
      });
    
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}


export default io_routing