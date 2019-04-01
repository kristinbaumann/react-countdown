import React, { Component } from "react";
import PropTypes from "prop-types";
import FlipUnitContainer from "./FlipUnitContainer.js";

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

      daysShuffle: true,
      hoursShuffle: true,
      minutesShuffle: true,
      secondsShuffle: true,
      isExpired: false
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.updateFlippers(date) : this.expired();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  updateFlippers(date) {
    // set time units
    const days = date.days;
    const hours = date.hours;
    const min = date.min;
    const sec = date.sec;

    // on hour chanage, update hours and shuffle state
    if (days !== this.state.days) {
      const daysShuffle = !this.state.daysShuffle;
      this.setState({
        days,
        daysShuffle
      });
    }
    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle
      });
    }
    // on minute chanage, update minutes and shuffle state
    if (min !== this.state.min) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        min,
        minutesShuffle
      });
    }
    // on second chanage, update seconds and shuffle state
    if (sec !== this.state.sec) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        sec,
        secondsShuffle
      });
    }
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
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    // this.updateFlippers(timeLeft);

    return timeLeft;
  }

  expired() {
    this.setState({ isExpired: true });
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    const {
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
      isExpired
    } = this.state;

    return (
      <div className="Countdown">
        {isExpired ? (
          <h1 style={{ color: "orange" }}>Hackathon Day !!</h1>
        ) : (
          <div>
            <div className={"flipClock"}>
              <FlipUnitContainer
                unit={countDown.days === 1 ? "Day" : "Days"}
                digit={this.addLeadingZeros(countDown.days)}
                currentDigit={this.addLeadingZeros(countDown.days)}
                previousDigit={this.addLeadingZeros(countDown.days + 1)}
                shuffle={daysShuffle}
              />
              <FlipUnitContainer
                unit={"Hours"}
                digit={this.addLeadingZeros(countDown.hours)}
                currentDigit={this.addLeadingZeros(countDown.hours)}
                previousDigit={this.addLeadingZeros(countDown.hours + 1)}
                shuffle={hoursShuffle}
              />
              <FlipUnitContainer
                unit={"Min"}
                digit={this.addLeadingZeros(countDown.min)}
                currentDigit={this.addLeadingZeros(countDown.min)}
                previousDigit={this.addLeadingZeros(countDown.min + 1)}
                shuffle={minutesShuffle}
              />
              <FlipUnitContainer
                unit={"Sec"}
                digit={this.addLeadingZeros(countDown.sec)}
                currentDigit={this.addLeadingZeros(countDown.sec)}
                previousDigit={this.addLeadingZeros(countDown.sec + 1)}
                shuffle={secondsShuffle}
              />
            </div>
          </div>
        )}
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
