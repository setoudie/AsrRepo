import React, { useState } from "react";
import { sendAudioFile } from "../api/api";

const UploadButton = ({ setTranscription }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      setIsUploading(true);
      try {
        const transcription = await sendAudioFile(file);
        setTranscription(transcription); // Met à jour la transcription dans TranscriptionBox
        console.log('setTranscription')
      } catch (error) {
        // console.log(setTranscription)
        alert(error+" Erreur lors de la transcription.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {isUploading && <p>Transcription en cours...</p>}
    </div>
  );
};

export default UploadButton;
