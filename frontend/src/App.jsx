// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App


// App.jsx

import React, { useState } from 'react';
import RecordButton from './components/RecordButton';
import UploadButton from './components/UploadButton';
import TranscriptionBox from './components/TranscriptionBox';
import { sendAudioFile } from './api/api';

const App = () => {
  const [transcription, setTranscription] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleStartRecording = () => {
    // Implémenter la logique d'enregistrement audio ici
  };

  const handleStopRecording = () => {
    // Implémenter la logique pour stopper l'enregistrement et traiter l'audio
  };

  const handleFileUpload = (file) => {
    setAudioFile(file);
    transcribeAudio(file);  // Transcrire directement après le téléchargement
  };

  const transcribeAudio = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);

    try {
      const result = await sendAudioFile(formData);
      setTranscription(result.transcription);  // Mettez ici la transcription retournée par Flask
    } catch (error) {
      setTranscription('Erreur de transcription.');
    }
  };

  return (
    <div>
      <h1>Application ASR</h1>
      <RecordButton onStartRecording={handleStartRecording} onStopRecording={handleStopRecording} />
      <UploadButton onFileUpload={handleFileUpload} />
      <TranscriptionBox transcription={transcription} />
    </div>
  );
};

export default App;
