import React, { useState, useEffect } from 'react';

import Home from './Home.jsx';
import Loading from './Loading.jsx';
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
  }, [])

  if (auth === null) {
    return <Loading />
  }
  if (auth) {
    return <Dashboard auth={auth} />
  }
  return <Home />
};

export default App;