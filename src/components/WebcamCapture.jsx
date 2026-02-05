// src/components/WebcamCapture.jsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas'; // Import library download

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const gridRef = useRef(null); // Ref untuk mengambil elemen grid
  
  // STATE
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [images, setImages] = useState([]); 
  const [countdown, setCountdown] = useState(null); 
  const [isCapturing, setIsCapturing] = useState(false); 

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
    setIsCapturing(true);
    setImages([]); 
    
    for (let i = 0; i < 4; i++) {
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
      }
      
      await delay(200);
      setCountdown(null);
      if (i < 3) await delay(800); // Jeda antar foto
    }

    setIsCapturing(false);
  };

  // Fungsi Download Gambar
  const downloadImage = async () => {
    if (gridRef.current) {
      // Ambil elemen grid dan ubah jadi gambar
      const canvas = await html2canvas(gridRef.current, { scale: 2 }); // Scale 2 biar HD
      const link = document.createElement('a');
      link.download = 'mofu-photostrip.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Fungsi Reset / Ulangi
  const retake = () => {
    setImages([]);
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
      
      {/* --- KAMERA AREA --- */}
      <div className="camera-box">
        {isCameraOn ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            height={480}
            width={480}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
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
              <div key={i} className="grid-placeholder">?</div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default WebcamCapture;