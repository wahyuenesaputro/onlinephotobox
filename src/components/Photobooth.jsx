import { useState } from 'react';
import WebcamCapture from './WebcamCapture.jsx';

const Photobooth = () => {
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return (
      <div className="camera-wrapper-container">
        <div className="camera-header">
          <button className="btn btn-outline" onClick={() => setShowCamera(false)}>
            &larr; Kembali
          </button>
        </div>
        <WebcamCapture />
      </div>
    );
  }

  return (
    <div className="start-card">
      <div className="icon-wrapper">📸</div>
      <h3>Ready?</h3>
      <p>Siapkan pose terbaikmu! 4 kali jepretan otomatis.</p>
      <button className="btn btn-primary btn-lg" onClick={() => setShowCamera(true)}>
        Open Camera 🚀
      </button>
    </div>
  );
};

export default Photobooth;