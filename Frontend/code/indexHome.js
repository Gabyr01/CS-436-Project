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
    // Emit a 'createRoom' event to the server with the generated lobby code
    socket.emit('createRoom', lobbyCode);
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

///////////////////////////////////////

function joinLobby(event) {
    event.preventDefault();
    window.location.href = "/index.html";
    // const lobbyCodeInput = document.getElementById("lobby-code");
    // const usernameInput = document.getElementById("username");
    // const lobbyCode = lobbyCodeInput.value.trim();
    // const username = usernameInput.value.trim();
    console.log(lobbyCode);
    // if (!lobbyCode || !username) {
    //     alert("Please enter a lobby code and username");
    //     return;
    // }
    // socket.emit("joinRoom", { lobbyCode, username }, (response) => {
    //     if (response.status === "success") {
    //         window.location.href = "/index.html";
    //     } else {
    //         alert(response.message);
    //     }
    // });
}