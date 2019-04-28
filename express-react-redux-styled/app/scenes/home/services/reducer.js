import { INCREASE, DECREASE } from './actions';

const defaultState = {
  content: 'Home'
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case INCREASE:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case DECREASE:
      return Object.assign({}, state, {
        count: state.count - 1,
      });
    default:
      return state;
  }
};

export default reducer;
