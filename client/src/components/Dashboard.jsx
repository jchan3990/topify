import React, { useState } from 'react';
import 'regenerator-runtime/runtime';

import './Dashboard.css';

import TopBar from './TopBar.jsx';
import Receipt from './Receipt.jsx';

const Dashboard = () => {
  const [receipt, setReceipt] = useState(0);
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async (span) => {
    const response = await fetch(`/app/tracks?time_range=${span}`)
    const data = await response.json();
    setTracks(data);
    setReceipt(1);
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
      {receipt && tracks.length > 0 ? (
       <Receipt tracks={tracks} />
      ) : (
        null
      )}
    </div>
  )
}

export default Dashboard;