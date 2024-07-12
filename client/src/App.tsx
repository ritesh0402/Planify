import React from 'react';

import Header from './components/header/Header'

import bgImage from './images/backgroundImage.jpg'
import AppRoutes from './components/routes/AppRoutes';

function App() {
  return (
    <div style={{ backgroundImage: `url(${bgImage})`, height: "100vh" }}>
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
