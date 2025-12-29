
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AiAssistant from './components/AiAssistant';
import SearchFilters from './components/SearchFilters';
import { MOCK_PROPERTIES } from './constants';
import { PropertyFilters } from './types';

const App: React.FC = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    searchQuery: '',
    minPrice: 0,
    maxPrice: 50000000,
    minRooms: 0,
    propertyType: 'All'
  });

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(prop => {
      const matchesSearch = prop.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                            prop.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesType = filters.propertyType === 'All' || prop.type === filters.propertyType;
      const matchesRooms = prop.bedrooms >= filters.minRooms;
      const matchesMinPrice = prop.price >= (filters.minPrice || 0);
      const matchesMaxPrice = prop.price <= (filters.maxPrice || Infinity);

      return matchesSearch && matchesType && matchesRooms && matchesMinPrice && matchesMaxPrice;
    });
  }, [filters]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />

        {/* Properties & AI Section */}
        <section id="properties" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Listings */}
              <div className="lg:w-2/3">
                <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">נכסים נבחרים</h2>
                    <p className="text-slate-600 max-w-lg">גלו את מבחר הדירות והבתים היוקרתיים ביותר באזורי הביקוש בישראל.</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-medium text-slate-600">
                    נמצאו <span className="text-amber-600 font-bold">{filteredProperties.length}</span> נכסים
                  </div>
                </div>

                {/* Advanced Filters */}
                <SearchFilters filters={filters} onFilterChange={setFilters} />

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProperties.map(prop => (
                      <PropertyCard key={prop.id} property={prop} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">לא נמצאו נכסים תואמים</h3>
                    <p className="text-slate-500">נסו לשנות את פילטר החיפוש או לאפס את הסינונים</p>
                    <button 
                      onClick={() => setFilters({
                        searchQuery: '',
                        minPrice: 0,
                        maxPrice: 50000000,
                        minRooms: 0,
                        propertyType: 'All'
                      })}
                      className="mt-6 text-amber-600 font-bold hover:underline"
                    >
                      איפוס כל הסינונים
                    </button>
                  </div>
                )}
              </div>

              {/* AI Assistant Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <AiAssistant />
                  
                  <div className="mt-8 bg-amber-50 rounded-3xl p-8 border border-amber-100">
                    <h4 className="text-amber-900 font-bold mb-3">צריכים עזרה אישית?</h4>
                    <p className="text-amber-800 text-sm mb-6 leading-relaxed">שגית פלק זמינה לייעוץ טלפוני אישי לכל שאלה בנושא השקעות נדל"ן או מציאת נכס.</p>
                    <a href="tel:0500000000" className="flex items-center text-amber-900 font-bold group">
                      <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center ml-3 group-hover:bg-amber-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      050-XXXXXXX
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://api.a0.dev/assets/image?debug=true&aspect_ratio=4:5&prompt=professional%20photo%20of%20a%20successful%20female%20real%20estate%20agent%20brunette%20black%20shirt%20arms%20crossed%20modern%20office%20background%20high%20quality" 
                    alt="Sagit Falk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-10 rounded-3xl hidden md:block border-8 border-white">
                  <div className="text-4xl font-black text-amber-600 mb-2">15+</div>
                  <div className="text-lg font-medium opacity-80">שנות ניסיון בנדל"ן</div>
                </div>
              </div>
              
              <div>
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">אודות המותג</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">שגית פלק - מצוינות בשירות נדל"ן</h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>שגית פלק היא מיועצות הנדל"ן המובילות בישראל, המתמחה בשוק היוקרה ובנכסים להשקעה באזור המרכז והשרון.</p>
                  <p>עם ראייה רחבה של השוק וניסיון עשיר בליווי עסקאות מורכבות, שגית מעניקה ללקוחותיה שקט נפשי וביטחון מלא לאורך כל הדרך.</p>
                  <p>הגישה שלנו מבוססת על אמון, שקיפות ויחס אישי לכל לקוח, תוך שימוש בכלים הטכנולוגיים המתקדמים ביותר לצד קשרים ענפים בקהילת הנדל"ן.</p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-2">ליווי צמוד</h4>
                    <p className="text-sm text-slate-500">אנחנו איתכם החל משלב החיפוש ועד קבלת המפתח והחתימה על החוזה.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h4 className="font-bold text-slate-900 mb-2">שיווק אגרסיבי</h4>
                    <p className="text-sm text-slate-500">חשיפה מקסימלית לנכס שלכם במדיות הדיגיטליות המובילות ובמאגרי לקוחות בלעדיים.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">מוכנים למצוא את הבית הבא שלכם?</h2>
            <p className="text-xl opacity-70 mb-12">השאירו פרטים ונחזור אליכם בהקדם לתיאום פגישת הכירות ללא התחייבות.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="שם מלא"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-4 focus:bg-white focus:text-slate-900 focus:outline-none transition-all"
              />
              <input 
                type="tel" 
                placeholder="טלפון"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-4 focus:bg-white focus:text-slate-900 focus:outline-none transition-all"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full px-8 py-4 shadow-lg shadow-amber-600/20 transition-all">
                שלח פניה
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-black tracking-tighter text-slate-900">
              שגית פלק <span className="text-amber-600">|</span> נדל"ן
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:space-x-reverse md:space-x-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-amber-600 transition-colors">מדיניות פרטיות</a>
            <a href="#" className="hover:text-amber-600 transition-colors">תקנון האתר</a>
            <span>© 2024 שגית פלק - כל הזכויות שמורות.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
