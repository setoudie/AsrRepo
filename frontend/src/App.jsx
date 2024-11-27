import React, { useState } from 'react';
import RecordAudio from './components/RecordAudio.jsx';
import UploadAudio from './components/UploadAudio';

const App = () => {
  const [transcription, setTranscription] = useState('');

  return (
    <div>
      <h1>ASR Application</h1>
      <RecordAudio onTranscription={setTranscription} />
      <UploadAudio onTranscription={setTranscription} />
      <div>
        <h2>Transcription</h2>
        <p>{transcription || 'No transcription yet...'}</p>
      </div>
    </div>
  );
};

export default App;
