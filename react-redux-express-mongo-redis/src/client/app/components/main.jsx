// libraries
import React, {Component, PureComponent} from 'react';

// components
import TopNav from './top-nav.jsx';
import SideNav from './side-nav.jsx';
import Body from './body.jsx';

class Main extends PureComponent {
  render () {
    const {
      test,
      testOff,
      testOn
    } = this.props;

    return (
      <div>
        <div className="starter-main container-fluid">
          <TopNav />
          <div className="row">
            <SideNav />
            <Body
              test={test}
              testOff={testOff}
              testOn={testOn}
             />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
