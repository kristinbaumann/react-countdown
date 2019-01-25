import React, { Component } from 'react';
import Countdown from './Countdown.js';
import logo from './logo.svg';
import github from './github.png';

class App extends Component {
  render() {
    const currentDate = new Date();
    const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Countdown</h2>

          <a href="https://github.com/kristinbaumann/react-countdown" target="_blank">
            <img src={github} alt="github" className="githubIcon" />
            <span>View on Github</span>
          </a>
        </div>

        <h3 className="title">Christmas Eve is coming soon (Midnight of 23rd to 24th Dec, UTC time):</h3>
        <Countdown date={new Date(`${year}-12-24T00:00:00`)} />

        <h3 className="title">Countdown for 2 hours and 13 seconds, but showing just minutes and seconds:</h3>
        <Countdown hours={2} seconds={13} timeComponentsToShow={['minutes', 'seconds']} />
      </div>
    );
  }
}

export default App;
