import React, { useState, useEffect } from 'react';

import LandingPage from './LandingPage.jsx';
import Dashboard from './Dashboard.jsx';

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch('/auth/current-session')
      .then(response => response.json())
      .then(data => setAuth(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="App">
      {auth ? <Dashboard /> : <LandingPage />}
    </div>
  )
};

export default App;