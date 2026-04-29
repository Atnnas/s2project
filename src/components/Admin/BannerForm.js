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
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">URL de la Imagen</label>
          <input
            type="text"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
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
