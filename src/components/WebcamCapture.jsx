import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const gridRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [images, setImages] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  // SETTING KAMERA
  const videoConstraints = {
    width: 640,  // Ubah sesuai kebutuhan
    height: 426, // Ubah sesuai kebutuhan, mempertahankan rasio 3:2
    facingMode: "user"
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const startPhotobooth = async () => {
    setIsCapturing(true);
    setImages([]);

    for (let i = 0; i < 4; i++) {
      for (let num = 3; num > 0; num--) {
        setCountdown(num);
        await delay(1000);
      }

      setCountdown("📸");
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        setImages(prev => [...prev, screenshot]);
      }

      await delay(200);
      setCountdown(null);
      if (i < 3) await delay(800);
    }

    setIsCapturing(false);
  };

  const downloadImage = async () => {
    if (gridRef.current) {
      try {
        const canvas = await html2canvas(gridRef.current, { scale: 2 });
        const link = document.createElement('a');
        link.download = 'mofu-photostrip.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error during image download:', error); // Added error log
      }
    }
  };

  const retake = () => {
    setImages([]);
  };

  return (
    <div className="webcam-wrapper">
      <div style={{ padding: '10px', background: 'yellow', marginBottom: '10px', border: '1px solid black' }}>
        Component is rendering - Camera Error: {cameraError ? 'Yes' : 'No'}
      </div>

      <div className="camera-box">
        {isCameraOn ? (
          cameraError ? (
            <div style={{ padding: '100px', color: '#ff6b6b', textAlign: 'center' }}>
              <p>Kamera tidak dapat diakses</p>
              <p style={{ fontSize: '0.9em', opacity: 0.8 }}>{cameraError}</p>
              <p style={{ fontSize: '0.8em', marginTop: '10px' }}>Pastikan izin kamera diberikan dan coba refresh halaman.</p>
            </div>
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              height={480} // Ubah sesuai kebutuhan
              width={640} //Ubah sesuai kebutuhan
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored={true}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onUserMedia={() => {
                setCameraError(null);
              }}
              onUserMediaError={(error) => {
                setCameraError(error.message || 'Camera access denied or unavailable');
              }}
            />
          )
        ) : (
          <div style={{ padding: '100px', color: '#666' }}>Kamera Nonaktif</div>
        )}
        {countdown && (
          <div className="countdown-overlay">
            <div className="countdown-text">{countdown}</div>
          </div>
        )}
      </div>
      <div className="controls">
        <button
          className="btn btn-secondary"
          onClick={() => setIsCameraOn(!isCameraOn)}
          disabled={isCapturing}
        >
          {isCameraOn ? 'Matikan Kamera' : 'Nyalakan'}
        </button>
        {!isCapturing && images.length < 4 && (
            <button
                className="btn btn-primary"
                onClick={startPhotobooth}
            disabled={!isCameraOn}
            >
              Mulai Foto 
            </button>
        )}
        {images.length === 4 && (
          <>
            <button className="btn btn-secondary" onClick={retake}>Ulangi ↺</button>
            <button className="btn btn-download" onClick={downloadImage}>Download 💾</button>
          </>
        )}
      </div>
      <div className="result-section">
          <p style={{marginBottom: '10px', opacity: 0.7}}>
            {images.length === 4 ? "Hasil fotomu siap dicetak!" : "Sedang mengambil gambar..."}
          </p>
          <div 
            className="photobooth-grid-container" 
            ref={gridRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              backgroundColor: 'white'
            }}
          >
            {images.map((img, index) => (
              <div key={index} style={{ position: 'relative', marginBottom: (images.length === 4 && index === 3) ? '0' : '15px' }}>
                <img src={img} className="grid-photo-item" alt="pose" style={{ width: '100%', display: 'block' }} />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(255,255,255,0.8)',
                  color: '#333',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  zIndex: 20
                }}>
                  {index + 1}
                </div>
              </div>
            ))}
            {[...Array(4 - images.length)].map((_, i) => (
              <div key={i} className="grid-placeholder" style={{ position: 'relative', marginBottom: (i === (4 - images.length) - 1) ? '0' : '15px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: '#eee',
                  color: '#999',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  zIndex: 20
                }}>
                  {images.length + i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default WebcamCapture;
