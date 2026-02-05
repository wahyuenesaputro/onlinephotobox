// src/App.jsx
import './App.css'
import WebcamCapture from './components/WebcamCapture'

function App() {
  return (
    <div className="app-container">
      <h1>MOFU PHOTOBOX</h1>
      <p className="subtitle">Tangkap momen serumu, 4 pose sekaligus!</p>
      
      <WebcamCapture />

      <footer style={{ marginTop: '50px', fontSize: '12px', opacity: 0.5 }}>
        © 2026 Mofu Studio Project
      </footer>
    </div>
  )
}

export default App