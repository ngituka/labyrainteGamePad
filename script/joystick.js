import {ws} from './websocket.js';
let gauche;
let haut;
let maxGauche, maxHaut;
let minGauche, minHaut;
const decalage = 40;
let baseGauche, baseHaut;
let joystick;
let lastX;
let lastY;


//TODO : corriger retour centre sur maintien joystick
//TODO : tailles des boutons
//TODO : gérer diagonales

document.addEventListener("DOMContentLoaded", (event) => {
    joystick = document.getElementById("joystick");
    gauche = joystick.offsetLeft;
    haut = joystick.offsetTop;
    maxGauche = gauche + decalage;
    maxHaut = haut + decalage;
    minGauche = gauche - decalage;
    minHaut = haut - decalage;
    baseGauche = joystick.offsetLeft;
    baseHaut = joystick.offsetTop;
    
    joystick.addEventListener("touchstart", (e) => {
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
    });
    joystick.addEventListener("touchmove", (e) => {
        test(e, joystick);
    });
    joystick.addEventListener("touchend", resetJoystick);
});

let lastPos = (0,0)

function test(e, joystick) {
    if(ws.readyState !== WebSocket.OPEN)
        return
    let movementX = e.touches[0].clientX - lastX;
    let movementY = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;

    if (movementX > 0) {
        gauche = Math.min(maxGauche, gauche + movementX);
    } else {
        gauche = Math.max(minGauche, gauche + movementX);
    }
    if (movementY > 0) {
        haut = Math.min(maxHaut, haut + movementY);
    } else {
        haut = Math.max(minHaut, haut + movementY);
    }

    joystick.style.left = gauche + "px";
    joystick.style.top = haut + "px";

    // Conversion : base (0,0), X+ vers droite, Y+ vers haut
    const x = gauche - baseGauche;
    const y = haut - baseHaut;
    
    if((x, y) === lastPos)
        return
    ws.send(JSON.stringify({ x, y }));
}

function resetJoystick(e) {
    if(ws.readyState !== WebSocket.OPEN)
        return
    gauche = baseGauche;
    haut = baseHaut;
    joystick.style.left = gauche + "px";
    joystick.style.top = haut + "px";

    ws.send(JSON.stringify({ x: 0, y: 0 })); // Envoie (0,0) au relâchement
}