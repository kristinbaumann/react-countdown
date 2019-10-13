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

    this.addLeadingZeros = this.addLeadingZeros.bind(this);
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date
        ? this.props.useFlipView
          ? this.updateFlippers(date)
          : this.setState(date)
        : this.expired();
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
      isExpired,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle
    } = this.state;

    return (
      <div className="Countdown">
        {isExpired ? (
          <ExpiryView expiryMsg={this.props.expiryMsg} />
        ) : this.props.useFlipView ? (
          <FlipView
            countDown={countDown}
            shuffle={{
              days: daysShuffle,
              hours: hoursShuffle,
              min: minutesShuffle,
              sec: secondsShuffle
            }}
            addLeadingZeros={this.addLeadingZeros}
          />
        ) : (
          <DefaultPlainView
            countDown={countDown}
            addLeadingZeros={this.addLeadingZeros}
          />
        )}
      </div>
    );
  }
}

function ExpiryView(props) {
  return <h1 style={{ color: "orange" }}>{props.expiryMsg}</h1>;
}

function DefaultPlainView(props) {
  const { countDown, addLeadingZeros } = props;

  return (
    <div>
      <span className="Countdown-col">
        <span className="Countdown-col-element">
          <strong>{addLeadingZeros(countDown.days)}</strong>
          <span>{countDown.days === 1 ? "Day" : "Days"}</span>
        </span>
      </span>

      <span className="Countdown-col">
        <span className="Countdown-col-element">
          <strong>{addLeadingZeros(countDown.hours)}</strong>
          <span>Hours</span>
        </span>
      </span>

      <span className="Countdown-col">
        <span className="Countdown-col-element">
          <strong>{addLeadingZeros(countDown.min)}</strong>
          <span>Min</span>
        </span>
      </span>

      <span className="Countdown-col">
        <span className="Countdown-col-element">
          <strong>{addLeadingZeros(countDown.sec)}</strong>
          <span>Sec</span>
        </span>
      </span>
    </div>
  );
}

function FlipView(props) {
  const { countDown, addLeadingZeros, shuffle } = props;

  return (
    <div className={"flipClock"}>
      <FlipUnitContainer
        unit={countDown.days === 1 ? "Day" : "Days"}
        digit={addLeadingZeros(countDown.days)}
        currentDigit={addLeadingZeros(countDown.days)}
        previousDigit={addLeadingZeros(countDown.days + 1)}
        shuffle={shuffle.days}
      />
      <FlipUnitContainer
        unit={"Hours"}
        digit={addLeadingZeros(countDown.hours)}
        currentDigit={addLeadingZeros(countDown.hours)}
        previousDigit={addLeadingZeros(countDown.hours + 1)}
        shuffle={shuffle.hours}
      />
      <FlipUnitContainer
        unit={"Min"}
        digit={addLeadingZeros(countDown.min)}
        currentDigit={addLeadingZeros(countDown.min)}
        previousDigit={addLeadingZeros(countDown.min + 1)}
        shuffle={shuffle.min}
      />
      <FlipUnitContainer
        unit={"Sec"}
        digit={addLeadingZeros(countDown.sec)}
        currentDigit={addLeadingZeros(countDown.sec)}
        previousDigit={addLeadingZeros(countDown.sec + 1)}
        shuffle={shuffle.sec}
      />
    </div>
  );
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;
