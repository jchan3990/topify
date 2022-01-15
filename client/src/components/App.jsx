import React, { useState, useEffect } from 'react';

import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';

const App = () => {
  const [isHome, setIsHome] = useState(1);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch('/auth/current-session')
      .then(response => response.json())
      .then(data => {
        setAuth(data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
    {auth ? <Dashboard /> : <Home />}
    </div>
  )
};

export default App;