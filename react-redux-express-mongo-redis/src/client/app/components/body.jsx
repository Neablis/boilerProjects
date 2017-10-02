// libraries
import React, {Component} from 'react';

// components

class Body extends Component {
  render () {
    const {
      testOn,
      testOff,
      test
    } = this.props;

    return (
      <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <h1>
          {`Hello world, ${test}`}
        </h1>
        {
          test ?
            (
              <button onClick={testOff}>
                Turn me off
              </button>
            ):
            (
              <button onClick={testOn}>
                Turn me on
              </button>
            )
          }
      </main>
    );
  }
}

export default Body;
