# Rock_Paper_Scissors 🎮

A real-time, multiplayer **Rock-Paper-Scissors** game built using **Node.js**, **Socket.IO**, and **Vanilla JavaScript**. This is not your average RPS game—it's got real-time syncing, sound effects, winner animations, and automatic round resets for a truly interactive experience.

---
### 🌐 Live Demo

Click here to play: 👉 [Rock Paper Scissors Game](https://extraordinary-belekoy-d0720b.netlify.app/)

## How to Play
Step-1 : Open two separate browser windows (to simulate two individual players).

Step-2 : Enter your username in each window and click Join Game.

Step-3 : Once both players have joined, you can choose Rock, Paper, or Scissors by clicking the corresponding button.

After both players make their choices, the round result will be displayed.

The game automatically resets after 5 rounds — then you can start a new match.



## ✨ Features

- 🎮 Real-time multiplayer using websockets
- 🔐 Username-based login
- 🎵 Sound effects (click, win, lose, draw)
- 🎉 Winner animation overlay
- 🔁 Automatic game reset after 5 rounds
- 🎨 Smooth and modern UI with responsive design
- 💻 Runs locally, no database required

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO

---

## 📂 Project Structure

```
Rock_Paper_Scissors/
├── Backend/
│ ├──  config
| |   └── socketConfig.js 
| ├── data
| |   └── playerStore.js 
| ├── utils
| |   └── gameUtils.js 
│ ├── server.js
| ├── package.json
│ ├── package-lock.json
│ └── .gitignore
|
├── Frontend/
│ ├── Client.html
│ ├── Client.js
│ ├── style.css
│ └── sounds/
│   ├── click.mp3
│   ├── win.mp3
│   ├── lose.mp3
│   └── draw.mp3
├── package.json
├── package-lock.json
└── README.md
```


---

## 🚀 How to Run Locally

### 1. Clone the Repository

```
git clone https://github.com/yourusername/Rock_Paper_Scissors.git
cd Rock_Paper_Scissors

```

## Install Dependencies 

```
npm install

```
## start server
```
npm run start

```

## Open in browser

```
http://localhost:8000

```
## Backend Run on : 
```
https://rock-paper-scissors-wt5w.onrender.com
``` 
