const players = {};
const usernames = {};
const choices = {};

function resetPlayerData() {
  for (const key in choices) delete choices[key];
}

function getPlayerList() {
  return Object.entries(players).map(([id, player]) => ({
    id,
    username: player.username,
    score: player.score,
  }));
}

module.exports = {
  players,
  usernames,
  choices,
  resetPlayerData,
  getPlayerList,
};
