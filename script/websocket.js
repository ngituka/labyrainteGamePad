export var url = ""
const wssUrl = "wss://" + url + ":9082/";
export let ws = null;
let counter = 0;
let pingInterval;

function initializeWebSocketListeners() {
  ws.addEventListener("open", () => {
    console.log("CONNECTED");

    ws.send("hello");

    pingInterval = setInterval(() => {
      console.log(`SENT: ping: ${counter}`);
      ws.send("ping");
    }, 1000);
  });

  ws.addEventListener("close", () => {
    console.log("DISCONNECTED");
    clearInterval(pingInterval);
  });

  ws.addEventListener("message", (e) => {
    console.log(`RECEIVED: ${e.data}: ${counter}`);
    counter++;
  });

  ws.addEventListener("error", (e) => {
    console.log("ERROR", e);
  });
}

export function connect(){
  console.log("OPENING");
  ws = new WebSocket(wssUrl);
  initializeWebSocketListeners();
}
