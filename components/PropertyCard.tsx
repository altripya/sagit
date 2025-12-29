
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {property.type === 'Apartment' ? 'דירה' : 
             property.type === 'Villa' ? 'וילה' : 
             property.type === 'Penthouse' ? 'פנטהאוז' : 'בית פרטי'}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-slate-900 font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">צפייה בפרטים</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{property.title}</h3>
        <p className="text-slate-500 mb-4 flex items-center">
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
          <div className="flex space-x-reverse space-x-4 text-sm text-slate-600">
            <div className="flex items-center">
              <span className="font-bold ml-1">{property.bedrooms}</span> חד'
            </div>
            <div className="flex items-center">
              <span className="font-bold ml-1">{property.area}</span> מ"ר
            </div>
          </div>
          <div className="text-amber-600 font-black text-lg">
            ₪{property.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
