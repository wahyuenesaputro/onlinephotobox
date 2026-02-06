// src/App.jsx
import { useState } from 'react'
import './App.css'
import WebcamCapture from './components/WebcamCapture.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSlider from './components/HeroSlider.jsx'

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
      <HeroSlider />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="container">
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
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App