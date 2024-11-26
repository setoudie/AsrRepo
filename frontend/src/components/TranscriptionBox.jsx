// components/TranscriptionBox.jsx

import React from 'react';

const TranscriptionBox = ({ transcription }) => {
  return (
    <div className="transcription-box">
      <h3>Transcription :</h3>
      <p>{transcription}</p>
    </div>
  );
};

export default TranscriptionBox;
