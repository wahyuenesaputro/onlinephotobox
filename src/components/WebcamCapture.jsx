// src/components/WebcamCapture.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas'; // Import library download

const WebcamCapture = () => {
  console.log('WebcamCapture component rendered'); // Debug log
  const webcamRef = useRef(null);
  const gridRef = useRef(null); // Ref untuk mengambil elemen grid

  // STATE
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [images, setImages] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  // Added state for camera error handling to prevent blank screen
  const [cameraError, setCameraError] = useState(null);

  // SETTING KAMERA
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  // --- LOGIKA UTAMA ---
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Mulai Sesi Foto
  const startPhotobooth = async () => {
    console.log('Starting photobooth session'); // Added console log for debugging
    setIsCapturing(true);
    setImages([]);

    for (let i = 0; i < 4; i++) {
      console.log(`Starting photo ${i + 1}`); // Added log for each photo
      // Countdown
      for (let num = 3; num > 0; num--) {
        setCountdown(num);
        await delay(1000);
      }

      // Capture
      setCountdown("📸");
      if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        setImages(prev => [...prev, screenshot]);
        console.log(`Photo ${i + 1} captured`); // Added log for successful capture
      } else {
        console.error(`Webcam ref is null during photo ${i + 1} capture`); // Added error log
      }

      await delay(200);
      setCountdown(null);
      if (i < 3) await delay(800); // Jeda antar foto
    }

    setIsCapturing(false);
    console.log('Photobooth session completed'); // Added completion log
  };

  // Fungsi Download Gambar
  const downloadImage = async () => {
    console.log('Starting image download'); // Added console log for debugging
    if (gridRef.current) {
      try {
        // Ambil elemen grid dan ubah jadi gambar
        const canvas = await html2canvas(gridRef.current, { scale: 2 }); // Scale 2 biar HD
        const link = document.createElement('a');
        link.download = 'mofu-photostrip.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        console.log('Image download initiated'); // Added success log
      } catch (error) {
        console.error('Error during image download:', error); // Added error log
      }
    } else {
      console.error('Grid ref is null during download'); // Added error log
    }
  };

  // Fungsi Reset / Ulangi
  const retake = () => {
    console.log('Retaking photos, resetting images'); // Added console log for debugging
    setImages([]);
  };

  return (
    <div className="webcam-wrapper">
      {/* Debug element to check if component is rendering */}
      <div style={{ padding: '10px', background: 'yellow', marginBottom: '10px', border: '1px solid black' }}>
        Component is rendering - Camera Error: {cameraError ? 'Yes' : 'No'}
      </div>

      {/* --- KAMERA AREA --- */}
      <div className="camera-box">
        {isCameraOn ? (
          cameraError ? (
            // Added error display to prevent blank screen when camera access fails
            <div style={{ padding: '100px', color: '#ff6b6b', textAlign: 'center' }}>
              <p>❌ Kamera tidak dapat diakses</p>
              <p style={{ fontSize: '0.9em', opacity: 0.8 }}>{cameraError}</p>
              <p style={{ fontSize: '0.8em', marginTop: '10px' }}>Pastikan izin kamera diberikan dan coba refresh halaman.</p>
            </div>
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              height={480}
              width={480}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              mirrored={true}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              // Added callbacks for proper camera initialization and error handling
              onUserMedia={() => {
                console.log('Camera access granted');
                setCameraError(null); // Clear any previous error
              }}
              onUserMediaError={(error) => {
                console.error('Camera access error:', error);
                setCameraError(error.message || 'Camera access denied or unavailable');
              }}
            />
          )
        ) : (
          <div style={{ padding: '100px', color: '#666' }}>Kamera Nonaktif</div>
        )}

        {/* Countdown Overlay */}
        {countdown && (
          <div className="countdown-overlay">
            <div className="countdown-text">{countdown}</div>
          </div>
        )}
      </div>

      {/* --- CONTROL BUTTONS --- */}
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
             MULAI FOTO ✨
           </button>
        )}

        {/* Tombol muncul kalau foto sudah selesai */}
        {images.length === 4 && (
          <>
            <button className="btn btn-secondary" onClick={retake}>Ulangi ↺</button>
            <button className="btn btn-download" onClick={downloadImage}>Download 💾</button>
          </>
        )}
      </div>

      {/* --- HASIL GRID --- */}
      {(images.length > 0 || isCapturing) && (
        <div className="result-section">
          <p style={{marginBottom: '10px', opacity: 0.7}}>
            {images.length === 4 ? "Hasil fotomu siap dicetak!" : "Sedang mengambil gambar..."}
          </p>

          {/* Ini bagian yang akan di-screenshot oleh html2canvas */}
          {/* Kita pasang ref={gridRef} di sini */}
          <div className="photobooth-grid-container" ref={gridRef}>

            {/* Render Foto */}
            {images.map((img, index) => (
              <img key={index} src={img} className="grid-photo-item" alt="pose" />
            ))}

            {/* Placeholder (Kotak Kosong) */}
            {[...Array(4 - images.length)].map((_, i) => (
              <div key={i} className="grid-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default WebcamCapture;
