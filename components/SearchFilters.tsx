
import React from 'react';
import { PropertyFilters } from '../types';

interface SearchFiltersProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: name === 'minPrice' || name === 'maxPrice' || name === 'minRooms' ? Number(value) : value
    });
  };

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      minPrice: 0,
      maxPrice: 50000000,
      minRooms: 0,
      propertyType: 'All'
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        {/* Search Query */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">חיפוש חופשי</label>
          <div className="relative">
            <input
              type="text"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleChange}
              placeholder="עיר, שכונה או פרויקט..."
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">סוג נכס</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all appearance-none"
          >
            <option value="All">הכל</option>
            <option value="Apartment">דירה</option>
            <option value="House">בית פרטי</option>
            <option value="Villa">וילה</option>
            <option value="Penthouse">פנטהאוז</option>
            <option value="Plot">מגרש</option>
          </select>
        </div>

        {/* Min Rooms */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">מינימום חדרים</label>
          <select
            name="minRooms"
            value={filters.minRooms}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all appearance-none"
          >
            <option value="0">כלשהו</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">מחיר מ-</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice || ''}
              onChange={handleChange}
              placeholder="₪"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">עד-</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleChange}
              placeholder="₪"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 transition-all"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={resetFilters}
            className="text-amber-600 font-bold text-sm flex items-center hover:bg-amber-50 px-4 py-3 rounded-xl transition-all"
          >
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            איפוס סינון
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchFilters;
