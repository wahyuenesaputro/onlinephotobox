// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from '@/components/Footer.jsx'
import Navbar from '@/components/Navbar.jsx'
import PhotoboothPage from '@/features/photobooth/pages/PhotoboothPage.jsx'
import HeroSlider from '@/components/HeroSlider.jsx'
import Gallery from '@/components/Gallery.jsx'
import Contact from '@/components/Contact.jsx'

// A simple wrapper for the home page sections
const HomePage = () => (
  <>
    <HeroSlider />
    <Gallery />
    <Contact />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Poppins'] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photobooth" element={<PhotoboothPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
