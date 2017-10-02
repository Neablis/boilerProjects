// libraries
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import _ from 'lodash';

// store
import configureStore from './store/configure-store';

import Main from './containers/main';

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('#app')) {
    return;
  }

  const initialState = _.merge({}, {
    // Add bootstrapped state here
    App: {
      test: true
    }
  });

  const store = configureStore(initialState);

  render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('app')
  );
});
