import React from 'react';

import './Receipt.css';

const Receipt = ({ tracks }) => {
  return(
    <div id="receipt-container">
      <div className="receipt-paper">
        <div className="receipt-header">
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Receipt of Sale
          </div>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
            Topify
          </div>
          <div>
            ------------------------------------------------
          </div>
        </div>
        <div className="receipt-list">
          <div className="track-list">
          {tracks.map(track => (
            <div className="track-item">
              <span className="track-name" key={track.external_ids.isrc}>{track.name.substring(0, 40) + (track.name.length > 40 ? '...' : '')}</span>
              <span className="track-amt">{Math.floor(Math.random() * 24 + 1)}</span>
            </div>
            ))}
          </div>
        </div>
        <div className="receipt-footer" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          THANK YOU!
        </div>
      </div>
    </div>
  )
}

export default Receipt;