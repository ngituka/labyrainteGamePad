import {url} from './websocket.js';
import {connect} from './websocket.js';

document.addEventListener("DOMContentLoaded", (event)=>{
    let button = document.getElementById("join");
    let input = document.getElementById("code");
    button.addEventListener("click", ()=>joinGame(input.value));
});

function joinGame(code){
    const error = document.querySelector("#error");
    if(code.length !== 8){
        error.style.visibility = "visible";
    }
    else{
        code = code.toUpperCase();
        var url = ""
        for(let i = 0; i < code.length; i+=2){
            const urlPart = code[i] + code[i+1];
            url += '${Number("0x" + urlPart)}.'
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
