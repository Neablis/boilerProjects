import React from 'react';
import ThinScrollbar from './components/scrollbar';
import Timer from './components/timer';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'container'}>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row">
              <div style={{margin: 'auto', width: '200'}}>
                <Timer initialTime={5} bgColor="#283B4C" completeCallback={()=> {console.log('timer finished');}} />
              </div>
            </div>
            {/* <div className="row">
              <div style={{margin: 'auto', width: '200'}}>
                <Timer initialTime={1.5} bgColor="#283B4C" completeCallback={()=> {console.log('timer finished')}}/>
              </div>
            </div>
            <div className="row">
              <div style={{margin: 'auto', width: '200'}}>
                <Timer initialTime={1} bgColor="#283B4C" completeCallback={()=> {console.log('timer finished')}}/>
              </div>
            </div>
            <div className="row">
              <div style={{margin: 'auto', width: '200'}}>
                <Timer initialTime={0.5} bgColor="#283B4C" completeCallback={()=> {console.log('timer finished')}}/>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
