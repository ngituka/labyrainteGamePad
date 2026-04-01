let gauche;
let haut;

let maxGauche, maxHaut;
let minGauche, minHaut;
const decalage = 40;
let baseGauche, baseHaut;

let joystick;
let lastX;
let lastY;

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

function test(e, joystick) {
    let movementX = e.touches[0].clientX - lastX;
    let movementY = e.touches[0].clientY - lastY;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;

    console.log("left = " + joystick.style.left + ", top = " + joystick.style.top);
    if(movementX > 0){
        gauche = Math.min(maxGauche, gauche + movementX);
    }
    else{
        gauche = Math.max(minGauche, gauche + movementX);
    }
    if(movementY > 0){
        haut = Math.min(maxHaut, haut + movementY);
    }
    else{
        haut = Math.max(minHaut, haut + movementY);
    }
    haut = Math.min(maxHaut, haut + movementY);
    joystick.style.left = gauche + "px"
    joystick.style.top = haut + "px"
    console.log("gauche = " + gauche + ", haut = " + haut);
    console.log("left = " + joystick.style.left + ", top = " + joystick.style.top);
}

function resetJoystick(e){
    gauche = baseGauche;
    haut = baseHaut;
    joystick.style.left = gauche + "px"
    joystick.style.top = haut + "px"
}