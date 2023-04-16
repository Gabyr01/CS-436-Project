var socket = io();

//listen to init event, call function handleInit
// socket.on('init', handleInit);


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

// Add event listener to "Get a Code" button
// getCodeButton.addEventListener("click", () => {
//     // Generate a random code
//     // Display the code in the lobby code display element
//     lobbyCodeDisplay.innerText = `Your lobby code is: ${generateLobbyCode(6)}`;
//     getCodeButton.style.display = 'none';
// });
/*



//setting colors
const BG_COLOR = "#80c3ff";

// get gameScreen element from main.html
const gameScreen = document.getElementById('gameScreen');

//create a canvas element and context element
let canvas, ctx;

//game state object here
const gameState = {

}
*/
/*
//instantiate inside an initialization funtion
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //setting canvas size
    canvas.width = canvas.height = 600;
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // event listenor on a keydown event 
    //calls function keydown
    document.addEventListener('keydown', keydown)
}

//THIS function was created for testing purpose
//keydown function
//e : event listener gets an event as an argument 
//console log the key that has been pressed
function keydown(e) {
    console.log(e.keyCode);
}



//call init to start
//init();

//paintGame function will accept our state object
function paintGame(S) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //fill out game state objects 
}

function handleInit(msg) {
    console.log(msg);
}
*/

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d')

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;


//global variables that change
let isPainting = false;
let lineWidth = 5;
//x and y is where drawing starts from based on mouse position
let startX;
let startY;

//click event listener for id toolbar
toolbar.addEventListener('click', e => {
    //when clear is clicked, emptying the canvas
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

//event to handle toolbar input changes
toolbar.addEventListener('change', e => {
    //changes the color value to the new value entered
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }
    //changes the lineWidth variable to the new value entered
    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    //to show the drawing while on mousedown event
    ctx.stroke();

}

//event for when the user starts to draw
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

//event for when the user is done drawing
canvas.addEventListener('mouseup', e => {
    isPainting = false;
    //fills in what is drawn
    ctx.stroke();
    //creates a new line and not connecting
    ctx.beginPath();
});

//event for when you move the mouse while drawing
canvas.addEventListener('mousemove', draw)