
import React, { useState, useRef } from 'react';
import { Property } from '../types';

interface AdminDashboardProps {
  properties: Property[];
  onUpdate: (props: Property[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ properties, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newProp, setNewProp] = useState<Partial<Property>>({
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 100,
    price: 1000000,
    image: ''
  });

  const handleDelete = (id: string) => {
    if (window.confirm('האם את בטוחה שברצונך למחוק נכס זה?')) {
      onUpdate(properties.filter(p => p.id !== id));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for local storage friendliness
        alert('התמונה גדולה מדי. אנא בחרי תמונה קטנה מ-2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProp({ ...newProp, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.image) {
      alert('חובה להעלות תמונה לנכס');
      return;
    }
    const property: Property = {
      ...newProp as Property,
      id: Date.now().toString(),
    };
    onUpdate([property, ...properties]);
    setShowAddForm(false);
    setNewProp({ type: 'Apartment', bedrooms: 3, bathrooms: 2, area: 100, price: 1000000, image: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">רשימת נכסים פעילים ({properties.length})</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-amber-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-amber-500 transition-all"
        >
          {showAddForm ? 'ביטול' : 'הוסף נכס חדש +'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 animate-fadeIn">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">כותרת הנכס</label>
            <input 
              required type="text" placeholder="למשל: פנטהאוז יוקרתי בקריית גת" 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">מיקום</label>
            <input 
              required type="text" placeholder="למשל: כרמי גת" 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, location: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">מחיר (₪)</label>
            <input 
              required type="number" 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, price: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">סוג נכס</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, type: e.target.value as any})}
            >
              <option value="Apartment">דירה</option>
              <option value="House">בית פרטי</option>
              <option value="Penthouse">פנטהאוז</option>
              <option value="Villa">וילה</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">חדרים</label>
            <input 
              required type="number" 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, bedrooms: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">שטח במ"ר</label>
            <input 
              required type="number" 
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, area: Number(e.target.value)})}
            />
          </div>

          <div className="col-span-full space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">תמונת הנכס</label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 border-dashed border-gray-300 bg-white hover:border-amber-600 hover:bg-amber-50 transition-all group"
                >
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-amber-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-500 font-medium">{newProp.image ? 'שני תמונה' : 'לחץ כאן לבחירת תמונה מהמחשב'}</span>
                </button>
              </div>
              {newProp.image && (
                <div className="relative w-24 h-24 shrink-0">
                  <img src={newProp.image} className="w-full h-full rounded-xl object-cover border-2 border-amber-600 shadow-md" alt="Preview" />
                  <button 
                    type="button"
                    onClick={() => setNewProp({...newProp, image: ''})}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-full space-y-2">
            <label className="text-xs font-bold text-slate-500 mr-2">תיאור הנכס</label>
            <textarea 
              required rows={3}
              placeholder="תארי בקצרה את הנכס ויתרונותיו..."
              className="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-amber-600 shadow-sm"
              onChange={e => setNewProp({...newProp, description: e.target.value})}
            ></textarea>
          </div>
          <div className="col-span-full">
            <button type="submit" className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-500 transition-all shadow-lg active:scale-[0.98]">שמור נכס במערכת</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {properties.map(p => (
          <div key={p.id} className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between hover:shadow-md transition-all">
            <div className="flex items-center space-x-reverse space-x-4">
              <img src={p.image} className="w-16 h-16 rounded-lg object-cover bg-gray-100" alt="" />
              <div>
                <h4 className="font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500">{p.location} | ₪{p.price.toLocaleString()}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(p.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
