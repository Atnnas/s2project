'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PremiumGalleryGrid({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Option 5: Split-Screen High-Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {items.map((item, index) => {
          // Logic for Option 5: Large Hero blocks alternating with smaller ones
          // Pattern: Large (2x2), Small, Small, Large (2x2), etc.
          const isHero = index % 5 === 0; // Every 5th item is a Hero (spanning 2 columns and 2 rows potentially, or just width)
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`group cursor-pointer relative ${isHero ? 'md:col-span-2 md:row-span-2' : 'col-span-1'}`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[30px] md:rounded-[50px] shadow-2xl transition-all duration-700 group-hover:shadow-primary/30 group-hover:-translate-y-2">
                <div className={`relative w-full h-full ${isHero ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-[4/5]'}`}>
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-[#9eb5b2]/80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content for Split-Screen style */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 text-primary ${isHero ? 'w-16 h-16' : 'w-12 h-12'}`}>
                             <span className={`material-symbols-outlined ${isHero ? 'text-3xl' : 'text-xl'}`}>
                              {item.videoUrl ? 'play_arrow' : 'image'}
                             </span>
                          </div>
                          <span className={`font-black uppercase tracking-[0.4em] text-primary ${isHero ? 'text-[12px]' : 'text-[10px]'}`}>
                            {item.videoUrl ? 'Motion Showcase' : 'Digital Art'}
                          </span>
                       </div>

                       <h3 className={`text-white font-display font-black uppercase tracking-tighter leading-none ${isHero ? 'text-4xl md:text-6xl' : 'text-2xl'}`}>
                         {item.title}
                       </h3>

                       {isHero && (
                         <motion.p 
                           initial={{ opacity: 0, y: 10 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           className="text-slate-300 font-body text-sm md:text-base max-w-md line-clamp-2"
                         >
                           {item.description || "Explora este proyecto destacado diseñado con los más altos estándares de calidad por S2 Project."}
                         </motion.p>
                       )}

                       <div className="pt-4 flex items-center gap-4 text-white/40 group-hover:text-primary transition-colors duration-300">
                          <span className="h-[1px] w-8 bg-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ver Detalles</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <GalleryModal 
            project={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal remains consistent but with slightly more luxury touches
function GalleryModal({ project, onClose }) {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) embedUrl = url.replace('watch?v=', 'embed/') + '?autoplay=1&rel=0';
    else if (url.includes('youtu.be/')) {
      const id = url.split('/').pop().split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    else if (url.includes('youtube.com/shorts/')) embedUrl = url.replace('shorts/', 'embed/') + '?autoplay=1&rel=0';
    return embedUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-[#9eb5b2]/95 backdrop-blur-3xl" onClick={onClose} />
      
      <button
        className="absolute top-6 right-6 z-[310] h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-all duration-500 hover:rotate-90"
        onClick={onClose}
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="relative z-[305] w-full max-w-7xl h-full max-h-[90vh] bg-[#9eb5b2] rounded-[40px] md:rounded-[80px] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row"
      >
        <div className="flex-[2] bg-black relative flex items-center justify-center group/media">
          {project.videoUrl ? (
            <iframe
              src={getEmbedUrl(project.videoUrl)}
              className="w-full h-full aspect-video md:aspect-auto"
              allow="autoplay; fullscreen"
            />
          ) : (
            <img src={project.url} className="w-full h-full object-contain" />
          )}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[40px] md:rounded-[80px]" />
        </div>

        <div className="flex-1 p-8 md:p-20 flex flex-col justify-center bg-[#9eb5b2] border-l border-white/5 overflow-y-auto">
           <div className="space-y-10">
              <header>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[1px] bg-primary" />
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em]">Project Archive</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                  {project.title}
                </h2>
              </header>

              <div className="space-y-6">
                <p className="text-slate-400 font-body text-lg leading-relaxed italic">
                  &quot;{project.description || "Una visión artística ejecutada con precisión técnica para elevar el estándar de la marca."}&quot;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tipo</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">{project.videoUrl ? 'Cinematografía' : 'Arte Digital'}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Año</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">2024 Collection</p>
                 </div>
              </div>

              <div className="pt-4">
                <button className="group/btn relative w-full bg-white text-black px-12 py-6 rounded-full font-display font-black uppercase tracking-[0.2em] text-xs hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl overflow-hidden">
                  <span className="relative z-10">Agendar Consulta</span>
                  <div className="absolute inset-0 bg-[#9eb5b2] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
