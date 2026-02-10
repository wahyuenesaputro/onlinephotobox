import React, { forwardRef } from 'react';
import { Camera } from 'lucide-react';

const PhotoStrip = forwardRef(({ images, selectedTemplate, selectedFilter }, ref) => {
  return (
    <div className="flex flex-col items-center animate-in slide-in-from-bottom-10 fade-in duration-700 w-full">
      <div className="bg-white p-6 pb-10 shadow-2xl rounded-3xl transform transition-transform hover:scale-[1.01] duration-300 border border-gray-100 w-full max-w-[320px] mx-auto">
        {/* Strip Container */}
        <div 
          ref={ref} 
          className="bg-white p-4 flex flex-col gap-4 w-full" 
        >
          {/* Header Space (Area kosong untuk header template) */}
          <div className="h-20 w-full" />

          {/* Dynamic Layout Grid */}
          <div className={`gap-3 ${selectedTemplate.type}`}>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="aspect-[3/2] bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 shadow-inner group">
                {images[idx] ? (
                  <img 
                    src={images[idx]} 
                    alt={`pose-${idx}`} 
                    className="w-full h-full object-cover transform scale-x-[-1]"
                    style={{ filter: selectedFilter.style }} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50">
                    <Camera size={24} className="opacity-20" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Branding Footer */}
          <div className="mt-2 text-center">
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PhotoStrip;