// src/App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import WebcamCapture from './components/WebcamCapture.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const [showCamera, setShowCamera] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data Slider
  const slides = [
    {
      id: 1,
      text: "Capture Your Best Moment ✨",
      subtext: "Create memories that last forever with our aesthetic filters.",
      color: "#ff9a9e" // Pastel Pink
    },
    {
      id: 2,
      text: "Korean Style Photobooth 📸",
      subtext: "Cute frames and layouts just like in Seoul.",
      color: "#a18cd1" // Pastel Purple
    },
    {
      id: 3,
      text: "Fun with Besties 👯‍♀️",
      subtext: "Grab your friends and strike a pose!",
      color: "#84fab0" // Pastel Green
    }
  ];

  // Auto Slide Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="app-container">
      <Navbar />
      
      {/* HERO SLIDER SECTION */}
      <header className="hero-slider" id="home">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: `linear-gradient(120deg, ${slide.color} 0%, #fbc2eb 100%)` }}
          >
            <div className="slide-content">
              <h1>{slide.text}</h1>
              <p>{slide.subtext}</p>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></span>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <section className="photobooth-section">
          <div className="section-header">
            <h2>Let's Take a Photo!</h2>
            <p>Ready to shine? Click the button below to start.</p>
          </div>

          <div className="photobooth-area">
            {!showCamera ? (
              <div className="start-card">
                <div className="icon-wrapper">📸</div>
                <h3>Ready?</h3>
                <p>Siapkan pose terbaikmu! 4 kali jepretan otomatis.</p>
                <button className="btn btn-primary btn-lg" onClick={() => setShowCamera(true)}>
                  Open Camera 🚀
                </button>
              </div>
            ) : (
              <div className="camera-wrapper-container">
                <div className="camera-header">
                  <button className="btn btn-outline" onClick={() => setShowCamera(false)}>
              &larr; Kembali
            </button>
          </div>
          <WebcamCapture />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App