import React, { forwardRef } from 'react';
import { Camera, Heart, Sparkles, Star, Smile, Cat } from 'lucide-react';
import retroTemplate from '@/assets/image/Purple and White Retro Illustrative Photobooth Template Photostrip (1).png';

const PhotoStrip = forwardRef(({ images, selectedTemplate, selectedFilter, sessionDate, selectedColor = '#ffffff' }, ref) => {
  const isRetro = selectedTemplate.id === 'retro';
  const photoCount = isRetro ? 3 : 4;
  const dateToDisplay = sessionDate || new Date();
  
  // Cek apakah background gelap untuk menyesuaikan warna teks
  const isDarkBg = ['#1f2937', '#000000'].includes(selectedColor);

  return (
    <div className="flex flex-col items-center animate-in slide-in-from-bottom-10 fade-in duration-700 w-full">
      {/* Container dibuat lebih lebar (responsif) untuk layar mobile yang lebih besar */}
      <div className="bg-white p-6 pb-10 shadow-2xl rounded-3xl transform transition-transform hover:scale-[1.01] duration-300 border border-gray-100 w-full max-w-sm mx-auto">
        {/* Strip Container */}
        <div 
          ref={ref} 
          className={`flex flex-col gap-4 w-full relative ${isRetro ? '' : 'p-4'}`}
          style={{
            backgroundColor: selectedColor,
            ...(isRetro ? {
              backgroundImage: `url("${retroTemplate}")`,
              backgroundSize: '100% 100%',
              padding: '135px 30px 120px 30px',
            } : {})
          }}
        >
          {/* Header: Area kosong diganti dengan branding agar lebih menarik */}
          {!isRetro && (
            <div className="pt-4 pb-8 text-center">
              <h2 className={`text-3xl font-bold tracking-tighter leading-none flex items-center justify-center gap-2 ${isDarkBg ? 'text-white' : 'text-gray-800'}`}>
                <Cat className="text-pink-500" size={28} />
                MOFU <span className="text-pink-500">STUDIO</span>
              </h2>
            </div>
          )}
          {/* Dynamic Layout Grid */}
          <div className={`gap-4 ${selectedTemplate.id === 'grid' ? 'grid' : 'flex'} ${selectedTemplate.type}`}>
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
          {/* Decorative Stickers & Date for Retro Theme */}
          {isRetro && (
            <div className="absolute inset-0 pointer-events-none">
              <Heart className="absolute top-[110px] left-3 text-pink-500 fill-pink-200 -rotate-12 drop-shadow-sm z-20" size={32} />
              <Sparkles className="absolute top-[125px] right-3 text-yellow-400 fill-yellow-100 rotate-12 drop-shadow-sm z-20" size={28} />
              <Star className="absolute bottom-[100px] left-3 text-blue-400 fill-blue-100 rotate-45 drop-shadow-sm z-20" size={24} />
              <Smile className="absolute bottom-[110px] right-4 text-purple-500 fill-purple-200 -rotate-12 drop-shadow-sm z-20" size={30} />
              {/* Tanggal ditambahkan untuk konsistensi */}
              <div className="absolute bottom-[45px] left-0 right-0 text-center">
                <p className="font-mono text-white/80 text-xs tracking-widest">
                  {dateToDisplay.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
              </div>
            </div>
          )}
          {/* Footer untuk template standar */}
          {!isRetro && (
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                {dateToDisplay.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PhotoStrip;