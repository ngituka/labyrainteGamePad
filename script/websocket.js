const wssUrl = "wss://127.0.0.1:9082";
export let ws = null;
let counter = 0;
let pingInterval;

function initializeWebSocketListeners() {
  ws.addEventListener("open", () => {
    console.log("CONNECTED");
    pingInterval = setInterval(() => {
      console.log(`SENT: ping: ${counter}`);
      ws.send("ping");
    }, 1000);
  });

  ws.addEventListener("close", () => {
    console.log("DISCONNECTED");
    clearInterval(pingInterval);
  });

  socket.onopen = () => {
  console.log("Connecté");
  socket.send("hello");
};

  ws.addEventListener("message", (e) => {
    console.log(`RECEIVED: ${e.data}: ${counter}`);
    counter++;
  });

  ws.addEventListener("error", (e) => {
    console.log(`ERROR`);
  });
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    ws = new WebSocket(wssUrl);
    initializeWebSocketListeners();
  }
});

console.log("OPENING");
ws = new WebSocket(wssUrl);
initializeWebSocketListeners(ws);
