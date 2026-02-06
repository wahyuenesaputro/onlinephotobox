import HeroSlider from '../components/HeroSlider.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

const HomePage = () => {
  return (
    <div className="app-container">
      <Navbar />
      <HeroSlider />
      <Footer />
    </div>
  )
}

export default HomePage
