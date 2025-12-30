
import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // לוגיקה להחלפת תמונות אוטומטית ב-Hover כל 2 שניות
  useEffect(() => {
    let interval: number | undefined;

    if (isHovered && !property.videoUrl && property.images && property.images.length > 1) {
      interval = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, property.images, property.videoUrl]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (property.videoUrl) {
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
    setCurrentImageIndex(0);
  };

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

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 group">
      <div 
        className="relative h-72 overflow-hidden cursor-pointer bg-slate-900" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* תצוגת וידאו או גלריית תמונות */}
        {isPlaying && property.videoUrl ? (
          <video 
            src={property.videoUrl} 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative">
            {property.images && property.images.length > 0 ? (
              property.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${property.title} - ${index}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  } ${isHovered && !property.videoUrl ? 'scale-105' : 'scale-100'}`}
                />
              ))
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                אין תמונה
              </div>
            )}
          </div>
        )}
        
        {/* שכבת הצללה דקורטיבית */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

        {/* תגיות עליונות */}
        <div className="absolute top-5 right-5 z-10 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-xl border border-white/20">
            {getTypeLabel(property.type)}
          </span>
          {property.videoUrl && (
            <span className="bg-amber-600 text-white p-2 rounded-full shadow-lg self-end animate-pulse">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </span>
          )}
        </div>

        {/* אינדיקטורים של הגלריה - פסי התקדמות */}
        {property.images && property.images.length > 1 && (
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
            <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isHovered && !property.videoUrl ? `${currentImageIndex + 1} / ${property.images.length}` : `${property.images.length} תמונות`}
            </span>
            
            <div className="flex gap-1.5 px-0.5">
              {property.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-500 shadow-sm ${
                    idx === currentImageIndex ? 'bg-amber-500 w-5' : 'bg-white/40 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {property.featured && (
          <div className="absolute bottom-5 left-5 z-10">
            <span className="bg-amber-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-2xl border border-amber-500/50">
              בלעדי
            </span>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
          {property.title}
        </h3>
        <p className="text-slate-500 mb-6 flex items-center text-sm font-medium">
          <svg className="w-4 h-4 ml-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex justify-between items-center border-t border-gray-50 pt-6 mt-2">
          <div className="flex items-center space-x-reverse space-x-5 text-xs font-bold text-slate-400">
            {property.type !== 'Plot' && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-900 text-sm">{property.bedrooms}</span> 
                <span>חד'</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-900 text-sm">{property.area}</span> 
              <span>מ"ר</span>
            </div>
          </div>
          <div className="text-amber-600 font-black text-2xl tracking-tight">
            ₪{property.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
