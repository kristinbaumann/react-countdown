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
 			followDate: true,
 			timeToShow: {
 		      days: 0,
 		      hours: 0,
 		      min: 0,
 		      sec: 0,
 			},
     }
   }

   componentDidMount() {
 		this.setState({ days: this.props.days,
 		 								hours: this.props.hours,
 										min: this.props.minutes,
 										sec: this.props.seconds });
 		if (this.props.days > 0
 				|| this.props.hours > 0
 				|| this.props.minutes > 0
 				|| this.props.seconds > 0) {
 			this.setState({ followDate: false });
 		}

 		// update every second
     this.interval = setInterval(() => {
       const timeLeft = this.state.followDate ? this.calculateDateCountdown(this.props.date) : this.diminishSecondToCountdown(this.state);
 			if (timeLeft) {
 				const visualTimeLeft = this.adaptTimeToChosenComponents(timeLeft);
 				this.setState({ ...timeLeft, timeToShow: visualTimeLeft });
 			} else {
 				this.stop();
 				this.props.finishCallback();
 			}
     }, 1000);
   }

   componentWillUnmount() {
     this.stop();
   }

 	adaptTimeToChosenComponents(time) {
 		let adaptedTime = { ...time }
 		if (!this.props.timeComponentsToShow.includes('days')) {
 			adaptedTime.hours += adaptedTime.days * 24;
 			adaptedTime.days = 0;
 		}
 		if (!this.props.timeComponentsToShow.includes('hours')) {
 			adaptedTime.min += adaptedTime.hours * 60;
 			adaptedTime.hours = 0;
 		}
 		if (!this.props.timeComponentsToShow.includes('minutes')) {
 			adaptedTime.sec += adaptedTime.min * 60;
 			adaptedTime.min = 0;
 		}
 		return adaptedTime
 	}

 	diminishSecondToCountdown(state) {
 		if (state.days === 0 && state.hours === 0 && state.min === 0 && state.sec === 0) {
 			return null;
 		}

 		const timeLeft = {
       days: state.days,
       hours: state.hours,
       min: state.min,
       sec: state.sec,
 		};
 		timeLeft.sec = timeLeft.sec - 1;
 		if (timeLeft.sec === -1) {
 			timeLeft.sec = 59;
 			timeLeft.min = timeLeft.min - 1;
 		}
 		if (timeLeft.min === -1) {
 			timeLeft.min = 59;
 			timeLeft.hours = timeLeft.hours - 1;
 		}
 		if (timeLeft.hours === -1) {
 			timeLeft.hours = 23;
 			timeLeft.days = timeLeft.days - 1;
 		}
 		return timeLeft;
 	}

   calculateDateCountdown(endDate) {
     let diff = (Date.parse(endDate) - Date.parse(new Date())) / 1000;

     // clear countdown when date is reached
     if (diff < 0) return null;

     const timeLeft = {
       years: 0,
       days: 0,
       hours: 0,
       min: 0,
       sec: 0,
       millisec: 0,
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
     const countDown = this.state.timeToShow;
 		const timeComponentsToShow = this.props.timeComponentsToShow;
     return (
       <div className="Countdown">
 				{ timeComponentsToShow.includes('days') && (
 	        <span className="Countdown-col">
 	          <span className="Countdown-col-element">
 	              <strong>{this.addLeadingZeros(countDown.days)}</strong>
 	              <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
 	          </span>
 	        </span>
 				)}

 				{ timeComponentsToShow.includes('hours') && (
 	        <span className="Countdown-col">
 	          <span className="Countdown-col-element">
 	            <strong>{this.addLeadingZeros(countDown.hours)}</strong>
 	            <span>Hours</span>
 	          </span>
 	        </span>
 				)}

 				{ timeComponentsToShow.includes('minutes') && (
 	        <span className="Countdown-col">
 	          <span className="Countdown-col-element">
 	            <strong>{this.addLeadingZeros(countDown.min)}</strong>
 	            <span>Min</span>
 	          </span>
 	        </span>
 				)}

 				{ timeComponentsToShow.includes('seconds') && (
 	        <span className="Countdown-col">
 	          <span className="Countdown-col-element">
 	            <strong>{this.addLeadingZeros(countDown.sec)}</strong>
 	            <span>Sec</span>
 	          </span>
 	        </span>
 				)}
       </div>
     );
   }
 }

 Countdown.propTypes = {
   date: PropTypes.instanceOf(Date),
 	days: PropTypes.number,
 	hours: PropTypes.number,
 	minutes: PropTypes.number,
 	seconds: PropTypes.number,
 	timeComponentsToShow: PropTypes.arrayOf(PropTypes.oneOf(['days', 'hours', 'minutes', 'seconds'])),
 	finishCallback: PropTypes.func,
 };

 Countdown.defaultProps = {
   date: new Date(),
 	days: 0,
 	hours: 0,
 	minutes: 0,
 	seconds: 0,
 	timeComponentsToShow: ['days', 'hours', 'minutes', 'seconds'],
 	finishCallback: () => void(0),
 };

 export default Countdown;
