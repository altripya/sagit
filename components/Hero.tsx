
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover"
          alt="Luxury Interior"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-right w-full">
        <div className="max-w-2xl mr-0 ml-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            הבית הבא שלכם <br /> מתחיל כאן.
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed font-light">
            שגית פלק, מומחית בנדל"ן יוקרה והשקעות, מזמינה אתכם לחוויית שירות אישית, מקצועית ובלתי מתפשרת בדרך אל הנכס המושלם.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <a href="#properties" className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all text-center">
              לצפייה בנכסים
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg transition-all text-center">
              תיאום פגישת ייעוץ
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg className="w-8 h-8 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
