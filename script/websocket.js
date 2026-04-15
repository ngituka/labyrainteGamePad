var url = window.location.host;
const ip = url.split(":")[0];

const wsUrl = "ws://" + ip + ":9082/";
export let ws = null;

startConnection();

function initializeWebSocketListeners() {
    ws.addEventListener("open", () => {
        console.log("CONNECTED");

    });

    ws.addEventListener("close", () => {
        console.log("DISCONNECTED");
    });

    ws.addEventListener("message", (e) => {
        let message = e.data;
        
        // Si le message est un ArrayBuffer, le convertir en string
        if (message instanceof ArrayBuffer) {
            message = new TextDecoder("utf-8").decode(message);
        }
        
        console.log("RECEIVED:", message);
        
        try {
            const data = JSON.parse(message);
            if (data.hp !== undefined) {
                updateHealthBar(data.hp);
            }
            if (data.dead === true) {
                showDeathScreen();
            }
            if (data.win === true) {
                showWinScreen();
            }
        } catch (err) {
            console.log("Parse error:", err);
        }
    });

    ws.addEventListener("error", (e) => {
        console.log("ERROR", e);
    });
}

function startConnection(){
    console.log("OPENING");
    ws = new WebSocket(wsUrl); 
    ws.binaryType = "arraybuffer";
    initializeWebSocketListeners();
}

function updateHealthBar(pourcentage) {
    const fill = document.getElementById("pvBarFill");
    const text = document.getElementById("pvBarText");
    if (!fill || !text) return;

    const hp = Math.max(0, Math.min(100, Math.round(pourcentage)));
    fill.style.width = hp + "%";
    text.textContent = hp + "%";

    // Couleur dynamique : vert > jaune > rouge
    if (hp > 60) {
        fill.style.background = "linear-gradient(90deg, #00cc33, #44ff00)";
    } else if (hp > 30) {
        fill.style.background = "linear-gradient(90deg, #ffaa00, #ffcc00)";
    } else {
        fill.style.background = "linear-gradient(90deg, #cc0000, #ff3300)";
    }
}

function showDeathScreen() {
    if (document.getElementById("deathOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "deathOverlay";
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        z-index: 999;
    `;
    overlay.innerHTML = `
        <div style="font-size: clamp(2rem, 8vw, 5rem); color: #ff3333; text-shadow: 0 0 30px #ff0000, 0 0 60px #cc0000; font-family: 'pressStart', monospace; letter-spacing: 0.3em;">GAME OVER</div>
    `;
    document.body.appendChild(overlay);
}

function showWinScreen() {
    if (document.getElementById("winOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "winOverlay";
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        z-index: 999;
    `;
    overlay.innerHTML = `
        <div style="font-size: clamp(2rem, 8vw, 5rem); color: #ffd700; text-shadow: 0 0 30px #ffcc00, 0 0 60px #ffaa00; font-family: 'pressStart', monospace; letter-spacing: 0.3em;">VICTOIRE</div>
    `;
    document.body.appendChild(overlay);
}