import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ThinScrollbar extends Component {
  static defaultProps = {
    trackColor: '#3B708E',
    thumbColor: '#73CCE5'
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      top: 0,
      scrollbarWidth: 15,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderThumbV = this.renderThumbV.bind(this);
    this.renderTrackV = this.renderTrackV.bind(this);
    /* this.renderThumbH = this.renderThumbH.bind(this);
    this.renderTrackH = this.renderTrackH.bind(this); */
    this.getScrollbarWidth = this.getScrollbarWidth.bind(this);
  }

  componentDidMount() {
    this.setState({ scrollbarWidth: this.getScrollbarWidth() });
  }

  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  handleUpdate(values) {
    const {top} = values;
    console.log(top);
    this.setState({top});
  }

  renderView({ style, ...props }) {
    const viewStyle = {
      padding: 15,
      marginRight: `-${this.state.scrollbarWidth}px`,
      marginBottom: `-${this.state.scrollbarWidth}px`,
    };

    return (
      <div
        className="box"
        style={{ ...style, ...viewStyle }}
        {...props}/>
    );
  }

  renderThumbV({ style, ...props }) {
    const thumbStyle = {
      backgroundColor: this.props.thumbColor,
    };

    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  renderTrackV({ style, ...props }) {
    const trackStyle = {
      backgroundColor: this.props.trackColor,
      width: 2,
      bottom: 1,
      position: 'absolute',
      right: 1,
      top: 1,
      display: 'block'
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  }

  render() {
    return (
      <Scrollbars
        renderView={this.renderView}
        renderThumbVertical={this.renderThumbV}
        renderTrackVertical={this.renderTrackV}
        onUpdate={this.handleUpdate}
        {...this.props}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
