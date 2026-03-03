import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cat } from 'lucide-react';
import Button from '@/components/ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Photobooth', path: '/photobooth' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2 tracking-tighter">
          <Cat className="text-blue-600" size={32} />
          <span>MOFU <span className="text-orange-500">STUDIO</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    location.pathname + location.hash === link.path
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/photobooth">
            <Button variant="primary" className="!py-2 !px-6 text-sm">
              Start Photo
            </Button>
          </Link>
        </div>

        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl md:hidden flex flex-col p-6 gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={`text-lg font-medium ${ 
                location.pathname + location.hash === link.path ? 'text-blue-600' : 'text-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/photobooth" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="primary" className="w-full justify-center">
              Start Photo
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
