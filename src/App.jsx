// src/App.jsx
import { useState } from 'react'
import './App.css'
import WebcamCapture from './components/WebcamCapture.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [showCamera, setShowCamera] = useState(false)
  const [template, setTemplate] = useState('template-1');

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
          <div className="template-selector">
            <button className={template === 'template-1' ? 'active' : ''} onClick={() => setTemplate('template-1')}>
              Polos
            </button>
            <button className={template === 'template-2' ? 'active' : ''} onClick={() => setTemplate('template-2')}>
              Love
            </button>
            <button className={template === 'template-3' ? 'active' : ''} onClick={() => setTemplate('template-3')}>
              Vintage
            </button>
          </div>
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
          <WebcamCapture template={template} />
        </>
      )}

      <Footer />
    </div>
  )
}

export default App