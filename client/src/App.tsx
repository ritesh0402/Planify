import React from 'react';

import Header from './components/header/Header'
import Landing from './components/landing/Landing';

import bgImage from './images/backgroundImage.jpg'

function App() {
  return (
    <div style={{ backgroundImage:`url(${bgImage})`, height:"100vh" }}>
      <Header />
      <Landing />
    </div>
  );
}

export default App;
