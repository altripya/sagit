
import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import PropertyForm from './PropertyForm';

interface AdminDashboardProps {
  properties: Property[];
  deletedProperties: Property[];
  onAdd: (property: Property) => void;
  onUpdate: (property: Property) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
  onClose: () => void;
}

type Tab = 'active' | 'trash';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  properties, 
  deletedProperties, 
  onAdd, 
  onUpdate, 
  onDelete, 
  onRestore, 
  onPermanentDelete, 
  onClose 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // בדיקה אם המשתמש כבר מאומת (זכור אותי) בטעינה ראשונית
  useEffect(() => {
    const isAdminSaved = localStorage.getItem('sagit_admin_authenticated');
    if (isAdminSaved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // בדיקת הסיסמה: sagit039578398
    if (password.trim() === 'sagit039578398') {
      setIsAuthenticated(true);
      setError(false);
      
      if (rememberMe) {
        localStorage.setItem('sagit_admin_authenticated', 'true');
      }
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sagit_admin_authenticated');
    setIsAuthenticated(false);
    onClose();
  };

  const handleFormSubmit = (prop: Property) => {
    if (editingProperty) {
      onUpdate(prop);
    } else {
      onAdd(prop);
    }
    setIsAdding(false);
    setEditingProperty(null);
  };

  const currentList = activeTab === 'active' ? properties : deletedProperties;

  // מסך כניסה (סיסמה)
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl p-10 text-center relative border border-white/20">
          <button onClick={onClose} className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-all">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 mb-2">אזור מוגן</h2>
          <p className="text-slate-500 text-sm mb-8">יש להזין סיסמה כדי להמשיך</p>
          
          <form onSubmit={handleLogin} className="space-y-6 text-right">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="הזינו סיסמה"
                autoFocus
                className={`w-full bg-gray-50 border-2 ${error ? 'border-red-500 ring-2 ring-red-100' : 'border-transparent'} focus:border-amber-600 rounded-2xl px-6 py-4 text-center text-lg outline-none transition-all`}
              />
              {error && <p className="text-red-500 text-xs font-bold animate-pulse mt-2 text-center">סיסמה שגויה, נסי שוב</p>}
            </div>

            <div className="flex items-center justify-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
              <span className="text-sm font-bold text-slate-600">זכור אותי במכשיר זה</span>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              כניסה למערכת
            </button>
          </form>
        </div>
      </div>
    );
  }

  // מסך הניהול (לאחר אימות)
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gray-50 w-full max-w-6xl h-[90vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/20">
        
        {/* Header */}
        <div className="p-8 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all" title="סגור חלון">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-black text-slate-900">ניהול נכסים</h2>
            
            {/* Tabs Navigation */}
            <nav className="flex bg-gray-100 p-1 rounded-2xl mr-4">
              <button 
                onClick={() => { setActiveTab('active'); setIsAdding(false); setEditingProperty(null); }}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'active' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                נכסים פעילים ({properties.length})
              </button>
              <button 
                onClick={() => { setActiveTab('trash'); setIsAdding(false); setEditingProperty(null); }}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'trash' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                סל מיחזור ({deletedProperties.length})
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 text-xs font-bold transition-all ml-4"
            >
              התנתק מהמערכת
            </button>
            
            {activeTab === 'active' && !isAdding && !editingProperty && (
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-600/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>הוספת נכס חדש</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {isAdding || editingProperty ? (
            <div className="max-w-3xl mx-auto">
              <PropertyForm 
                initialData={editingProperty}
                onSubmit={handleFormSubmit}
                onCancel={() => { setIsAdding(false); setEditingProperty(null); }}
              />
            </div>
          ) : (
            <>
              {currentList.length > 0 ? (
                <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">הנכס</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">מיקום</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">מחיר</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-left">פעולות</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {currentList.map(prop => (
                        <tr key={prop.id} className="hover:bg-gray-50/30 transition-all group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <img src={prop.images && prop.images.length > 0 ? prop.images[0] : ''} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{prop.title}</span>
                                <span className="text-[10px] text-slate-400 font-medium">מזהה: {prop.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-slate-500 text-sm font-medium">{prop.location}</td>
                          <td className="p-6 font-black text-slate-900">₪{prop.price.toLocaleString()}</td>
                          <td className="p-6">
                            <div className="flex justify-end gap-2">
                              {activeTab === 'active' ? (
                                <>
                                  <button 
                                    onClick={() => setEditingProperty(prop)}
                                    className="px-4 py-2 bg-gray-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-xl text-xs font-bold transition-all"
                                  >
                                    עריכה
                                  </button>
                                  <button 
                                    onClick={() => onDelete(prop.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                                  >
                                    מחיקה
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => onRestore(prop.id)}
                                    className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                                  >
                                    שחזור נכס
                                  </button>
                                  <button 
                                    onClick={() => { if(confirm('מחיקה לצמיתות? לא ניתן יהיה לשחזר.')) onPermanentDelete(prop.id) }}
                                    className="px-4 py-2 bg-gray-100 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                                  >
                                    מחיקה לצמיתות
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-400">אין נכסים להצגה</h3>
                  <p className="text-slate-400 text-sm mt-2">
                    {activeTab === 'active' ? 'הוסיפו את הנכס הראשון שלכם' : 'סל המיחזור ריק'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
