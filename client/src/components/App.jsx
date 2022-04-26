import React, { useState, useEffect } from 'react';

import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import TopBar from './TopBar.jsx';

const App = () => {
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
    <div className="App">
      <TopBar auth={auth} />
      {auth ? <Dashboard /> : <Home />}
    </div>
  )
};

export default App;