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
        console.log(`RECEIVED:`);
        try {
            const data = JSON.parse(e.data);
            if (data.hp !== undefined) {
                updateHealthBar(data.hp);
            }
            if (data.dead === true) {
                showDeathScreen();
            }
        } catch (err) {
            // Message non-JSON, ignorer
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
    // Éviter de créer plusieurs overlays
    if (document.getElementById("deathOverlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "deathOverlay";
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(80, 0, 0, 0.85);
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        z-index: 999;
    `;
    overlay.innerHTML = `
        <div style="font-size: clamp(2rem, 8vw, 5rem); color: #ff3333; text-shadow: 0 0 20px #ff0000; font-family: pressStart;">☠ MORT ☠</div>
        <div style="font-size: clamp(0.6rem, 2.5vw, 1.2rem); color: #ccc; margin-top: 2vh; font-family: pressStart;">Tu as été éliminé</div>
    `;
    document.body.appendChild(overlay);
}