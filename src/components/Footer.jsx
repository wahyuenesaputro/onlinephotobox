// c:\laragon\www\mofu_onlinephotobox\src\components\Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{ backdropFilter: 'blur(5px)', padding: '20px' }}>
      <p style={{ margin: 0 }}>
        © 2026 <strong>Mofu Studio Project</strong>
      </p>
      <p style={{ margin: '5px 0 0', fontSize: '0.9em', opacity: 0.8 }}>
        Made with ❤️ by{' '}
        <a 
          href="https://github.com/wahyuenesaputro" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#ff0055', textDecoration: 'none', fontWeight: '600', transition: 'color 0.3s' }}
          onMouseOver={(e) => e.target.style.color = '#ffcc00'}
          onMouseOut={(e) => e.target.style.color = '#ff0055'}
        >
          Wahyu Enesa Putro
        </a>
      </p>
    </footer>
  );
};

export default Footer;