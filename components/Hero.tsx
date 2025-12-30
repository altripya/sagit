
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          alt="Luxury Interior"
        />
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-right w-full">
        <div className="max-w-3xl mr-0 ml-auto space-y-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-4 animate-fade-in-down">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase">שירות אקסקלוסיבי ללקוחות פרימיום</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight animate-fade-in-up">
            הבית הבא שלכם <br /> 
            <span className="text-amber-500">מתחיל כאן.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-80 leading-relaxed font-light max-w-2xl mr-0 ml-auto animate-fade-in-up delay-150">
            שגית פלק, מומחית בנדל"ן יוקרה והשקעות אסטרטגיות, מזמינה אתכם למסע אישי ומקצועי למציאת הנכס המושלם שמתאים בדיוק לחזון שלכם.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-start animate-fade-in-up delay-300">
            <a href="#properties" className="bg-amber-600 hover:bg-amber-500 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all text-center shadow-[0_20px_40px_-10px_rgba(217,119,6,0.3)] hover:-translate-y-1 active:scale-95">
              לצפייה בנכסים
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all text-center hover:-translate-y-1 active:scale-95">
              תיאום פגישת ייעוץ
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 animate-bounce">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white" style={{ writingMode: 'vertical-rl' }}>גלול למטה</span>
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />
    </div>
  );
};

export default Hero;
