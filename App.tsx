
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AiAssistant from './components/AiAssistant';
import SearchFilters from './components/SearchFilters';
import AdminDashboard from './components/AdminDashboard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import { MOCK_PROPERTIES } from './constants';
import { Property, PropertyFilters } from './types';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deletedProperties, setDeletedProperties] = useState<Property[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({
    searchQuery: '',
    minPrice: 0,
    maxPrice: 50000000,
    minRooms: 0,
    propertyType: 'All'
  });

  // טעינת נכסים מ-localStorage
  useEffect(() => {
    const savedActive = localStorage.getItem('sagit_properties');
    const savedDeleted = localStorage.getItem('sagit_deleted_properties');
    
    if (savedActive) {
      setProperties(JSON.parse(savedActive));
    } else {
      setProperties(MOCK_PROPERTIES);
      localStorage.setItem('sagit_properties', JSON.stringify(MOCK_PROPERTIES));
    }

    if (savedDeleted) {
      setDeletedProperties(JSON.parse(savedDeleted));
    }
  }, []);

  const saveActive = (newProps: Property[]) => {
    setProperties(newProps);
    localStorage.setItem('sagit_properties', JSON.stringify(newProps));
  };

  const saveDeleted = (newDeleted: Property[]) => {
    setDeletedProperties(newDeleted);
    localStorage.setItem('sagit_deleted_properties', JSON.stringify(newDeleted));
  };

  const handleAddProperty = (prop: Property) => {
    saveActive([prop, ...properties]);
  };

  const handleUpdateProperty = (updated: Property) => {
    saveActive(properties.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProperty = (id: string) => {
    const propToDelete = properties.find(p => p.id === id);
    if (propToDelete) {
      const newActive = properties.filter(p => p.id !== id);
      const newDeleted = [propToDelete, ...deletedProperties];
      saveActive(newActive);
      saveDeleted(newDeleted);
    }
  };

  const handleRestoreProperty = (id: string) => {
    const propToRestore = deletedProperties.find(p => p.id === id);
    if (propToRestore) {
      const newDeleted = deletedProperties.filter(p => p.id !== id);
      const newActive = [propToRestore, ...properties];
      saveActive(newActive);
      saveDeleted(newDeleted);
    }
  };

  const handlePermanentDelete = (id: string) => {
    const newDeleted = deletedProperties.filter(p => p.id !== id);
    saveDeleted(newDeleted);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchesSearch = prop.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                            prop.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesType = filters.propertyType === 'All' || prop.type === filters.propertyType;
      const matchesRooms = prop.bedrooms >= filters.minRooms;
      const matchesMinPrice = prop.price >= (filters.minPrice || 0);
      const matchesMaxPrice = prop.price <= (filters.maxPrice || Infinity);

      return matchesSearch && matchesType && matchesRooms && matchesMinPrice && matchesMaxPrice;
    });
  }, [filters, properties]);

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="properties" className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-2/3">
                <div className="mb-12">
                  <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">הזדמנויות בלעדיות</span>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">נכסים נבחרים</h2>
                      <p className="text-slate-500 max-w-lg text-lg text-right">
                        הבית הבא שלכם מחכה כאן - מבחר דירות, בתים ומגרשים מבית שגית פלק & קנזי נדל"ן.
                      </p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-sm font-bold text-slate-600">
                      נמצאו <span className="text-amber-600">{filteredProperties.length}</span> תוצאות
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <SearchFilters filters={filters} onFilterChange={setFilters} />
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {filteredProperties.map(prop => (
                      <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        onClick={(p) => setSelectedProperty(p)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">לא מצאנו את מה שחיפשתם</h3>
                    <p className="text-slate-500 mb-8 text-right">נסו להרחיב את טווח המחירים או לשנות את סוג הנכס.</p>
                  </div>
                )}
              </div>

              <div className="lg:w-1/3 space-y-10">
                <div className="sticky top-28">
                  <div className="mb-10">
                    <AiAssistant properties={properties} />
                  </div>
                  
                  <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-1 bg-amber-600"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-600 shadow-xl shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                          alt="שגית וקנזי" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-2xl font-black text-right">ליווי אישי - שגית & קנזי</h4>
                    </div>
                    <p className="text-slate-400 mb-8 leading-relaxed text-right">
                      כל לקוח מקבל מעטפת מקצועית מלאה הכוללת ייעוץ משפטי, פיננסי ושיווקי ברמה הגבוהה ביותר על ידי צוות המומחים שלנו.
                    </p>
                    <a href="tel:0548188436" className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center ml-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">חייגו עכשיו</div>
                        <div className="text-xl font-black">054-8188436</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80" 
                    alt="שגית פלק וקנזי"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-[16px] border-white/10 pointer-events-none rounded-[2.5rem]"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600 rounded-3xl -z-10 animate-pulse"></div>
              </div>
              <div className="text-right">
                <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm mb-6 block">הכירו את המומחים</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-[1.1]">שגית פלק & קנזי - <br />חזון וחדשנות בנדל"ן</h2>
                <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
                  <p>עם ניסיון מצטבר של עשרות שנים בשוק הנדל"ן הישראלי, שגית פלק וצוות קנזי נדל"ן ביססו את מעמדם ככוח מוביל בתיווך ושיווק נכסי יוקרה.</p>
                  <p>המומחיות המשותפת משלבת הבנה עמוקה של צרכי הלקוח, חשיבה אסטרטגית ושימוש בטכנולוגיות המתקדמות ביותר כדי להבטיח את העסקה הטובה ביותר לקהל לקוחותינו.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10 text-right">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-600 shadow-md">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Sagit & Kanzi" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                שגית פלק & קנזי <span className="text-amber-600">|</span> נדל"ן
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-xs text-slate-400 hover:text-amber-600 font-bold transition-all underline underline-offset-4"
              >
                כניסה למערכת ניהול
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isAdminOpen && (
        <AdminDashboard 
          properties={properties}
          deletedProperties={deletedProperties}
          onAdd={handleAddProperty}
          onUpdate={handleUpdateProperty}
          onDelete={handleDeleteProperty}
          onRestore={handleRestoreProperty}
          onPermanentDelete={handlePermanentDelete}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {selectedProperty && (
        <PropertyDetailsModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
};

export default App;
