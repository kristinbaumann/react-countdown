import React, { Component } from 'react';
import Countdown from './Countdown.js';
import logo from './logo.svg';

class App extends Component {
  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Countdown</h2>
        </div>

        <h3 className="title">Christmas Eve is coming soon (Midnight of 23rd to 24th Dec, UTC time):</h3>
        <Countdown date={`${year}-12-24T00:00:00`} />
      </div>
    );
  }
}

export default App;
