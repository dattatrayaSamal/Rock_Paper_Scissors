## Builda# 🪨📄✂️ Rock Paper Scissors – Frontend (React)

This is the **frontend client** for the real-time Rock Paper Scissors multiplayer game built with **React** and **Socket.IO**. It connects to a backend server to allow two players to compete in a fast-paced match.

---

## 🚀 Features

- Real-time two-player gameplay
- Socket.IO connection to backend
- Sound effects for clicks, wins, losses, and draws
- Scoreboard and game status updates
- Auto-reset after 5 rounds
- Victory overlay animation

---

## 🧰 Tech Stack

- React
- Socket.IO Client
- HTML5 Audio mp3
- Basic CSS / Inline styling

---

## 📁 Project Structure

```
frontend/
│
├── public/
│ └── Sounds/
│ ├── click.mp3
│ ├── win.mp3
│ ├── lose.mp3
│ └── draw.mp3
│
├── src/
| ├── components
│ |   └── Client.jsx # Main game component
  ├── App.jsx 
│ └── main.jsx
│
├── index.html
├── package.json
└── README.md

```


---

## 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/rock-paper-scissors-frontend.git
cd rock-paper-scissors-frontend

```
## Install Dependencies

```
npm install
```
## Run the development server

```
npm run dev 

```