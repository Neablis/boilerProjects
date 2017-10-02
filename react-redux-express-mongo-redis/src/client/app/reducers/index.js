// libraries
import { combineReducers } from 'redux';

// Reducers
import App from './app';

const rootReducer = combineReducers({
  App: App
});

export default rootReducer;
