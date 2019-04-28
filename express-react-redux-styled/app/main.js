// libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

// Theme
import theme from 'services/theme'

// store
import store from './services/store';

// components
import App from './App';

const GlobalStyle = createGlobalStyle`
  html,body {
    height: 100%;
  }
  
  body {
    background-color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }
  
  #root {
    height: 100%;
    display: block !important;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div className="h-100">
        <App />
        <GlobalStyle whiteColor />
      </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
