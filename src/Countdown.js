import React, { Component } from 'react';
import PropTypes from 'prop-types'

/**
 * Note : 
 * If you're using react v 15.4 or less
 * You can directly import PropTypes from react instead. 
 * Refer to this : https://reactjs.org/warnings/dont-call-proptypes.html
 */

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      isSet: false,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState({ ...date, isSet: true }) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    let $isDay = this.addLeadingZeros(countDown.days);
    let $isHours = this.addLeadingZeros(countDown.hours);
    let $isMin = this.addLeadingZeros(countDown.min);
    let $isSec = this.addLeadingZeros(countDown.sec);
    console.log('date', this.props.date);
    console.log('isSet', this.state.isSet);
    if (
      $isDay === '00' &&
      $isHours === '00' &&
      $isMin === '00' &&
      $isSec <= '00') {
      if (!this.state.isSet) {
        $isDay = <div>--:</div>;
        $isHours = <div>--:</div>;
        $isMin = <div>--:</div>;
        $isSec = <div>--</div>;
      } else {
        $isDay = <div className="none" />;
        $isHours = <div className="timeout">timeout</div>;
        $isMin = <div className="none" />;
        $isSec = <div className="none" />;
      }
    } else {
      if (
        $isDay === '00' &&
        $isHours === '00' &&
        $isMin === '00' &&
        $isSec <= '01'
      ) {
        $isDay = <div className="None"/>;
        $isHours = <div className="timeout">Timeout</div>;
        $isMin = <div className="None" />;
        $isSec = <div className="None" />;
      }
    }
    return (
      <div className="Countdown">
        <span className="Countdown-col">
          <span className="Countdown-col-element">
            {$isDay}
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
          {$isHours}
          </span>
        </span>


        <span className="Countdown-col">
          <span className="Countdown-col-element">
          {$isMin}
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
          {$isSec}
          </span>
        </span>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;
