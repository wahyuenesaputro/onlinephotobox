import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import WebcamCard from '@/components/WebcamCard';
import PhotoStrip from '@/components/PhotoStrip';
import Controls from '@/components/Controls';
import FilterBar, { filters } from '@/components/FilterBar';
import TemplatePicker, { templates } from '@/components/TemplatePicker';

const PhotoboothPage = () => {
  const webcamRef = useRef(null);
  const printRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [timerDuration, setTimerDuration] = useState(3);

  // Logic: Start Sequence
  const startCapture = () => {
    setIsCapturing(true);
    setImages([]);
    runSequence(0);
  };

  // Logic: Countdown & Capture Loop
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

  // Logic: Take Screenshot
  const capturePhoto = (count) => {
    setCountdown(null);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImages(prev => [...prev, imageSrc]);
    }

    setTimeout(() => {
      runSequence(count + 1);
    }, 1000);
  };

  // Logic: Reset
  const retake = () => {
    setImages([]);
    setIsCapturing(false);
  };

  // Logic: Download
  const downloadStrip = async () => {
    if (printRef.current) {
      // 1. Render with a transparent background to avoid issues with borders/shadows.
      const canvas = await html2canvas(printRef.current, {
        scale: 3, // High resolution
        backgroundColor: null,
        useCORS: true
      });

      // 2. Create a new canvas and fill it with a solid white background.
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const ctx = finalCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      ctx.drawImage(canvas, 0, 0);

      // 3. Trigger download from the new canvas.
      const link = document.createElement('a');
      link.download = `mofu-photostrip-${Date.now()}.png`;
      link.href = finalCanvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 pb-8 sm:py-16 md:py-20 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="h-6 md:h-12 w-full" />

        {/* Main Layout Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-16 items-start">
          
          {/* Left Column: Webcam, Controls & Tools */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <WebcamCard 
              webcamRef={webcamRef}
              isCameraOn={isCameraOn}
              setIsCameraOn={setIsCameraOn}
              flash={flash}
              countdown={countdown}
              selectedFilter={selectedFilter}
              images={images}
              timerDuration={timerDuration}
              setTimerDuration={setTimerDuration}
              isCapturing={isCapturing}
            >
              <Controls 
                isCapturing={isCapturing}
                images={images}
                isCameraOn={isCameraOn}
                setIsCameraOn={setIsCameraOn}
                startCapture={startCapture}
                retake={retake}
                downloadStrip={downloadStrip}
              />
            </WebcamCard>

            {/* Tools Section */}
            {!isCapturing && images.length < 4 && (
              <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-xl space-y-8 transition-opacity duration-300">
                <FilterBar 
                  selectedFilter={selectedFilter} 
                  onSelectFilter={setSelectedFilter} 
                />
                <div className="h-px bg-gray-200"></div>
                <TemplatePicker 
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>
            )}
          </div>

          {/* Right Column: PhotoStrip Result */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky top-28">
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse-slow"></div>
                <PhotoStrip 
                  ref={printRef} 
                  images={images} 
                  selectedTemplate={selectedTemplate}
                  selectedFilter={selectedFilter}
                />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PhotoboothPage;