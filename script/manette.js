import {ws} from './websocket.js';

document.addEventListener("DOMContentLoaded", (event) => {
    const shoot = document.getElementById("shoot");
    shoot.addEventListener("click", () => {
        tirer();
    });
});

function tirer(){
    if (ws.readyState === WebSocket.OPEN) {
        console.log("piou piou")
        ws.send(JSON.stringify({
            shoot: true
          }))//shoot
    }
}
