// libraries
import {connect} from 'react-redux';

// components
import Main from '../components/main.jsx';

// actions
import {testOn, testOff} from '../actions/app';

// shared

const mapStateToProps = (state) => {
  return state.App;
}

const mapDispatchToProps = (dispatch) => {
  return {
    testOn() {
      return dispatch(testOn());
    },
    testOff() {
      return dispatch(testOff());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
