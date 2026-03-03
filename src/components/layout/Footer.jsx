import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Cat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tighter flex items-center gap-2">
              <Cat className="text-blue-600" size={28} />
              <span>MOFU <span className="text-orange-500">STUDIO</span></span>
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Capture your best moments with our online photobooth. Professional quality photos right from your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors w-fit">Home</Link>
              <Link to="/photobooth" className="text-gray-500 hover:text-blue-600 transition-colors w-fit">Photobooth</Link>
              <Link to="/gallery" className="text-gray-500 hover:text-blue-600 transition-colors w-fit">Gallery</Link>
              <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors w-fit">Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
            <p className="text-gray-500 mb-6">Follow us on social media for more fun photo ideas!</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Mofu Studio. Made with ❤️ for fun photography experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
