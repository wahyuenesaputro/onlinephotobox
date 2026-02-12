import React, { forwardRef, useState, useEffect } from 'react';
import { Camera, Heart, Sparkles, Star, Smile, Upload, X } from 'lucide-react';
import retroTemplate from '@/assets/image/Purple and White Retro Illustrative Photobooth Template Photostrip (1).png';

const PhotoStrip = forwardRef(({ images, selectedTemplate, selectedFilter }, ref) => {
  const [customSticker, setCustomSticker] = useState(null);
  const [stickerPos, setStickerPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isRetro = selectedTemplate.id === 'retro';
  const photoCount = isRetro ? 3 : 4;

  const handleStickerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomSticker(e.target.result);
        setStickerPos({ x: 0, y: 0 }); // Reset posisi saat upload baru
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - stickerPos.x,
      y: e.clientY - stickerPos.y
    });
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - stickerPos.x,
      y: touch.clientY - stickerPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setStickerPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setStickerPos({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStart]);

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
          <div className={`${isRetro ? 'gap-[2px]' : 'gap-3'} ${selectedTemplate.type}`}>
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

          {/* Custom Uploaded Sticker */}
          {customSticker && (
            <div 
              className="absolute top-1/2 left-1/2 z-30 cursor-move touch-none"
              style={{ transform: `translate(calc(-50% + ${stickerPos.x}px), calc(-50% + ${stickerPos.y}px))` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <img 
                src={customSticker} 
                alt="Custom Sticker" 
                className="w-32 h-32 object-contain drop-shadow-lg pointer-events-none" 
              />
            </div>
          )}

          {/* Branding Footer */}
          {!isRetro && (
            <div className="mt-2 text-center">
              <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Sticker Controls (Outside of ref so it won't be downloaded) */}
        <div className="mt-6 flex justify-center border-t border-gray-100 pt-4">
          {!customSticker ? (
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer text-sm font-medium text-gray-600 transition-colors border border-gray-200">
              <Upload size={16} />
              Upload Sticker
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleStickerUpload} />
            </label>
          ) : (
            <button 
              onClick={() => setCustomSticker(null)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full text-sm font-medium transition-colors"
            >
              <X size={16} />
              Hapus Sticker
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default PhotoStrip;