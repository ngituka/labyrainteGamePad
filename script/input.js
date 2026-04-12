import {ws} from './websocket.js';

document.addEventListener("DOMContentLoaded", (event)=>{
    let button = document.getElementById("join");
    let input = document.getElementById("code");
    button.addEventListener("click", ()=>joinGame(input.value));
});

function joinGame(code){
    const error = document.querySelector("#error");
    if(code.length < 8){
        error.style.visibility = "visible";
    }
    else{
        code = code.toUpperCase();
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(code);
        } else {
            console.log('WebSocket is not open.');
        }
        error.style.visibility = "hidden";
        window.location.replace("manette.html")
    }
    
}
