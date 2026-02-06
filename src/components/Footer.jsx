import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mofu Studio</h3>
            <p>Capture your best moments with our online photobooth. Professional quality photos right from your browser.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#photobooth">Photobooth</a>
              <a href="#about">About</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <p>Follow us on social media for more fun photo ideas!</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Mofu Studio. Made with ❤️ for fun photography experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;