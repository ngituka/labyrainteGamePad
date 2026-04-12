import {url} from './websocket.js';
import {connect} from './websocket.js';

document.addEventListener("DOMContentLoaded", (event)=>{
    let button = document.getElementById("join");
    let input = document.getElementById("code");
    button.addEventListener("click", ()=>joinGame(input.value));
});

function joinGame(){
    const error = document.querySelector("#error");
    const code = document.querySelector("#codeInput").innerText;
    if(code.length !== 8){
        error.style.visibility = "visible";
    }
    else{
        code = code.toUpperCase();
        var url = ""
        for(let i = 0; i < code.length; i+=2){
            const ipPart = code[i] + code[i+1];
            ip += '${Number("0x" + code)}.'
        }
        url.slice(0,-1);
        try{
            connect()
        }
        catch(error){
            alert("La connection a échoué, veuillez vérifier le code et que vous etes connecter au meme réseau que le serveur.")
            return
        }
        error.style.visibility = "hidden";
        window.location.replace("manette.html")
    }
    
}
