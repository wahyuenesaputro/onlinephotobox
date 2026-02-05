import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          MOFU <span>STUDIO</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#price">Price</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;