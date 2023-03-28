var socket = io();

//listen to init event, call function handleInit
socket.on('init', handleInit);


//setting colors
const BG_COLOR = "#80c3ff";

// get gameScreen element from main.html
const gameScreen = document.getElementById('gameScreen');

//create a canvas element and context element
let canvas, ctx;

//game state object here
const gameState = {

}


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
init();

//paintGame function will accept our state object
function paintGame(S) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //fill out game state objects 
}

function handleInit(msg) {
    console.log(msg);
}