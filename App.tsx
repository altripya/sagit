
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import AiAssistant from './components/AiAssistant';
import AdminDashboard from './components/AdminDashboard';
import { MOCK_PROPERTIES } from './constants';
import { Property } from './types';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeAboutTab, setActiveAboutTab] = useState<'personal' | 'office'>('personal');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const CONTACT_PHONE = "0548188436";
  const CONTACT_EMAIL = "sagitfalek@gmail.com";

  // תמונות מעודכנות - ייצוגיות ויוקרתיות יותר
  const SAGIT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"; // דמות ייצוגית
  const OFFICE_IMAGE = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"; // משרד נדל"ן יוקרתי

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sagit_properties');
      if (saved) {
        setProperties(JSON.parse(saved));
      } else {
        setProperties(MOCK_PROPERTIES);
        localStorage.setItem('sagit_properties', JSON.stringify(MOCK_PROPERTIES));
      }
    } catch (e) {
      setProperties(MOCK_PROPERTIES);
    }
  }, []);

  const saveProperties = (newProps: Property[]) => {
    setProperties(newProps);
    localStorage.setItem('sagit_properties', JSON.stringify(newProps));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sagit123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('סיסמה שגויה');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus('submitting');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = `שלום שגית, שמי ${formData.name || 'אורח'}, אני פונה מהאתר ומעוניין בתיאום פגישת ייעוץ. הטלפון שלי: ${formData.phone || ''}`;
    const message = customMessage || defaultMsg;
    const url = `https://wa.me/972${CONTACT_PHONE.substring(1)}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onHomeClick={() => setSelectedProperty(null)} />
      
      <main className="pt-20">
        {selectedProperty ? (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)}
            onContact={() => openWhatsApp(`שלום שגית, ראיתי את הנכס "${selectedProperty.title}" ב${selectedProperty.location} באתר ואשמח לקבל עליו פרטים נוספים.`)}
          />
        ) : (
          <>
            <Hero />

            <section id="properties" className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-2/3">
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 mb-4">נכסים נבחרים</h2>
                      <p className="text-slate-600 max-w-lg italic">מבחר נכסים בלעדיים בטיפולי האישי בקריית גת והסביבה.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {properties.map(prop => (
                        <PropertyCard 
                          key={prop.id} 
                          property={prop} 
                          onClick={() => {
                            setSelectedProperty(prop);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-1/3">
                    <div className="sticky top-24">
                      <AiAssistant properties={properties} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="py-24 bg-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-16">
                  <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">הכירו את סוכנות הבוטיק</span>
                  <div className="inline-flex p-1 bg-slate-100 rounded-full shadow-inner border border-slate-200">
                    <button 
                      onClick={() => setActiveAboutTab('personal')}
                      className={`px-10 py-3 rounded-full font-bold transition-all duration-300 ${activeAboutTab === 'personal' ? 'bg-white shadow-md text-amber-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      שגית פלק
                    </button>
                    <button 
                      onClick={() => setActiveAboutTab('office')}
                      className={`px-10 py-3 rounded-full font-bold transition-all duration-300 ${activeAboutTab === 'office' ? 'bg-white shadow-md text-amber-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      המשרד
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative order-2 lg:order-1 animate-fadeIn">
                    <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white group">
                      <img 
                        src={activeAboutTab === 'personal' ? SAGIT_PROFILE_IMAGE : OFFICE_IMAGE} 
                        alt={activeAboutTab === 'personal' ? "Sagit Falk" : "Sagit Falk Real Estate Office"}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Badge overlay for office */}
                      {activeAboutTab === 'office' && (
                        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block">
                          <p className="text-amber-600 font-black text-xl mb-1">BOUTIQUE</p>
                          <p className="text-slate-900 text-sm font-bold">סטנדרט שירות אירופאי בלב קריית גת</p>
                        </div>
                      )}
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl"></div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    {activeAboutTab === 'personal' ? (
                      <div className="animate-fadeIn space-y-8">
                        <div className="space-y-4">
                          <h2 className="text-5xl font-black text-slate-900 leading-tight">
                            נעים להכיר, <br /> 
                            <span className="text-amber-600 underline decoration-amber-600/30 underline-offset-8">שגית פלק</span>
                          </h2>
                          <div className="w-20 h-1.5 bg-amber-600 rounded-full"></div>
                        </div>
                        <div className="space-y-6 text-slate-600 text-xl leading-relaxed">
                          <p className="font-bold text-slate-900 text-2xl">שמי שגית פלק, בת 41 מקרית גת, נשואה + 2.</p>
                          <p>
                            אני מביאה איתי 8 שנות ניסיון עשיר בתחום הנדל"ן בקריית גת והסביבה. עבורי, תיווך הוא הרבה מעבר למכירת נכס - זוהי שליחות ללוות אנשים ומשפחות באחד הצמתים החשובים בחייהם.
                          </p>
                          <p>
                            אני מאמינה בליווי אישי, שקיפות מלאה ומקצועיות ללא פשרות. כל לקוח שלי מקבל מעטפת רגועה ובטוחה, מהרגע הראשון ועד לקבלת המפתח.
                          </p>
                          <p className="font-medium text-slate-900 border-r-4 border-amber-600 pr-4 italic">
                            "אני כאן כדי להבטיח שהעסקה הבאה שלכם תהיה הטובה ביותר עבורכם."
                          </p>
                        </div>
                        <div className="pt-6">
                           <button onClick={() => openWhatsApp()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 group">
                             לשיחת ייעוץ אישית
                             <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                           </button>
                        </div>
                      </div>
                    ) : (
                      <div className="animate-fadeIn space-y-8">
                        <div className="space-y-4">
                          <h2 className="text-5xl font-black text-slate-900 leading-tight">סוכנות הבוטיק <br /> המובילה באזור</h2>
                          <div className="w-20 h-1.5 bg-slate-900 rounded-full"></div>
                        </div>
                        <p className="text-slate-600 text-xl leading-relaxed">המשרד שלנו הוקם מתוך מטרה להעניק סטנדרט חדש של שירות בקריית גת. אנחנו מספקים פתרון של One Stop Shop לכל צרכי הנדל"ן שלכם.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                            <h4 className="font-bold text-amber-900 mb-2">ליווי משפטי ומיסוי</h4>
                            <p className="text-amber-800 text-sm">מעטפת הגנה מלאה בכל שלבי החוזה.</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2">ייעוץ משכנתאות</h4>
                            <p className="text-slate-600 text-sm">תנאים אופטימליים במימון הנכס.</p>
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2">שמאות ועיצוב</h4>
                            <p className="text-slate-600 text-sm">מיקסום ערך הנכס לפני מכירה.</p>
                          </div>
                          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                            <h4 className="font-bold text-amber-900 mb-2">שיווק דיגיטלי</h4>
                            <p className="text-amber-800 text-sm">חשיפה מקסימלית בקהל יעד רלוונטי.</p>
                          </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                          <div className="relative z-10">
                            <h4 className="font-black text-2xl mb-2">יחס אישי, תוצאות מקצועיות</h4>
                            <p className="opacity-80 leading-relaxed">אנחנו לא רק מתווכים, אנחנו השותפים שלכם לדרך. כל נכס מקבל את תשומת הלב המלאה שלנו.</p>
                          </div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-600/30 transition-all duration-500"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" className="py-24 bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-12">הבית הבא שלכם מתחיל בשיחה</h2>
                {status === 'success' ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/50 p-12 rounded-[3rem] animate-fadeIn">
                    <h3 className="text-3xl font-bold mb-4">תודה {formData.name}!</h3>
                    <p className="text-xl mb-8 opacity-90">הפנייה התקבלה בהצלחה. שגית תחזור אליך בהקדם.</p>
                    <button onClick={() => setStatus('idle')} className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold shadow-xl">שלח פנייה נוספת</button>
                  </div>
                ) : (
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    <input type="text" required placeholder="שם מלא" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/10 border border-white/20 rounded-2xl px-8 py-5 focus:bg-white focus:text-slate-900 outline-none transition-all text-lg placeholder:text-white/50" />
                    <input type="tel" required placeholder="טלפון" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/10 border border-white/20 rounded-2xl px-8 py-5 focus:bg-white focus:text-slate-900 outline-none transition-all text-lg placeholder:text-white/50" />
                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl px-10 py-5 transition-all text-lg shadow-xl active:scale-95">{status === 'submitting' ? 'שולח...' : 'דברי איתי שגית'}</button>
                  </form>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-100 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-2xl font-black text-slate-900">שגית פלק <span className="text-amber-600">|</span> נדל"ן</span>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsAdminOpen(true)} className="text-xs text-slate-400 hover:text-amber-600 font-bold uppercase tracking-widest bg-white px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md">כניסת מנהל</button>
            <p className="text-slate-400 text-xs">© 2024 כל הזכויות שמורות לשגית פלק.</p>
          </div>
        </div>
      </footer>

      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black">ניהול נכסים</h2>
              <button onClick={() => setIsAdminOpen(false)} className="p-3 hover:bg-gray-200 rounded-full transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10">
              {!isAuthenticated ? (
                <div className="max-w-xs mx-auto text-center py-20 space-y-6">
                  <h3 className="text-xl font-bold">הזדהות מנהל</h3>
                  <input type="password" placeholder="סיסמה" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-6 py-4 bg-gray-100 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-600" />
                  <button onClick={handleAdminLogin} className="w-full bg-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg">כניסה למערכת</button>
                </div>
              ) : (
                <AdminDashboard properties={properties} onUpdate={saveProperties} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
