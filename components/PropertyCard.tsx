
import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  const currentImg = property.images[currentImageIndex];

  return (
    <div 
      onClick={() => onClick?.(property)}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 group cursor-pointer"
    >
      <div 
        className="relative h-72 overflow-hidden bg-slate-100" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* רקע מטושטש בזמן ריחוף למניעת שטחים מתים כשהתמונה במצב contain */}
        {isHovered && !property.videoUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-30 transition-opacity duration-500"
            style={{ backgroundImage: `url(${currentImg})` }}
          />
        )}

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
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  } ${isHovered && !property.videoUrl ? 'object-contain p-2' : 'object-cover'}`}
                />
              ))
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                אין תמונה
              </div>
            )}
          </div>
        )}
        
        {/* שכבת הצללה דקורטיבית - מוסתרת בריחוף כדי לראות את כל התמונה בבירור */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-40'}`}></div>

        {/* תגיות עליונות */}
        <div className="absolute top-5 right-5 z-10 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-xl border border-white/20">
            {getTypeLabel(property.type)}
          </span>
        </div>

        {/* חיווי תצוגה מלאה בריחוף */}
        {isHovered && !property.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 animate-pulse">
              תצוגה מלאה
            </div>
          </div>
        )}

        {/* אינדיקטורים של הגלריה */}
        {property.images && property.images.length > 1 && (
          <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
            <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              {isHovered && !property.videoUrl ? `${currentImageIndex + 1} / ${property.images.length}` : `${property.images.length} תמונות`}
            </span>
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
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-2">
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
