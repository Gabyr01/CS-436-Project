const chatbox = (socket) => {
    const form = document.getElementById("my-form");
  
    console.log(form);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formInput = document.getElementById("text-area").value;
  
      if (notEmpty(formInput)) {
        const message = createMessage(formInput);
        sendMessage(message);
      } else {
        return;
      }
    });
  
    const notEmpty = (message) => message;
  
    const regexMessage = (message, username = "") => {
      return `${username ? username + ": " : ""}${message}`;
    };
  
    const createMessage = (message) => {
      const formattedMessage = regexMessage(message);
  
      return formattedMessage;
    };
  
    const sendMessage = (message) => {
      socket.emit("chat-message", message);
    };

    const getMessage = () => {
        socket.on('chat-message', (mssg) => {
            return mssg
        })
    }

  };
  
  export default chatbox;