const socket = io();

document.getElementById("startBtn").onclick = () => socket.emit("startGame");
document.getElementById("hitBtn").onclick = () => socket.emit("hit");
document.getElementById("standBtn").onclick = () => socket.emit("stand");

socket.on("gameState", (state) => {
  document.getElementById("game").innerHTML = `
    <p>Người chơi: ${JSON.stringify(state.playerHand)}</p>
    <p>Dealer: ${JSON.stringify(state.dealerHand)}</p>
  `;
});

socket.on("finalResult", (state) => {
  document.getElementById("game").innerHTML = `
    <p>Người chơi: ${JSON.stringify(state.playerHand)}</p>
    <p>Dealer: ${JSON.stringify(state.dealerHand)}</p>
    <h2>${state.result}</h2>
  `;
});
