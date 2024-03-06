import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const resetButtonRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      setIsRunning((prevState) => !prevState);
      setIsInitial(false);
      resetButtonRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="App">
      <div className="timer-container">
        <div className="timer-display">{formatTime(time)}</div>
        <div className="spacebar-prompt-container">
          <div
            className={`spacebar-prompt ${isRunning ? 'stop' : 'start'} ${
              isInitial ? 'initial' : ''
            }`}
          >
            {isInitial
              ? 'Press Spacebar to Start'
              : isRunning
              ? 'Stop'
              : 'Start'}
          </div>
        </div>
        <button ref={resetButtonRef} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;