import React from 'react';

import './TopBar.css';

const TopBar = () => {
  
  return (
    <div className="top-bar">
      <div className="title-container">
        <h1>Topify</h1>
      </div>
      <div className="button-container">
        <button>Login/Logout</button>
      </div>
    </div>
  )
};

export default TopBar;