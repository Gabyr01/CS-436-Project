const params = new URLSearchParams(window.location.search);
const recieved_username = params.get('username');

const player = {
    username: recieved_username,
    message: " ",
  };

export default player;