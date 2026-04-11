
import {socket} from './websocket.js';

const charType = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    const shoot = document.getElementById("shoot");
    shoot.addEventListener("click", () => {
        tirer(joystickX, joystickY);
    });
    const joystick = document.getElementById("joystick");
    const joystickOrientation = joystick.getBoundingClientRect();
    let joystickX = joystickOrientation.left;
    let joystickY = joystickOrientation.top;

});

function tirer(x, y){
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            direction: { x: x, y: y },
            charcterType: charType
        }));
    }
}
