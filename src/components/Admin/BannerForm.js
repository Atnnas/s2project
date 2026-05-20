'use client';

import { useState, useEffect } from 'react';

const compressImage = (file, maxWidth, maxHeight, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export default function BannerForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    topText: 'S2 Project • Boutique Agency',
    imageUrl: '',
    mobileImageUrl: '',
    active: true,
    type: 'hero',
    focalPoint: 'center',
    order: 0
  });

  useEffect(() => {
    if (initialData) {
      const timer = setTimeout(() => {
        setFormData({
          title: initialData.title || '',
          subtitle: initialData.subtitle || '',
          topText: initialData.topText || 'S2 Project • Boutique Agency',
          imageUrl: initialData.imageUrl || '',
          mobileImageUrl: initialData.mobileImageUrl || '',
          active: initialData.active !== undefined ? initialData.active : true,
          type: initialData.type || 'hero',
          focalPoint: initialData.focalPoint || 'center',
          order: initialData.order || 0
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Texto Superior (Tag)</label>
            <textarea
              value={formData.topText}
              rows={2}
              onChange={(e) => setFormData({ ...formData, topText: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300 resize-none"
              placeholder="Ej. S2 Project • Boutique Agency"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Título Principal</label>
            <textarea
              required
              rows={2}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300 resize-none"
              placeholder="Ej. Estrategia Digital"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Subtítulo / Descripción</label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-32 resize-none placeholder:text-slate-300"
              placeholder="Breve descripción del contenido..."
            />
          </div>
        </div>

        {/* Right Column: Visuals & Settings */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Imagen Desktop (16:9)</label>
              <div className="flex flex-col gap-4">
                {formData.imageUrl ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                    <img 
                      src={formData.imageUrl} 
                      className="w-full h-full object-cover" 
                      style={{ 
                        objectPosition: formData.focalPoint === 'top' ? 'center top' : formData.focalPoint === 'bottom' ? 'center bottom' : 'center center' 
                      }}
                      alt="Desktop Preview" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                        className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 flex flex-col items-center justify-center cursor-pointer text-slate-400 group transition-all bg-slate-50">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const compressed = await compressImage(file, 1920, 1080, 0.8);
                            setFormData({ ...formData, imageUrl: compressed });
                          } catch (err) {
                            console.error('Error compressing desktop image:', err);
                            alert('No se pudo procesar la imagen.');
                          }
                        }
                      }} 
                      className="hidden" 
                    />
                    <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_a_photo</span>
                    <span className="text-[10px] uppercase font-bold mt-2">Subir Desktop</span>
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Imagen Mobile (9:16)</label>
              <div className="flex flex-col gap-4">
                {formData.mobileImageUrl ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                    <img 
                      src={formData.mobileImageUrl} 
                      className="w-full h-full object-cover" 
                      alt="Mobile Preview" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, mobileImageUrl: '' })}
                        className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 flex flex-col items-center justify-center cursor-pointer text-slate-400 group transition-all bg-slate-50">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const compressed = await compressImage(file, 1000, 1500, 0.8);
                            setFormData({ ...formData, mobileImageUrl: compressed });
                          } catch (err) {
                            console.error('Error compressing mobile image:', err);
                            alert('No se pudo procesar la imagen.');
                          }
                        }
                      }} 
                      className="hidden" 
                    />
                    <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_a_photo</span>
                    <span className="text-[10px] uppercase font-bold mt-2">Subir Mobile</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Ajuste de Encuadre (Desktop)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'top', label: 'Arriba', icon: 'align_vertical_top' },
                { id: 'center', label: 'Centro', icon: 'align_vertical_center' },
                { id: 'bottom', label: 'Abajo', icon: 'align_vertical_bottom' },
              ].map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, focalPoint: point.id })}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${formData.focalPoint === point.id ? 'bg-primary/5 border-primary text-primary' : 'bg-transparent border-slate-100 text-slate-400 hover:border-primary/20'}`}
                >
                  <span className="material-symbols-outlined text-lg mb-1">{point.icon}</span>
                  <span className="text-[8px] font-bold uppercase">{point.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100 min-h-[80px] flex flex-col justify-center">
            <div className="text-[10px] text-amber-700 leading-relaxed space-y-2">
              <span className="font-bold block mb-1">💡 Recomendación de Dimensiones:</span>
              <p>• <b>Desktop:</b> Usa fotos horizontales (resolución de 1920 x 1080 px, proporción 16:9) para un óptimo impacto visual.</p>
              <p>• <b>Móvil (Opcional):</b> Usa fotos verticales con una resolución de 1000 x 1500 px (proporción 2:3). Esto asegura que se aproveche todo el espacio en dispositivos móviles de manera impecable.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Order & Actions */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-32">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Orden</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
               <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={formData.active}
                   onChange={(e) => setFormData({...formData, active: e.target.checked})}
                   className="sr-only peer"
                 />
                 <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                 <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Activo</span>
               </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Guardando...</span>
              </>
            ) : (
              initialData ? 'Guardar Cambios' : 'Crear Banner'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
