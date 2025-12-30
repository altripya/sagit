
import React, { useState, useEffect, useRef } from 'react';
import { Property } from '../types';

interface PropertyFormProps {
  onSubmit: (property: Property) => void;
  initialData?: Property | null;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'Apartment',
    images: [],
    videoUrl: '',
    description: '',
    featured: false
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageUrlInput.trim()]
      }));
      setImageUrlInput('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsProcessing(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      newImages.push(base64);
    }

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = (index: number) => {
    if (window.confirm('האם להסיר את התמונה הזו?')) {
      setFormData(prev => ({
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== index)
      }));
    }
  };

  const setAsMainImage = (index: number) => {
    setFormData(prev => {
      const currentImages = [...(prev.images || [])];
      const [selectedImage] = currentImages.splice(index, 1);
      return {
        ...prev,
        images: [selectedImage, ...currentImages]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images || formData.images.length === 0) {
      alert('יש להוסיף לפחות תמונה אחת לנכס');
      return;
    }
    const newProperty: Property = {
      ...formData as Property,
      id: initialData?.id || Math.random().toString(36).substr(2, 9)
    };
    onSubmit(newProperty);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 max-w-3xl mx-auto overflow-hidden">
      <h3 className="text-2xl font-black mb-8 text-slate-900 border-b border-gray-100 pb-4">
        {initialData ? 'עריכת נכס' : 'הוספת נכס חדש'}
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">כותרת הנכס</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" placeholder="למשל: פנטהאוז יוקרתי עם נוף לים" />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">מיקום</label>
          <input required name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" placeholder="למשל: תל אביב, צפון ישן" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">מחיר (₪)</label>
          <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">סוג נכס</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none">
            <option value="Apartment">דירה</option>
            <option value="House">בית פרטי</option>
            <option value="Villa">וילה</option>
            <option value="Penthouse">פנטהאוז</option>
            <option value="Plot">מגרש</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">שטח (מ"ר)</label>
          <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" />
        </div>

        <div className="md:col-span-2 space-y-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">ניהול גלריית תמונות</label>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full uppercase">התמונה הראשונה היא הראשית</span>
          </div>
          
          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-amber-600 hover:bg-amber-50 transition-all cursor-pointer group bg-white"
          >
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <svg className={`w-8 h-8 ${isProcessing ? 'animate-spin text-amber-600' : 'text-slate-300 group-hover:text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-black text-slate-700">
                {isProcessing ? 'מעבד תמונות...' : 'לחצו להעלאת תמונות מהמכשיר'}
              </p>
              <p className="text-xs text-slate-400">ניתן לבחור מספר תמונות יחד</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">או הזינו קישור לתמונה</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="flex gap-2">
            <input 
              value={imageUrlInput} 
              onChange={(e) => setImageUrlInput(e.target.value)} 
              className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-600 outline-none shadow-sm" 
              placeholder="הדבק כאן קישור לתמונה..." 
            />
            <button 
              type="button" 
              onClick={addImageUrl}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              הוסף
            </button>
          </div>
          
          {/* Gallery Preview - Upgraded to be much clearer */}
          {formData.images && formData.images.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 mr-1">סדר את התמונות (התמונה הימנית ביותר תוצג בדף הבית):</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.images.map((url, index) => (
                  <div 
                    key={index} 
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all flex flex-col bg-white shadow-sm ${
                      index === 0 ? 'border-amber-500 ring-4 ring-amber-50' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {/* Image Box */}
                    <div className="aspect-[4/3] relative">
                      <img src={url} className="w-full h-full object-cover" alt={`נכס ${index + 1}`} />
                      
                      {index === 0 && (
                        <div className="absolute top-3 right-3 bg-amber-600 text-[10px] text-white px-3 py-1 rounded-full font-black uppercase shadow-lg z-10 animate-pulse">
                          תמונה ראשית
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Action Buttons Below Image */}
                    <div className="p-2 grid grid-cols-2 gap-2 bg-white">
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="flex items-center justify-center gap-1.5 py-2 px-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px] font-black"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        מחק
                      </button>
                      
                      {index !== 0 ? (
                        <button 
                          type="button"
                          onClick={() => setAsMainImage(index)}
                          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all text-[10px] font-black"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                          </svg>
                          הפוך לראשית
                        </button>
                      ) : (
                        <div className="flex items-center justify-center text-[10px] font-black text-amber-600 bg-amber-50 rounded-lg py-2 cursor-default">
                          נבחרה כראשית
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-gray-200 rounded-2xl bg-white">
              <p className="text-slate-400 text-sm">טרם נוספו תמונות לנכס</p>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">חדרי שינה</label>
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">חדרי רחצה</label>
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">קישור לוידאו (MP4 / YouTube)</label>
          <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none" placeholder="למשל: https://example.com/video.mp4" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">תיאור הנכס</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-amber-600 outline-none resize-none" placeholder="ספר בפירוט על הנכס, היתרונות שלו, השכונה וכו'..."></textarea>
        </div>

        <div className="md:col-span-2 flex gap-4 mt-6 pt-6 border-t border-gray-100">
          <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-600/20 active:scale-95 text-lg">שמור נכס במערכת</button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-600 font-bold py-5 rounded-2xl transition-all active:scale-95 text-lg">ביטול</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
