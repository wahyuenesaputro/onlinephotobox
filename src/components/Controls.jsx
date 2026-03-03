import React from 'react';
import { Camera, RefreshCw, Download, Video, VideoOff } from 'lucide-react';
import Button from '@/components/ui/Button';

const Controls = ({ isCapturing, images, isCameraOn, setIsCameraOn, startCapture, retake, downloadStrip, maxPhotos = 4 }) => {
  const hasFinished = images.length === maxPhotos;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {!isCapturing && !hasFinished && (
          <button 
            onClick={() => setIsCameraOn(!isCameraOn)}
            className="p-4 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
        )}

        {!isCapturing && !hasFinished && (
          <Button 
            onClick={startCapture} 
            variant="primary" 
            className="!px-12 !py-4 !text-lg shadow-blue-600/30 hover:shadow-blue-600/50 min-w-[200px] !rounded-full"
            disabled={!isCameraOn}
          >
            <Camera size={24} /> Start Photo
          </Button>
        )}
        {hasFinished && (
          <>
            <Button onClick={retake} variant="secondary" className="!px-8 !py-3 !rounded-full">
              <RefreshCw size={20} /> Retake
            </Button>
            <Button onClick={downloadStrip} variant="primary" className="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 !px-8 !py-3 !rounded-full">
              <Download size={20} /> Download Strip
            </Button>
          </>
        )}
      </div>
      
      {!isCapturing && !hasFinished && (
        <p className="text-white/90 text-sm font-medium drop-shadow-md">
          {isCameraOn ? "Ready to capture your glow? " : "Turn on camera to start"}
        </p>
      )}
    </div>
  );
};

export default Controls;
