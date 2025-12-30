
import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyDetailsModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullViewManual, setIsFullViewManual] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const getTypeLabel = (type: Property['type']) => {
    switch(type) {
      case 'Apartment': return 'דירה';
      case 'Villa': return 'וילה';
      case 'Penthouse': return 'פנטהאוז';
      case 'House': return 'בית פרטי';
      case 'Plot': return 'מגרש';
      default: return 'נכס';
    }
  };

  const currentImg = property.images[activeImage];
  // התמונה תוצג במלואה אם המשתמש לחץ על הכפתור או אם הוא פשוט עומד עם העכבר על התמונה
  const showFullImage = isFullViewManual || isHoveringImage;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl relative animate-scale-up border border-white/10">
        
        {/* Close Button - Updated to be Black on White for maximum visibility */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 z-30 p-3 bg-white hover:bg-gray-100 text-slate-900 rounded-full transition-all shadow-xl border border-gray-200"
          title="סגור"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Gallery Section */}
            <div 
              className="relative bg-slate-900 h-[400px] lg:min-h-[600px] flex items-center justify-center overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
            >
              {/* Blurred background when showing full image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center blur-2xl scale-110 opacity-40 transition-opacity duration-700 ${showFullImage ? 'opacity-40 visible' : 'opacity-0 invisible'}`}
                style={{ backgroundImage: `url(${currentImg})` }}
              />

              <img 
                src={currentImg} 
                alt={property.title}
                className={`w-full h-full transition-all duration-700 relative z-10 ${showFullImage ? 'object-contain p-6 lg:p-12' : 'object-cover'}`}
              />
              
              {/* Tooltip on Hover */}
              {isHoveringImage && !isFullViewManual && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold border border-white/20 animate-pulse">
                    תצוגה מלאה
                  </div>
                </div>
              )}

              {/* Toggle View Button (Manual override) */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullViewManual(!isFullViewManual);
                }}
                className="absolute bottom-10 right-10 z-20 bg-white/90 backdrop-blur-md text-slate-900 p-3 rounded-2xl shadow-2xl border border-white/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 font-bold text-xs"
              >
                {isFullViewManual ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    חזור למילוי
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    קבע תצוגה מלאה
                  </>
                )}
              </button>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="absolute bottom-6 left-6 right-auto flex gap-3 overflow-x-auto p-2 no-scrollbar z-20 max-w-[70%]">
                  {property.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(idx);
                      }}
                      className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx ? 'border-amber-500 scale-105 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 text-right flex flex-col bg-white">
              <div className="mb-8">
                <span className="inline-block bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  {getTypeLabel(property.type)}
                </span>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">{property.title}</h2>
                <p className="text-slate-500 flex items-center gap-2 text-lg">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.location}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">שטח</div>
                  <div className="text-slate-900 font-black text-lg">{property.area} מ"ר</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">חדרים</div>
                  <div className="text-slate-900 font-black text-lg">{property.bedrooms}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <div className="text-slate-400 text-[10px] font-bold uppercase mb-1">מקלחות</div>
                  <div className="text-slate-900 font-black text-lg">{property.bathrooms}</div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-10">
                <div className="text-slate-400 text-sm font-bold mb-1">מחיר מבוקש</div>
                <div className="text-4xl font-black text-amber-600">₪{property.price.toLocaleString()}</div>
              </div>

              {/* Description */}
              <div className="mb-12 flex-1">
                <h4 className="text-slate-900 font-bold mb-4 text-lg border-b border-gray-100 pb-2">על הנכס</h4>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                  {property.description || 'אין תיאור זמין עבור נכס זה.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/972548188436?text=היי שגית וקנזי, אשמח לקבל פרטים נוספים על הנכס: ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-center hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  לשיחה בווצאפ
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.222-4.032c1.53.939 3.274 1.435 5.054 1.437 5.408 0 9.809-4.404 9.811-9.812 0-2.623-1.02-5.088-2.871-6.94-1.851-1.852-4.319-2.872-6.94-2.873-5.41 0-9.811 4.403-9.813 9.812 0 2.028.621 3.911 1.796 5.466l-1.12 4.086 4.183-1.096z" /></svg>
                </a>
                <a 
                  href="tel:0548188436"
                  className="flex-1 bg-amber-600 text-white py-5 rounded-2xl font-black text-center hover:bg-amber-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  054-8188436
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default PropertyDetailsModal;
