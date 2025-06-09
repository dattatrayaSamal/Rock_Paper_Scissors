import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Sounds
const clickSound = new Audio('/Sounds/click.mp3');
const winSound = new Audio('/Sounds/win.mp3');
const loseSound = new Audio('/Sounds/lose.mp3');
const drawSound = new Audio('/Sounds/draw.mp3');

const socket = io('https://rock-paper-scissors-wt5w.onrender.com');

const Client = () => {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [status, setStatus] = useState('');
  const [resultData, setResultData] = useState(null);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [roundCount, setRoundCount] = useState(0);

  useEffect(() => {
    socket.on('startGame', () => {
      setStatus('Game started!');
    });

    socket.on('roundResult', (data) => {
      setResultData(data);
      setScoreBoard(data.scores);
      setStatus('');
      
      const resultColor = {
        win: 'lightgreen',
        lose: '#ff7b7b',
        draw: 'lightgray'
      };

      document.getElementById('result').style.backgroundColor = resultColor[data.result];

      if (data.result === 'win') {
        winSound.play();
        setOverlayVisible(true);
        setTimeout(() => setOverlayVisible(false), 1500);
      } else if (data.result === 'lose') {
        loseSound.play();
      } else {
        drawSound.play();
      }

      setRoundCount(prev => {
        const next = prev + 1;
        if (next >= 5) {
          setTimeout(() => {
            alert('5 rounds completed. Game will reset.');
            window.location.reload();
          }, 2000);
        }
        return next;
      });
    });

    socket.on('playerLeft', () => {
      alert('Opponent left the game. The game will reset.');
      window.location.reload();
    });

    return () => {
      socket.off('startGame');
      socket.off('roundResult');
      socket.off('playerLeft');
    };
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit('setUsername', username);
      setJoined(true);
      setStatus('Waiting for opponent...');
    }
  };

  const handleChoice = (choice) => {
    clickSound.play();
    socket.emit('playerChoice', choice);
    setStatus("Waiting for opponent's move...");
  };

  return (
    <div className="client-container" style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Rock Paper Scissors</h1>

      {!joined ? (
        <div id="login">
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join Game</button>
        </div>
      ) : (
        <div id="game">
          <p id="status">{status}</p>
          <div>
            <button className="choiceBtn" onClick={() => handleChoice('rock')}>🪨 Rock</button>
            <button className="choiceBtn" onClick={() => handleChoice('paper')}>📄 Paper</button>
            <button className="choiceBtn" onClick={() => handleChoice('scissors')}>✂️ Scissors</button>
          </div>

          {resultData && (
            <div id="result" style={{ padding: '1em', marginTop: '1em' }}>
              <p>You chose: <strong>{resultData.yourChoice}</strong></p>
              <p>{resultData.opponent} chose: <strong>{resultData.opponentChoice}</strong></p>
              <p>Result: <strong>{resultData.result.toUpperCase()}</strong></p>
            </div>
          )}

          <div id="scoreBoard" style={{ marginTop: '1em' }}>
            <ul>
              {scoreBoard.map((player, index) => (
                <li key={index}>{player.username}: {player.score}</li>
              ))}
            </ul>
          </div>

          {overlayVisible && (
            <div
              id="overlay"
              style={{
                // display: 'block',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontSize: '2rem',
                fontWeight: 'bold',
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999
              }}
            >
              🎉 YOU WIN! 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Client;
