import React, { useState, useEffect } from 'react';

import Dashboard from './Dashboard.jsx';

const App = () => {
  const [auth, setAuth] = useState(null);

  return (
    <div className="app">
        <h1>Please login to Spotify</h1>
        <form action="/auth/login">
          <input type="submit" value="Login with Spotify" />
        </form>
    </div>
  )
};

export default App;