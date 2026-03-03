import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Download, RefreshCw, Trash2, Video, VideoOff, Timer } from 'lucide-react';
import Button from '@/components/ui/Button';
import html2canvas from 'html2canvas';
import PhotoStrip from '@/components/PhotoStrip';
import TemplatePicker, { templates } from '@/components/TemplatePicker';
import FilterBar, { filters } from '@/components/FilterBar';
import ColorPicker from '@/components/ColorPicker';

const Photobooth = () => {
  const webcamRef = useRef(null);
  const printRef = useRef(null);
  const [images, setImages] = useState([]);
  const [sessionDate, setSessionDate] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [timerDuration, setTimerDuration] = useState(3);
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

  const playShutterSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const runSequence = (count) => {
    if (count >= 4) {
      setIsCapturing(false);
      return;
    }
    let timer = timerDuration;
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
    playShutterSound();
    setTimeout(() => setFlash(false), 150);
    const imageSrc = webcamRef.current.getScreenshot();
    setImages(prev => [...prev, imageSrc]);
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
      <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <div className={`absolute inset-0 bg-white z-20 pointer-events-none transition-opacity duration-150 ${flash ? 'opacity-100' : 'opacity-0'}`} />
        
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
              className="w-full h-full object-cover transform scale-x-[-1]"
              onUserMediaError={() => setIsCameraOn(false)}
              style={{ filter: selectedFilter.style }}
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
      {!isCapturing && (
        <div className="w-full max-w-2xl space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
          <FilterBar selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
          <TemplatePicker selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
          <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          
          <div className="w-full">
            <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest ml-1">4. Timer Duration</h3>
            <div className="flex gap-3">
              {[3, 5, 10].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimerDuration(t)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
                    ${timerDuration === t 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'}
                  `}
                >
                  <Timer size={14} /> {t}s
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-4 flex-wrap justify-center">
        {images.length < 4 && !isCapturing && (
          <Button onClick={() => setIsCameraOn(!isCameraOn)} variant="secondary" className="!px-6">
            {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
            {isCameraOn ? 'Turn Off' : 'Turn On'}
          </Button>
        )}
        {!isCapturing && images.length < 4 && (
          <Button onClick={startCapture} variant="primary" className="!px-10 !py-4 text-lg shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isCameraOn}>
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
      <div className="mt-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <h3 className="text-center text-gray-500 mb-4 text-sm uppercase tracking-widest">Preview Result</h3>
          
          <PhotoStrip 
            ref={printRef}
            images={images}
            selectedTemplate={selectedTemplate}
            selectedFilter={selectedFilter}
            sessionDate={sessionDate}
            selectedColor={selectedColor}
          />
      </div>
    </div>
  );
};

export default Photobooth;
