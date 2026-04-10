const socket = new WebSocket("wss://172.18.76.198");

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
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(code);
        } else {
            console.log('WebSocket is not open.');
        }
        error.style.visibility = "hidden";
        window.location.replace("manette.html")
    }
    
}
