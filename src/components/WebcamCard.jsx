import React from 'react';
import Webcam from 'react-webcam';
import { VideoOff, Camera } from 'lucide-react';

const WebcamCard = ({ webcamRef, isCameraOn, setIsCameraOn, flash, countdown, selectedFilter, children, images }) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const hasFinished = images.length === 4;

  return (
    <div className="relative w-full aspect-[3/4] md:aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 group">
      {/* Label Live Camera */}
      {!hasFinished && isCameraOn && (
        <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          LIVE
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
          <p className="font-semibold text-xl text-white">Session Complete! ✨</p>
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