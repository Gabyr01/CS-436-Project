//import { chatbox, prepareMessage } from './chatbox.js'

var socket = io();

// recieving message
// chatbox(socket)

// socket.on("chat-message", (info) => {
//     prepareMessage('incomingMessage', info)
// });


const getCodeButton = document.getElementById("get-code");
const lobbyCodeDisplay = document.getElementById("lobby-code-display");

getCodeButton.addEventListener('click', function() {
    // Generate a lobby code and display it
    const lobbyCode = generateLobbyCode(6);
    lobbyCodeDisplay.innerText = lobbyCode;
    getCodeButton.style.display = "none";
});


function generateLobbyCode(length) {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return code;
}