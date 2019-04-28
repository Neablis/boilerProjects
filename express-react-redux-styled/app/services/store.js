import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';

import thunk from 'redux-thunk';
import homeReducer from '../scenes/home/services/reducer';
import navReducer from '../scenes/nav/services/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  nav: navReducer
});

/*  eslint-disable */
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose
/*  eslint-enable */


const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
  ),
);

const store = createStore(rootReducer, enhancer);

export default store;
