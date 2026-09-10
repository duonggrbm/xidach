const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  let deck = [];
  suits.forEach(s => values.forEach(v => deck.push({value: v, suit: s})));
  return deck;
}

function cardValue(card) {
  if (["J","Q","K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
}

function handValue(hand) {
  let value = hand.reduce((sum, c) => sum + cardValue(c), 0);
  let aces = hand.filter(c => c.value === "A").length;
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  return value;
}

let players = {};
let dealerHand = [];
let deck = [];

io.on("connection", (socket) => {
  console.log("Người chơi kết nối:", socket.id);
  players[socket.id] = [];

  socket.on("startGame", () => {
    deck = createDeck().sort(() => Math.random() - 0.5);
    dealerHand = [deck.pop(), deck.pop()];
    players[socket.id] = [deck.pop(), deck.pop()];
    io.to(socket.id).emit("gameState", {
      playerHand: players[socket.id],
      dealerHand: [dealerHand[0], {value:"??", suit:"??"}]
    });
  });

  socket.on("hit", () => {
    players[socket.id].push(deck.pop());
    io.to(socket.id).emit("gameState", {
      playerHand: players[socket.id],
      dealerHand: [dealerHand[0], {value:"??", suit:"??"}]
    });
  });

  socket.on("stand", () => {
    while (handValue(dealerHand) < 17) {
      dealerHand.push(deck.pop());
    }
    let playerScore = handValue(players[socket.id]);
    let dealerScore = handValue(dealerHand);
    let result = "";
    if (playerScore > 21) result = "Bạn thua!";
    else if (dealerScore > 21 || playerScore > dealerScore) result = "Bạn thắng!";
    else if (playerScore === dealerScore) result = "Hòa!";
    else result = "Dealer thắng!";
    io.to(socket.id).emit("finalResult", {
      playerHand: players[socket.id],
      dealerHand,
      result
    });
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    console.log("Người chơi rời:", socket.id);
  });
});

server.listen(3000, () => console.log("Server chạy tại http://localhost:3000"));
