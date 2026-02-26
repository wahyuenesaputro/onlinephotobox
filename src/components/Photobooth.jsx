import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Download, RefreshCw, Trash2, Video, VideoOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import html2canvas from 'html2canvas';

const Photobooth = () => {
  const webcamRef = useRef(null);
  const printRef = useRef(null);
  const [images, setImages] = useState([]);
  const [sessionDate, setSessionDate] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const videoConstraints = {
    width: 1080,
    height: 1440, 
    facingMode: "user"
  };

  const startCapture = () => {
    setIsCapturing(true);
    setImages([]);
    setSessionDate(new Date());
    runSequence(0);
  };

  const runSequence = (count) => {
    if (count >= 4) {
      setIsCapturing(false);
      return;
    }

    let timer = 3;
    setCountdown(timer);
    
    const interval = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(interval);
        capturePhoto(count);
      }
    }, 1000);
  };

  const capturePhoto = (count) => {
    setCountdown(null);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const imageSrc = webcamRef.current.getScreenshot();
    setImages(prev => [...prev, imageSrc]);

    // Delay sedikit sebelum foto berikutnya
    setTimeout(() => {
      runSequence(count + 1);
    }, 1000);
  };

  const retake = () => {
    setImages([]);
    setIsCapturing(false);
    setSessionDate(null);
  };

  const downloadStrip = async () => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `mofu-photobooth-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      
      {/* Area Kamera / Preview */}
      <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        {/* Flash Effect */}
        <div className={`absolute inset-0 bg-white z-20 pointer-events-none transition-opacity duration-150 ${flash ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <span className="text-9xl font-bold text-white drop-shadow-lg animate-bounce">
              {countdown}
            </span>
          </div>
        )}

        {images.length < 4 ? (
          isCameraOn ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
              onUserMediaError={() => setIsCameraOn(false)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
              <VideoOff size={48} className="text-gray-600" />
              <p className="text-gray-400">Camera is Off</p>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            <p className="font-semibold">Session Complete!</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap justify-center">
        {images.length < 4 && !isCapturing && (
          <Button onClick={() => setIsCameraOn(!isCameraOn)} variant="secondary" className="!px-6">
            {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
            {isCameraOn ? 'Turn Off' : 'Turn On'}
          </Button>
        )}

        {!isCapturing && images.length < 4 && (
          <Button onClick={startCapture} variant="primary" className="!px-10 !py-4 text-lg shadow-pink-500/40 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isCameraOn}>
            <Camera size={24} /> Start Photo
          </Button>
        )}

        {images.length === 4 && (
          <>
            <Button onClick={retake} variant="secondary">
              <RefreshCw size={20} /> Retake
            </Button>
            <Button onClick={downloadStrip} variant="primary" className="bg-green-500 hover:bg-green-600 shadow-green-500/30">
              <Download size={20} /> Download
            </Button>
          </>
        )}
      </div>

      {/* Result Strip Preview */}
      <div className="mt-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <h3 className="text-center text-gray-500 mb-4 text-sm uppercase tracking-widest">Preview Result</h3>
          
          {/* Ini elemen yang akan di-download */}
          <div 
            ref={printRef} 
            className="bg-white p-5 shadow-xl mx-auto"
            style={{ width: '280px' }} // Lebar fix untuk hasil strip vertical
          >
            <div className="flex flex-col">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm"
                  style={{ marginBottom: (images.length === 4 && idx === 3) ? '0' : '15px' }}
                >
                  <img src={img} alt={`pose-${idx}`} className="w-full h-full object-cover transform scale-x-[-1]" />
                  <div className="absolute bottom-2 right-2 bg-white text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-20">
                    {idx + 1}
                  </div>
                </div>
              ))}
              {/* Placeholder jika belum 4 foto */}
              {[...Array(4 - images.length)].map((_, idx) => (
                <div 
                  key={`empty-${idx}`} 
                  className="relative aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-200"
                  style={{ marginBottom: (idx === (4 - images.length) - 1) ? '0' : '15px' }}
                >
                  <Camera size={24} />
                  <div className="absolute bottom-2 right-2 bg-gray-300 text-gray-500 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full z-20">
                    {images.length + idx + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 mb-2">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tighter leading-none">MOFU <span className="text-pink-500">STUDIO</span></h2>
              <p className="text-[10px] text-gray-400 mt-1 font-mono uppercase tracking-widest">
                {sessionDate ? sessionDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'DD/MM/YY'}
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Photobooth;