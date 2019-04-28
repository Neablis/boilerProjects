import React, { Component } from 'react';

class Card extends Component {
  render() {
    const {
      home,
    } = this.props;

    return (
      <div>
        Home
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

export default connect(mapStateToProps)(Home);
