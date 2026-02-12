import React from 'react';
import Webcam from 'react-webcam';
import { VideoOff, Camera, Timer } from 'lucide-react';

const WebcamCard = ({ webcamRef, isCameraOn, setIsCameraOn, flash, countdown, selectedFilter, children, images, timerDuration, setTimerDuration, isCapturing, maxPhotos = 4 }) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const hasFinished = images.length === maxPhotos;

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 group">
      {/* Label Live Camera */}
      {!hasFinished && isCameraOn && (
        <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </div>
      )}

      {/* Timer Settings (Top Right) */}
      {!hasFinished && isCameraOn && !isCapturing && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 flex gap-1 shadow-lg">
             <div className="px-2 flex items-center text-white/80">
                <Timer size={14} />
             </div>
             {[3, 5, 7, 10].map((t) => (
               <button
                 key={t}
                 onClick={() => setTimerDuration(t)}
                 className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
                   timerDuration === t 
                     ? 'bg-white text-black shadow-sm scale-105' 
                     : 'text-white/70 hover:text-white hover:bg-white/10'
                 }`}
               >
                 {t}
               </button>
             ))}
           </div>
        </div>
      )}

      {/* Flash Effect */}
      <div className={`absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-150 ${flash ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <span className="text-9xl font-black text-white drop-shadow-2xl animate-bounce scale-150">
            {countdown}
          </span>
        </div>
      )}

      {/* Webcam / Placeholder */}
      {hasFinished ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/50 gap-2 bg-gray-800">
          <p className="font-semibold text-xl text-white">Session Complete! </p>
          <p>Check your photostrip preview.</p>
        </div>
      ) : isCameraOn ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover transform scale-x-[-1] transition-all duration-500" // Mirror effect
            style={{ filter: selectedFilter.style }}
            onUserMediaError={() => setIsCameraOn(false)}
          />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-white/50 gap-4 bg-gray-800">
          <VideoOff size={48} />
          <p className="font-medium">Camera is turned off</p>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 w-full z-40 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 flex flex-col justify-end items-center">
        {children}
      </div>
    </div>
  );
};

export default WebcamCard;