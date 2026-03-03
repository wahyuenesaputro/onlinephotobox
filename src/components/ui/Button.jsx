import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "rounded-full px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30 border border-transparent",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:border-blue-300 hover:text-blue-600",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10",
    ghost: "bg-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
