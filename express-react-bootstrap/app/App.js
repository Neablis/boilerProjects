import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'container'}>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Express React Bootstrap</h1>
            <p className="lead">This is a sample project using react express and bootstrap</p>
          </div>
        </div>
      </div>
    );
  }
}
