import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TimeIndicator = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  color: ${props => props.bgColorFinished ? '#D9534F' : '#DCEDF5'};
  text-align: center;
  font-size: 2em;
  font-weight: bold;
`;

const Wrapper = styled.div`
  position: relative;
  display: block;
`;

const TimerStyled = styled.div`
  width: 200px;
  height: 200px;
  top: 200px;
  left: 100px;
  background-color: ${props => props.bgColor};
`;

function Circle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
      <defs>
        <filter id="sofGlow" height="300%" width="300%" x="-75%" y="-75%">
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="14" result="blurred" />
          <feFlood floodColor="#61FBFC" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
          <feMerge>
            <feMergeNode in="softGlow_colored"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g x="0" y="0">
      <path id="arc1"  d={props.arcParams} fill="none" stroke="#61FBFC" strokeWidth="6" filter="url(#sofGlow)" />
      </g>
    </svg>
  );
}

export default class Timer extends Component {
  static propTypes = {
    initialTime: PropTypes.number.isRequired,
    completeCallback: PropTypes.func,
    bgColor: PropTypes.string
  };

  static defaultProps = {
    title: 'Timer'
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
      arcParams: 'M 150.01745329243136 50.00000152308709 A 100 100 0 0 0 150.01745329243136 50.00000152308709',
      timeLeft: this.props.initialTime * 1000 * 60,
      bgColorFinished: false
    };

    this.startTimer = this.startTimer.bind(this);
    this.playStartAnimation = this.playStartAnimation.bind(this);
    this.playCountdownAnimation = this.playCountdownAnimation.bind(this);
    this.tickAnimation = this.tickAnimation.bind(this);
    this.playCountdownClock = this.playCountdownClock.bind(this);
    this.updateAfterTab = this.updateAfterTab.bind(this);
    this.getMinutes = this.getMinutes.bind(this);
    this.getSeconds = this.getSeconds.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.startTimer();

    window.addEventListener('focus', this.updateAfterTab);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.downTimerID);

    window.removeEventListener('focus', this.updateAfterTab);

    this._isMounted = false;
  }

  updateAfterTab() {
    this.forceUpdate();
  }

  startTimer() {
    clearInterval(this.timerID);
    clearInterval(this.downTimerID);
    this.playStartAnimation(2)
      .then(() => {
        return new Promise((resolve) => {
          this.playCountdownClock(this.props.initialTime * 1);
          this.playCountdownAnimation(this.props.initialTime * 60).then(() => {
            resolve(true);
          });
        });
      })
      .then(() => {
        return this.playEndAnimation(4);
      }).then(() => {
        this.setState({
          bgColorFinished: false
        });

        if (this.props.completeCallback) {
          this.props.completeCallback();
        }
      });
  }

  playStartAnimation(durationSec) {
    return new Promise(resolve => {
      let iter = 0;
      const durationMillisec = durationSec * 1000;
      const tickInterval = durationMillisec / 359.9;

      this.timerID = setInterval(() => {
        if (iter <= 359.9) {
          iter++;
          this.tickAnimation(iter);
        } else {
          clearInterval(this.timerID);
          resolve(true);
        }
      }, tickInterval);
    });
  }

  playEndAnimation(durationSec) {
    return new Promise(resolve => {
      let iter = 0;

      this.setState({
        bgColorFinished: false
      });

      this.timerID = setInterval(() => {
        if (iter <= durationSec) {
          iter++;
          this.setState({
            bgColorFinished: !this.state.bgColorFinished
          });
        } else {
          clearInterval(this.timerID);
          resolve(true);
        }
      }, 500);
    });
  }

  playCountdownAnimation(durationSec) {
    return new Promise(resolve => {
      const iter = 359.9;
      const durationMillisec = durationSec * 1000;
      const tickInterval = durationMillisec / iter;

      const startTime = new Date();

      this.downTimerID = setInterval(() => {
        const elapsed = new Date() - startTime;
        if (elapsed <= durationMillisec) {
          this.tickAnimation((durationMillisec - elapsed) / tickInterval);
        } else {
          this.tickAnimation(0);
          clearInterval(this.downTimerID);
          resolve(true);
        }
      }, tickInterval);
    });
  }

  playCountdownClock(durationMin) {
    if (this._isMounted) {
      let nTimeLeft = durationMin * 60000;
      this.clocktimerID = setInterval(() => {
        if (nTimeLeft <= 0) {
          clearInterval(this.clocktimerID);
        } else {
          nTimeLeft = nTimeLeft - 1000;
          this.setState({
            timeLeft: nTimeLeft
          });
        }
      }, 1000);
    }
  }

  tickAnimation(angle) {
    if (this._isMounted) {
      this.setState({
        arcParams: this.describeArc(150, 150, 100, 0.01, angle)
      });
    }
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
  }

  getMinutes() {
    return Math.floor(((this.state.timeLeft / 1000) / 60));
  }

  getSeconds() {
    const seconds = ((this.state.timeLeft / 1000) % 60);
    return ('0' + seconds).slice(-2);
  }

  render() {
    const minutesLeft = this.getMinutes();
    const secondsLeft = this.getSeconds();

    return (
      <TimerStyled bgColor={this.props.bgColor}>
        <Wrapper>
          <Circle arcParams={this.state.arcParams} />
          <TimeIndicator bgColorFinished={this.state.bgColorFinished}>
            {`${minutesLeft}:${secondsLeft}`}
          </TimeIndicator>
        </Wrapper>
      </TimerStyled>
    );
  }
}
