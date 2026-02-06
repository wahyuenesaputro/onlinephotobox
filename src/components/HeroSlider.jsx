import { useState, useEffect } from 'react';
import { Github, Instagram, Video, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    text: "Capture Your Glow ✨",
    subtext: "Studio quality photos right from your browser. No app needed.",
    backgroundImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    text: "Korean Aesthetic 📸",
    subtext: "Experience the viral Seoul photobooth style instantly.",
    backgroundImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    text: "Share the Vibe 🚀",
    subtext: "Grab your besties, strike a pose, and go viral!",
    backgroundImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

const socialLinks = [
  { id: 1, icon: <Github size={20} />, url: "https://github.com/wahyuenesaputro", label: "Github" },
  { id: 2, icon: <Video size={20} />, url: "https://tiktok.com/@usertiktokmu", label: "TikTok" },
  { id: 3, icon: <Instagram size={20} />, url: "https://instagram.com/userigmu", label: "Instagram" }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <header className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="slide-overlay">
            <div className="slide-content">
              <h1 className="slide-title">
                {slide.text}
              </h1>
              <p className="slide-subtitle">
                {slide.subtext}
              </p>

              <a
                href="#photobooth"
                className="cta-button"
              >
                Start Photo <ArrowRight size={20} />
              </a>

              <div className="social-bar">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </header>
  );
};

export default HeroSlider;
