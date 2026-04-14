var url = window.location.host;
const ip = url.split(":")[0];

const wsUrl = "ws://" + ip + ":9082/";
export let ws = null;

startConnection();

function initializeWebSocketListeners() {
    ws.addEventListener("open", () => {
        console.log("CONNECTED");

        ws.send("hello");

    });

    ws.addEventListener("close", () => {
        console.log("DISCONNECTED");
    });

    ws.addEventListener("message", (e) => {
        console.log(`RECEIVED:`);
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