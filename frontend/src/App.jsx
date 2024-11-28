import React, { useState } from 'react';
import RecordAudio from './components/RecordAudio';
import UploadAudio from './components/UploadAudio';
import TranscriptionBox from './components/TranscriptionBox';
import Navbar from "./components/Navbar.jsx";
import './App.css';

const App = () => {
  const [transcription, setTranscription] = useState('');

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <h1 className="app-title">ASR Application</h1>
        <RecordAudio onTranscription={setTranscription} />
        <UploadAudio onTranscription={setTranscription} />
        <TranscriptionBox transcription={transcription} />
      </div>
    </div>
  );
};

export default App;
