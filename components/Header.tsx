import React from 'react';
import ImageIcon from './icons/ImageIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex items-center gap-4">
        <ImageIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          Storyboard AI Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
