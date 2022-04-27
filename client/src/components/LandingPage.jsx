import React from 'react';

import './LandingPage.css'

const LandingPage = () => {
  return (
    <div id="landing-page">
      <div id="landing-page-content-container">
        <div id="landing-page-text-container">
          <p id="landing-page-text">
            A life without music
          </p>
          <p id="landing-page-text">
            Is no life at all.
          </p>
        </div>
        <div id="landing-page-login-btn-container">
          <a id="login-btn" href="/auth/login">Login to Spotify</a>
        </div>

      </div>
    </div>
  )
}

export default LandingPage;