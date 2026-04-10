const socket = new WebSocket("ws://172.18.76.198");

document.addEventListener("DOMContentLoaded", (event)=>{
    let button = document.getElementById("join");
    let input = document.getElementById("code");
    button.addEventListener("click", ()=>joinGame(input.value));
});

function joinGame(code){
    if(code.length < 8){
        alert("remplis le code wsh tu veux pas joueer");
    }
    else{
        code = code.toUpperCase();
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(code);
        } else {
            console.log('WebSocket is not open.');
        }
        window.location.replace("index.html")
    }
    
}