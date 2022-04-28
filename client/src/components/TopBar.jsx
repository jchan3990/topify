import React from 'react';

import './TopBar.css';

const TopBar = () => {

  const logout = () => {
    fetch('/auth/logout')
      .then(() => window.location.href = '/')
  }

  return (
    <div id="top-bar-container">
      <div className="top-bar-content">
        Topify
      </div>
      <div className="top-bar-content">
        Logo Here
      </div>
      <div className="top-bar-content" onClick={logout}>
        Logout
      </div>
    </div>
  )
}

export default TopBar;