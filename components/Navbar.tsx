
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-500 ${
              scrolled ? 'border-amber-600' : 'border-white/20'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                className="w-full h-full object-cover" 
                alt="Logo" 
              />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}>
              שגית פלק & קנזי <span className="text-amber-600">|</span> נדל"ן
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
