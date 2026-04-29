'use client';

import { useState, useEffect } from 'react';

export default function BannerForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    active: true,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Título Principal</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Título impactante para el banner"
          />
        </div>
        
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subtítulo / Descripción</label>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24"
            placeholder="Breve descripción del contenido"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Imagen del Banner</label>
          <div className="flex flex-col gap-4">
            {formData.imageUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200">
                <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            )}
            
            {!formData.imageUrl && (
              <label className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 flex flex-col items-center justify-center cursor-pointer text-slate-400 group transition-all">
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
                <span className="text-[10px] uppercase font-bold mt-2">Seleccionar imagen del equipo</span>
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Orden</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
             <input 
               type="checkbox" 
               id="active"
               checked={formData.active}
               onChange={(e) => setFormData({...formData, active: e.target.checked})}
               className="w-5 h-5 accent-primary"
             />
             <label htmlFor="active" className="text-xs font-bold text-slate-700 uppercase tracking-widest">Activo</label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
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
    </form>
  );
}
