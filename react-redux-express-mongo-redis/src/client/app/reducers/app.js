// libraries
import _ from 'lodash';

import {
  TEST_ON,
  TEST_OFF
} from '../actions/app';

const appReducer  = (state = [], action) => {
  switch (action.type) {
    case TEST_ON:
      return _.merge({}, state,
        {
          test: true
        }
      );
    case TEST_OFF:
      return _.merge({}, state,
        {
          test: false
        }
      );
    default:
      return _.merge({}, state);
  }
}

export default appReducer;
