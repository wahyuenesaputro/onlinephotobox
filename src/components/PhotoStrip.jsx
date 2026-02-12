import React, { forwardRef } from 'react';
import { Camera, Heart, Sparkles, Star, Smile } from 'lucide-react';
import retroTemplate from '@/assets/image/Purple and White Retro Illustrative Photobooth Template Photostrip (1).png';

const PhotoStrip = forwardRef(({ images, selectedTemplate, selectedFilter }, ref) => {
  const isRetro = selectedTemplate.id === 'retro';
  const photoCount = isRetro ? 3 : 4;

  return (
    <div className="flex flex-col items-center animate-in slide-in-from-bottom-10 fade-in duration-700 w-full">
      <div className="bg-white p-6 pb-10 shadow-2xl rounded-3xl transform transition-transform hover:scale-[1.01] duration-300 border border-gray-100 w-full max-w-[320px] mx-auto">
        {/* Strip Container */}
        <div 
          ref={ref} 
          className={`bg-white flex flex-col gap-4 w-full relative ${isRetro ? '' : 'p-4'}`}
          style={isRetro ? {
            backgroundImage: `url("${retroTemplate}")`,
            backgroundSize: '100% 100%',
            padding: '135px 30px 120px 30px',
          } : {}}
        >
          {/* Header Space (Area kosong untuk header template) */}
          {!isRetro && <div className="h-20 w-full" />}

          {/* Dynamic Layout Grid */}
          <div className={`${isRetro ? 'gap-4' : 'gap-4'} ${selectedTemplate.type}`}>
            {[...Array(photoCount)].map((_, idx) => (
              <div key={idx} className={`aspect-[3/2] bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100 shadow-inner group ${isRetro ? '!rounded-sm !border-0' : ''}`}>
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

          {/* Decorative Stickers for Retro Theme */}
          {isRetro && (
            <div className="absolute inset-0 pointer-events-none">
              <Heart className="absolute top-[110px] left-3 text-pink-500 fill-pink-200 -rotate-12 drop-shadow-sm z-20" size={32} />
              <Sparkles className="absolute top-[125px] right-3 text-yellow-400 fill-yellow-100 rotate-12 drop-shadow-sm z-20" size={28} />
              <Star className="absolute bottom-[100px] left-3 text-blue-400 fill-blue-100 rotate-45 drop-shadow-sm z-20" size={24} />
              <Smile className="absolute bottom-[110px] right-4 text-purple-500 fill-purple-200 -rotate-12 drop-shadow-sm z-20" size={30} />
            </div>
          )}

          {/* Branding Footer */}
          {!isRetro && (
            <div className="mt-2 text-center">
              <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PhotoStrip;