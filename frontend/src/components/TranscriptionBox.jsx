import React from 'react';
import './TranscriptionBox.css';

const TranscriptionBox = ({ transcription }) => {
  return (
    <div className="transcription-container">
      <h2 className="transcription-title">Transcription</h2>
      <div className="transcription-box">
        {transcription ? (
          <p className="transcription-text">{transcription}</p>
        ) : (
          <p className="transcription-placeholder">No transcription available yet...</p>
        )}
      </div>
    </div>
  );
};

export default TranscriptionBox;
