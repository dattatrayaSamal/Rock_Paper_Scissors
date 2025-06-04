const { getWinner } = require("../utils/gameUtils");
const {
  players,
  usernames,
  choices,
  resetPlayerData,
  getPlayerList,
} = require("../data/playerStore");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("setUsername", (username) => {
      players[socket.id] = { username, score: 0 };
      usernames[socket.id] = username;
      io.emit("playersUpdate", getPlayerList());
      if (Object.keys(players).length === 2) {
        io.emit("startGame", getPlayerList());
      }
    });

    socket.on("playerChoice", (choice) => {
      choices[socket.id] = choice;
      if (Object.keys(choices).length === 2) {
        const [id1, id2] = Object.keys(choices);
        const result = getWinner(choices[id1], choices[id2]);
        if (result[0] === "win") players[id1].score += 1;
        if (result[1] === "win") players[id2].score += 1;

        io.to(id1).emit("roundResult", {
          yourChoice: choices[id1],
          opponentChoice: choices[id2],
          result: result[0],
          opponent: players[id2].username,
          scores: getPlayerList(),
        });

        io.to(id2).emit("roundResult", {
          yourChoice: choices[id2],
          opponentChoice: choices[id1],
          result: result[1],
          opponent: players[id1].username,
          scores: getPlayerList(),
        });

        resetPlayerData();
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete players[socket.id];
      delete usernames[socket.id];
      delete choices[socket.id];
      io.emit("playerLeft");
      io.emit("playersUpdate", getPlayerList());
    });
  });
};
