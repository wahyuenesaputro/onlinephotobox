// src/App.jsx
import { useState } from 'react'
import './App.css'
import WebcamCapture from './components/WebcamCapture.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [showCamera, setShowCamera] = useState(false)

  return (
    <div className="app-container">
      <h1>MOFU PHOTOBOX</h1>
      <p className="subtitle">Tangkap momen serumu, 4 pose sekaligus!</p>
      
      {!showCamera ? (
        <div className="dashboard-card">
          <div className="icon-container">✨📸✨</div>
          <h2>Selamat Datang!</h2>
          <p>
            Siapkan pose terbaikmu! Kita akan mengambil <strong>4 foto</strong> secara otomatis
            dengan jeda waktu. Hasilnya bisa langsung di-download loh!
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => setShowCamera(true)}>
            Mulai Photobooth 🚀
          </button>
        </div>
      ) : (
        <>
          <div style={{ width: '100%', maxWidth: '600px', marginBottom: '20px', display: 'flex' }}>
            <button className="btn btn-secondary" onClick={() => setShowCamera(false)}>
              &larr; Kembali
            </button>
          </div>
          <WebcamCapture />
        </>
      )}

      <Footer />
    </div>
  )
}

export default App