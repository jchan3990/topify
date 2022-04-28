import React, { useState } from 'react';

import './Dashboard.css';

import TopBar from './TopBar.jsx'

const Dashboard = () => {
  const [receipt, setReceipt] = useState(0);
  const [tracks, setTracks] = useState([]);

  const fetchTracks = (span) => {
    fetch(`/app/tracks?time_range=${span}`)
      .then(response => {console.log(response)})
  }

  return (
    <div id="dashboard-container">
      <TopBar />
      <div id="dashboard-btns-container">
        <div className="dashboard-btn" onClick={() => fetchTracks('short_term')}>
          Top 10 tracks (Month)
        </div>
        <div className="dashboard-btn" onClick={() => fetchTracks('medium_term')}>
          Top 10 tracks (6 Months)
        </div>
        <div className="dashboard-btn" onClick={() => fetchTracks('long_term')}>
          Top 10 tracks (All Time)
        </div>
      </div>
    </div>
  )
}

export default Dashboard;