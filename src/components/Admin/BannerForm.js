'use client';

import { useState, useEffect } from 'react';

export default function BannerForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    active: true,
    type: 'grid',
    focalPoint: 'center',
    order: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Text Content */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Título Principal</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
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

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Ubicación</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'hero', label: 'Superior', icon: 'vertical_align_top' },
                { id: 'grid', label: 'Inferior', icon: 'grid_view' }
              ].map(loc => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: loc.id })}
                  className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest border-2 transition-all ${formData.type === loc.id ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-transparent text-slate-400 border-slate-100 hover:border-primary/20'}`}
                >
                  <span className="material-symbols-outlined text-sm">{loc.icon}</span>
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visuals & Settings */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Imagen del Banner</label>
            <div className="flex flex-col gap-4">
              {formData.imageUrl ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                  <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, imageUrl: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                    className="hidden" 
                  />
                  <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">add_a_photo</span>
                  <span className="text-[10px] uppercase font-bold mt-2">Subir desde equipo</span>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Ajuste de Encuadre</label>
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

          <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100 max-w-sm">
            <p className="text-[10px] text-amber-700 leading-relaxed">
              <span className="font-bold block mb-1">💡 Recomendación</span>
              {formData.type === 'hero' 
                ? 'Usa fotos horizontales (1920x1080px). Ideal para impacto visual.' 
                : 'Usa fotos horizontales (1200x800px). Ideal para balance.'}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-200"
          >
            {initialData ? 'Guardar Cambios' : 'Crear Banner'}
          </button>
        </div>
      </div>
    </form>
  );
}
  );
}
