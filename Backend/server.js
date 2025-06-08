const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketHandler = require("./config/socketConfig");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const path = require("path");

app.use(express.static(path.join(__dirname, "../Frontend")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/Client.html"));
});


socketHandler(io);

server.listen(8000, () => {
  console.log(`Server is running on port: 8000`);
});
