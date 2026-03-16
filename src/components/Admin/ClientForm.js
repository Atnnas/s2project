'use client';

import { useState } from 'react';

export default function ClientForm({ client = null, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    contactPerson: client?.contactPerson || '',
    email: client?.email || '',
    phone: client?.phone || '',
    website: client?.website || '',
    industry: client?.industry || '',
    notes: client?.notes || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = client ? 'PATCH' : 'POST';
      const body = client ? { ...formData, id: client._id } : formData;
      const res = await fetch('/api/clients', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Nombre de Empresa</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="Nombre oficial"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Dueño / Contacto</label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="Nombre del dueño"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Correo Electrónico</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="email@empresa.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Teléfono</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="+506 ...."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Sitio Web</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="www.empresa.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Sector / Industria</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 dark:text-white"
            placeholder="Ej. Moda, Tecnología"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1 text-left block">Notas Internas</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-primary/5 border border-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-300 min-h-[100px] dark:text-white"
          placeholder="Detalles adicionales..."
        />
      </div>
      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-5 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all shadow-sm"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-5 rounded-2xl bg-primary text-white font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : client ? 'Actualizar Cliente' : 'Guardar Cliente'}
        </button>
      </div>
    </form>
  );
}
