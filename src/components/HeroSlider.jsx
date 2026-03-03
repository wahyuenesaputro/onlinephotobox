import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Instagram, Github } from 'lucide-react';
import Button from '@/components/ui/Button';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Capture Your Glow",
    subtitle: "Studio quality photos right from your browser. No app needed."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Korean Aesthetic",
    subtitle: "Experience the viral Seoul photobooth style instantly."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Share the Vibe",
    subtitle: "Grab your besties, strike a pose, and go viral!"
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow" 
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      ))}

      <div className="relative z-10 max-w-4xl w-full mx-4">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl text-center transform transition-all hover:scale-[1.01] duration-500">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 backdrop-blur-md">
            <Camera className="text-white w-8 h-8" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {slides[current].title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/photobooth">
              <Button variant="primary" className="!text-lg !px-10 !py-4 shadow-xl shadow-blue-600/20">
                Start Photo <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/#gallery">
              <Button variant="outline" className="!text-lg !px-10 !py-4">
                View Gallery
              </Button>
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex justify-center gap-6">
            <a href="https://www.instagram.com/wahyunesa_/" className="text-white/70 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="https://github.com/wahyuenesaputro" className="text-white/70 hover:text-white transition-colors"><Github size={24} /></a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-blue-600 w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
