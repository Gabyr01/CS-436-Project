import player from "./player.js"

const prepareMessage = (class_, player) => {
    let {username, message } = player
    console.log(username)
    const chatbox = document.getElementById('chatbox')
    const Message = document.createElement('div')
    Message.classList.add(class_)
    Message.innerHTML = `${username}: ${message}`
    chatbox.appendChild(Message)
}

const chatbox = (socket) => {
    const form = document.getElementById("my-form");
    const formInput = document.getElementById("text-area");
    const sendButton = document.getElementById("send-button");

    let updateMessage = () => {
        player.message = formInput.value
    }

    formInput.addEventListener("input", updateMessage);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage(player);
        formInput.value = "";
    });

    sendButton.addEventListener("click", () => {
        formInput.value = "";
    });

    const sendMessage = (message) => {
        prepareMessage('self', player)
        socket.emit("chat-message", message);
    };
};

export { chatbox, prepareMessage };
