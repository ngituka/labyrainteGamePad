
import {socket} from './websocket.js';

const charType = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    const shoot = document.getElementById("shoot");
    shoot.addEventListener("click", tirer);

    const joystick = document.getElementById("joystick");
    const joystickOrientation = joystick.getBoundingClientRect();
    let joystickX = joystickOrientation.left;
    let joystickY = joystickOrientation.top;

});

function tirer(){
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(
            {direction : {x : joystickX, y: joystickY}, 
            charcterType : charType}));
    } else {
        console.log('WebSocket is not open.');
    }
}
