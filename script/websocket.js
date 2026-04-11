export const socket = new WebSocket("wss://127.0.0.1:9082");

socket.addEventListener("open", (event) => {
  socket.send("Coucou le serveur !");
});
