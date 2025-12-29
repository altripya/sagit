
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
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
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black px-4 py-2 rounded-full uppercase shadow-lg border border-white/20">
            {getTypeLabel(property.type)}
          </span>
        </div>
        {property.featured && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
              מומלץ
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{property.title}</h3>
        <p className="text-slate-500 mb-6 flex items-center text-sm">
          <svg className="w-4 h-4 ml-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex justify-between items-center border-t border-gray-50 pt-6 mt-2">
          <div className="flex items-center space-x-reverse space-x-4 text-xs font-bold text-slate-400">
            {property.type !== 'Plot' && (
              <div className="flex items-center">
                <span className="text-slate-900 ml-1">{property.bedrooms}</span> חד'
              </div>
            )}
            <div className="flex items-center">
              <span className="text-slate-900 ml-1">{property.area}</span> מ"ר
            </div>
          </div>
          <div className="text-amber-600 font-black text-xl">
            ₪{property.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
