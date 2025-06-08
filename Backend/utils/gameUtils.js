function getWinner(c1, c2) { // c1 and c2 are two individual user
  if (c1 === c2) return ["draw", "draw"];
  if (
    (c1 === "rock" && c2 === "scissors") ||
    (c1 === "paper" && c2 === "rock") ||
    (c1 === "scissors" && c2 === "paper")
  ) { return ["win", "lose"]; }
  return ["lose", "win"];
}

module.exports = { getWinner };
