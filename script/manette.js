import {ws} from './websocket.js';

document.addEventListener("DOMContentLoaded", (event) => {
    const shoot = document.getElementById("shoot");
    shoot.addEventListener("click", () => {
        tirer();
    });

    ws.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            if (data.type === "team_color") {
                document.getElementById("pv-text").style.color = data.color;
            }
        } catch (e) {
            console.log("❌ JSON Parse Error:", e);
        }
    };
});

function tirer(){
    if (ws.readyState !== WebSocket.OPEN) 
        return
    console.log("piou piou")
    ws.send(JSON.stringify({
        shoot: true
    }))//shoot
}
