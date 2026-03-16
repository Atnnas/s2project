'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ClientForm from './ClientForm';

export default function ProjectForm({ 
  embedded = false, 
  project = null, 
  onSuccess = null, 
  defaultCategory = 'Fotografía',
  mode = 'all' // 'all', 'photo', 'reels', 'art'
}) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || defaultCategory || 'Fotografía',
    imageUrl: project?.imageUrl || '',
    gallery: project?.gallery || (project?.imageUrl ? [{ type: 'image', url: project.imageUrl }] : []),
    client: project?.client || '',
    description: project?.description || '',
    metadata: project?.metadata || {}
  });
  const [ytUrl, setYtUrl] = useState('');
  const [livePreview, setLivePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });
  const [clients, setClients] = useState([]);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [showFullClientModal, setShowFullClientModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true);
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        if (data.success) {
          // Sort alphabetically by name
          const sorted = data.data.sort((a, b) => a.name.localeCompare(b.name));
          setClients(sorted);
        }
      } catch (e) { console.error(e); }
      setLoadingClients(false);
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleClientSuccess = (newClient) => {
    setClients(prev => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
    setFormData({ ...formData, client: newClient.name });
    setShowFullClientModal(false);
    setShowClientDropdown(false);
  };

  const getYoutubeThumbnail = (url) => {
    try {
      // Improved regex to support /shorts/ and various youtube formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
          return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const getInstagramThumbnail = (url) => {
    if (!url) return null;
    try {
      if (url.includes('instagram.com')) {
        const regExp = /(?:reels?|p|tv)\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regExp);
        if (match && match[1]) {
          // Instagram's official way to get a direct media thumbnail for public posts
          return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
        }
        return 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg';
      }
      return null;
    } catch {
      return null;
    }
  };

  const getMediaThumbnail = (item) => {
    if (item.type === 'video') {
      return getYoutubeThumbnail(item.url) || getInstagramThumbnail(item.url);
    }
    return item.url;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => {
            const newGallery = [...prev.gallery, { type: 'image', url: reader.result }];
            return {
              ...prev,
              gallery: newGallery,
              imageUrl: newGallery.find(m => m.type === 'image')?.url || newGallery[0]?.url || ''
            };
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const addYoutubeVideo = () => {
    if (!ytUrl.trim()) return;
    const videoUrl = ytUrl.trim();
    const thumb = getYoutubeThumbnail(videoUrl) || getInstagramThumbnail(videoUrl);
    setFormData(prev => {
      const newVideo = { type: 'video', url: videoUrl };
      const newGallery = [...prev.gallery, newVideo];
      return {
        ...prev,
        gallery: newGallery,
        imageUrl: prev.imageUrl || thumb || ''
      };
    });
    setYtUrl('');
  };

  const removeMedia = (index) => {
    setFormData(prev => {
      const newGallery = prev.gallery.filter((_, i) => i !== index);
      return {
        ...prev,
        gallery: newGallery,
        imageUrl: newGallery.find(m => m.type === 'image')?.url || newGallery[0]?.url || ''
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadStatus({ type: '', message: '' });

    try {
      const isEditing = !!project;
      const endpoint = '/api/projects';
      const method = isEditing ? 'PATCH' : 'POST';
      
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditing ? { ...formData, id: project._id } : formData),
      });

      const data = await res.json();
      if (data.success) {
        setUploadStatus({ type: 'success', message: '¡Éxito! ✨' });
        if (!isEditing) {
          setFormData({ title: '', category: defaultCategory, imageUrl: '', gallery: [], client: '', description: '' });
        }
        if (onSuccess) onSuccess(data.data);
      } else {
        setUploadStatus({ type: 'error', message: data.error });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: 'Error de conexión.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mt-2 uppercase tracking-wide">
            {mode === 'reels' ? 'Nombre del Reel' : 'Título'}
          </label>
          <input
            required
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary/20 bg-transparent outline-none focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-300"
            placeholder={mode === 'reels' ? 'Ej. Detrás de cámaras #01' : 'Título del proyecto'}
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mt-2 uppercase tracking-wide">
            {mode === 'reels' ? 'Empresa / Marca' : 'Cliente'}
          </label>
          <div 
            onClick={() => setShowClientDropdown(!showClientDropdown)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary/20 bg-transparent outline-none focus-within:ring-2 focus-within:ring-primary transition-all text-slate-900 dark:text-slate-100 flex items-center justify-between cursor-pointer group"
          >
            <span className={formData.client ? 'text-slate-900 dark:text-slate-100' : 'text-slate-300'}>
              {formData.client || (mode === 'reels' ? 'Seleccionar empresa' : 'Seleccionar cliente')}
            </span>
            <span className={`material-symbols-outlined transition-transform ${showClientDropdown ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>

          <AnimatePresence>
            {showClientDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowClientDropdown(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-20 top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-primary/10 overflow-hidden"
                >
                  <div className="p-3 border-b border-primary/5">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-sm text-slate-400">search</span>
                      <input
                        type="text"
                        autoFocus
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Buscar..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-primary/5 rounded-xl text-sm outline-none border border-transparent focus:border-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-1">
                    {loadingClients ? (
                      <div className="p-4 text-center text-xs text-slate-400 italic">Cargando...</div>
                    ) : (
                      <>
                        {filteredClients.length === 0 ? (
                          <div className="p-6 text-center">
                            <span className="material-symbols-outlined text-slate-200 text-4xl mb-2">person_search</span>
                            <p className="text-xs text-slate-400 italic mb-4">No se encontraron resultados</p>
                          </div>
                        ) : (
                          filteredClients.map((client) => (
                            <button
                              key={client._id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({...formData, client: client.name});
                                setShowClientDropdown(false);
                                setClientSearch('');
                              }}
                              className={`w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-between group-item ${formData.client === client.name ? 'bg-primary/5 text-primary' : 'text-slate-600 dark:text-slate-400'}`}
                            >
                              <div className="flex flex-col">
                                <span className="font-bold text-sm">{client.name}</span>
                                <span className="text-[10px] opacity-60">{client.industry || 'General'}</span>
                              </div>
                              {formData.client === client.name && (
                                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                              )}
                            </button>
                          ))
                        )}
                        
                        <div className="p-2 border-t border-primary/5 bg-slate-50/50 dark:bg-white/5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowFullClientModal(true);
                            }}
                            className="w-full py-3 flex items-center justify-center gap-2 text-primary hover:bg-primary/5 rounded-xl transition-all group/add"
                          >
                            <span className="material-symbols-outlined text-sm group-hover/add:rotate-90 transition-transform">add_circle</span>
                            <span className="text-[11px] font-black uppercase tracking-widest">Añadir Nuevo Cliente</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-primary/5 border-t border-primary/5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({...formData, client: ''});
                        setShowClientDropdown(false);
                      }}
                      className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Limpiar Selección
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Specialized Metadata Fields removed for Photography */}

      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
          {mode === 'reels' ? 'Descripción del Reel' : mode === 'art' ? 'Descripción del Arte' : mode === 'photo' ? 'Descripción de la Fotografía' : 'Descripción del Proyecto'}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-primary/20 bg-transparent outline-none focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-slate-100 min-h-[100px]"
          placeholder={mode === 'reels' ? 'Escribe aquí la descripción del reel...' : mode === 'art' ? 'Describe aquí los detalles de la obra...' : mode === 'photo' ? 'Escribe aquí los detalles de la fotografía...' : 'Describe los detalles del proyecto...'}
        />
      </div>

      <div>
        {mode !== 'reels' && (
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Galería y Medios</label>
        )}
        
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${mode === 'reels' ? 'mb-0' : 'mb-4'}`}>
          {formData.gallery.map((item, index) => (
            <div key={index} className="relative aspect-[9/16] sm:aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-primary/10 group">
              <img src={getMediaThumbnail(item) || null} className="w-full h-full object-cover" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                   type="button"
                  onClick={() => removeMedia(index)}
                  className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
              {item.type === 'video' && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[8px] text-white font-bold uppercase tracking-widest">Video</div>
              )}
            </div>
          ))}
          {(mode === 'all' || mode === 'photo' || mode === 'art') && (
            <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-primary/20 hover:border-primary/40 flex flex-col items-center justify-center cursor-pointer text-slate-400 group transition-all">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_a_photo</span>
              <span className="text-[10px] uppercase font-bold mt-2">Subir Foto</span>
            </label>
          )}
        </div>

        {(mode === 'all' || mode === 'reels') && (
          <div className={`bg-slate-50 dark:bg-primary/5 p-6 rounded-3xl border border-slate-200 dark:border-primary/10 ${mode === 'reels' && formData.gallery.length > 0 ? 'mt-6' : ''}`}>
            <label className="block text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">
              {mode === 'reels' ? 'Link Directo del Reel (YouTube / Instagram)' : 'Link de Video (YouTube / Instagram)'}
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-sm">link</span>
                <input
                  type="text"
                  value={mode === 'reels' ? (formData.gallery[0]?.url || '') : ytUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (mode === 'reels') {
                      const thumb = getYoutubeThumbnail(val) || getInstagramThumbnail(val);
                      setFormData(prev => ({
                        ...prev,
                        gallery: val ? [{ type: 'video', url: val }] : [],
                        imageUrl: thumb || prev.imageUrl
                      }));
                      setLivePreview(thumb);
                    } else {
                      setYtUrl(val);
                      const thumb = getYoutubeThumbnail(val) || getInstagramThumbnail(val);
                      setLivePreview(thumb);
                    }
                  }}
                  placeholder={mode === 'reels' ? "Pegar link aquí..." : "Pegar link aquí..."}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-primary/20 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              {mode !== 'reels' && (
                <button 
                   type="button"
                  onClick={() => {
                    addYoutubeVideo();
                    setLivePreview(null);
                  }}
                  disabled={!ytUrl.trim()}
                  className="px-6 py-3 bg-slate-900 dark:bg-primary text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  Añadir Video
                </button>
              )}
            </div>

            {mode === 'reels' && (
              <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100/50 dark:border-blue-500/10">
                <p className="text-[11px] text-blue-600 dark:text-blue-400 flex items-start gap-2 leading-relaxed">
                  <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                  <span>
                    <strong>Tip de Calidad:</strong> Prioriza subir tus reels a <strong>YouTube Shorts</strong>. Permite una integración más fluida y estable en tu portfolio que Instagram.
                  </span>
                </p>
              </div>
            )}

            <AnimatePresence>
              {livePreview && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-primary/10 shadow-sm">
                    <div className="relative w-20 aspect-[9/16] rounded-lg overflow-hidden border border-primary/5 bg-slate-100">
                      <img src={livePreview || null} className="w-full h-full object-cover" alt="Previsualización" />
                      <div className="absolute inset-0 bg-primary/10"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">¡Link Detectado!</p>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{ytUrl}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="material-symbols-outlined text-green-500 text-sm">per_point_on_surface</span>
                        <span className="text-[10px] text-slate-400 font-bold">Previsualización lista</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {mode === 'reels' && formData.gallery.length === 0 && (
              <p className="mt-4 text-[11px] text-slate-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Se generará una miniatura automática para tu reel.
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-xl ${
          loading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 active:scale-[0.98] shadow-primary/20'
        }`}
      >
        {loading ? 'Guardando...' : project ? 'Actualizar Cambios' : mode === 'reels' ? 'Guardar Reel' : mode === 'art' ? 'Guardar Arte' : mode === 'photo' ? 'Guardar Fotografía' : 'Guardar en Silo'}
      </button>

      {uploadStatus.message && (
        <p className={`text-center font-bold ${uploadStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {uploadStatus.message}
        </p>
      )}
    </form>

    <AnimatePresence>
      {showFullClientModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-10 shadow-2xl border border-primary/10 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-slate-100">Nuevo Cliente</h3>
              <button 
                 type="button"
                onClick={() => setShowFullClientModal(false)}
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-primary/5 flex items-center justify-center hover:bg-slate-100 transition-all"
              >
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
            <ClientForm 
              onSuccess={handleClientSuccess}
              onCancel={() => setShowFullClientModal(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}
