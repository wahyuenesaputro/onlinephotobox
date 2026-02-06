import { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Instagram, Video, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    text: "Capture Your Glow ✨",
    subtext: "Studio quality photos right from your browser. No app needed.",
    gradient: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", // Clean White-Grey (Mahal)
    textColor: "#333"
  },
  {
    id: 2,
    text: "Korean Aesthetic 📸",
    subtext: "Experience the viral Seoul photobooth style instantly.",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", // Purple-Pink (K-Pop Vibe)
    textColor: "#fff"
  },
  {
    id: 3,
    text: "Share the Vibe 🚀",
    subtext: "Grab your besties, strike a pose, and go viral!",
    gradient: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)", // Fresh Blue-Green
    textColor: "#fff"
  }
];

const socialLinks = [
  { id: 1, icon: <Github size={20} />, url: "https://github.com/wahyuenesaputro", label: "Github" },
  { id: 2, icon: <Video size={20} />, url: "https://tiktok.com/@usertiktokmu", label: "TikTok" }, 
  { id: 3, icon: <Instagram size={20} />, url: "https://instagram.com/userigmu", label: "Instagram" } 
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);

  // State untuk drag/swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const goToSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
    if (trackRef.current) {
      // Add transition for smooth snapping
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto Slide Logic
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startAutoSlide = useCallback(() => {
    stopAutoSlide(); // Hentikan interval sebelumnya jika ada
    intervalRef.current = setInterval(nextSlide, 5000); // 5 Detik biar bacanya enak
  }, [nextSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide(); // Cleanup saat komponen di-unmount
  }, [startAutoSlide]);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Event Handlers untuk Drag/Swipe
  const handleDragStart = (e) => {
    // Prevent dragging when clicking on links or buttons inside the slider
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

    stopAutoSlide();
    setIsDragging(true);
    if (trackRef.current) {
      trackRef.current.style.transition = 'none'; // Disable transition while dragging
    }
    const currentX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
    setStartX(currentX);
    setDragDistance(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault(); // Mencegah scroll halaman di mobile
    const currentX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
    setDragDistance(currentX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = slideWidth / 4; // Jarak minimal untuk ganti slide (1/4 lebar slider)

    if (dragDistance > threshold) {
      prevSlide();
    } else if (dragDistance < -threshold) {
      nextSlide();
    } else {
      // Snap back to current slide if not dragged far enough
      goToSlide(currentSlide);
    }

    setDragDistance(0); // Reset drag distance
    startAutoSlide(); // Mulai lagi auto-slide
  };

  const getTransformX = () => {
    const baseTranslate = -currentSlide * slideWidth;
    return `translateX(${baseTranslate + dragDistance}px)`;
  };

  return (
    <header 
      className="hero-slider"
      ref={sliderRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} // Jika mouse keluar area, batalkan drag
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div 
        className="slides-track"
        ref={trackRef}
        style={{ 
          transform: getTransformX(),
          width: `${slides.length * 100}%`
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slide"
            style={{ background: slide.gradient }}
          >
            <div className="glass-container">
              <h1 style={{ color: slide.textColor }} className="slide-title">
                {slide.text}
              </h1>
              <p style={{ color: slide.textColor }} className="slide-subtitle">
                {slide.subtext}
              </p>
              
              <a href="#photobooth-section" className="cta-button">
                Start Photo <ArrowRight size={18} />
              </a>
              
              {/* Social Media Bar di dalam Slide */}
              <div className="social-bar">
                {socialLinks.map((social) => (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ color: slide.textColor, borderColor: slide.textColor }}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => {
              stopAutoSlide();
              goToSlide(idx);
              startAutoSlide();
            }}
          ></span>
        ))}
      </div>
    </header>
  );
};

export default HeroSlider;