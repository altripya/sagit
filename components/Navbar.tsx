
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              שגית פלק <span className="text-amber-600">|</span> נדל"ן
            </span>
          </div>
          
          <div className="hidden md:flex space-x-reverse space-x-8 font-medium text-slate-600">
            <a href="#home" className="hover:text-amber-600 transition-colors">דף הבית</a>
            <a href="#properties" className="hover:text-amber-600 transition-colors">נכסים</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">אודות</a>
            <a href="#contact" className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-all">צור קשר</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          <a href="#home" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>דף הבית</a>
          <a href="#properties" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>נכסים</a>
          <a href="#about" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>אודות</a>
          <a href="#contact" className="block bg-slate-900 text-white text-center py-3 rounded-xl" onClick={() => setIsOpen(false)}>צור קשר</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
