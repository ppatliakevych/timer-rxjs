import React, { useState } from 'react';
import './App.css';
import { Timer } from './components/timer'
import { Speed } from './components/speed.enum';
import { SpeedConfigurator } from './components/SpeedConfigurator';

function App() {
  const [time, setTime] = useState<number>(0);
  const [speed, setSpeed] = useState<Speed>(1000);


  return (
    <div className="App-header">
      <div className="timer-view">
        <h1>Timer</h1>
        <p>{time}</p>
      </div>
      <div className="timer-component">
      <Timer time={time} onSetTime={setTime} speed={speed} />
      <SpeedConfigurator setSpeed={setSpeed} />
      </div>
    </div>
  );
}

export default App;
