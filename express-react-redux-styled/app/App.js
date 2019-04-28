// libraries
import React from 'react';

// components
import Home from './scenes/home';
import Nav from './scenes/nav';

const App = () => {
  return (
    <section id="layout" className="container-fluid h-100">
      <div className="row h-100">
        <Nav />
        <Home />
      </div>
    </section>
  );
};

export default App;
