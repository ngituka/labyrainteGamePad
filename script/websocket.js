const wssUrl = "wss://127.0.0.1:9082";
export let socket = null;

function initializeWebSocketListeners(ws) {
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
    websocket = new WebSocket(wsUri);
    initializeWebSocketListeners(websocket);
  }
});

console.log("OPENING");
websocket = new WebSocket(wsUri);
initializeWebSocketListeners(websocket);
