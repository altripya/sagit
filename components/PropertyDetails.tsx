
import React from 'react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  onContact: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack, onContact }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-amber-600 mb-8 transition-colors font-bold"
      >
        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        חזרה לכל הנכסים
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-6 right-6">
            <span className="bg-amber-600 text-white font-bold px-6 py-2 rounded-full shadow-lg text-sm">
              {property.type === 'Apartment' ? 'דירה' : 
               property.type === 'Villa' ? 'וילה' : 
               property.type === 'Penthouse' ? 'פנטהאוז' : 'בית פרטי'}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">{property.title}</h1>
          <p className="text-2xl text-slate-500 mb-8 flex items-center">
            <svg className="w-6 h-6 ml-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {property.location}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">חדרים</p>
              <p className="text-2xl font-black text-slate-900">{property.bedrooms}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">שטח</p>
              <p className="text-2xl font-black text-slate-900">{property.area} <span className="text-sm">מ"ר</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">רחצה</p>
              <p className="text-2xl font-black text-slate-900">{property.bathrooms}</p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 mb-4">על הנכס</h3>
            <p className="text-slate-600 leading-relaxed text-lg">{property.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-gray-100">
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-1">מחיר מבוקש</p>
              <p className="text-4xl font-black text-amber-600">₪{property.price.toLocaleString()}</p>
            </div>
            <button 
              onClick={onContact}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl"
            >
              תיאום פגישה בנכס
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
