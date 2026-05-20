'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PremiumGalleryGrid({ items = [] }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);

  // RANDOM SHUFFLE - Runs only on client mount to ensure the content is random but positions are stable
  useEffect(() => {
    if (items.length === 0) return;
    
    // Create a copy and shuffle it
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffledItems(shuffled);
  }, [items]);

  if (items.length === 0) return null;

  // Use shuffled items if available, otherwise fallback to original
  const displayItems = shuffledItems.length > 0 ? shuffledItems : items;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 auto-rows-fr">
        {displayItems.map((item, index) => {
          // ALWAYS THE FIRST ONE IS BIG (ON THE LEFT)
          const isHero = index === 0;
          
          return (
            <GalleryCard 
              key={`${item.url}-${index}`} 
              item={item} 
              index={index} 
              isHero={isHero}
              onClick={() => setSelectedItem(item)} 
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
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

function GalleryCard({ item, index, isHero, onClick }) {
  const isReel = !!item.videoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 4) * 0.1, duration: 0.8, ease: "easeOut" }}
      className={`group cursor-pointer relative ${isHero ? 'col-span-2 md:col-span-2 md:row-span-2' : 'col-span-1'}`}
      onClick={onClick}
    >
      {/* VIVID AURA */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-transparent to-accent-light/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

      {/* MAIN CONTAINER */}
      <div className={`relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] group-hover:shadow-[0_40px_80px_-20px_rgba(57,101,66,0.25)] transition-all duration-700 group-hover:-translate-y-2 md:group-hover:-translate-y-4 ${
        isHero 
          ? 'aspect-square md:aspect-auto' 
          : (isReel ? 'aspect-[9/16]' : 'aspect-[4/5]')
      }`}>
        
        <div className="absolute inset-0">
          <img 
            src={item.url} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 bg-black/5">
           <div className={`rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${isHero ? 'w-24 h-24' : 'w-16 h-16'}`}>
              <span className={`material-symbols-outlined drop-shadow-lg ${isHero ? 'text-4xl' : 'text-2xl'}`}>
                {item.videoUrl ? 'play_arrow' : 'visibility'}
              </span>
           </div>
        </div>

        <div className="absolute inset-0 border border-white/5 rounded-[1.5rem] md:rounded-[3.5rem] group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

function GalleryModal({ project, onClose }) {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
      embedUrl = url.replace('watch?v=', 'embed/') + '?autoplay=1&rel=0';
    }
    else if (url.includes('youtu.be/')) {
      const id = url.split('/').pop().split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    else if (url.includes('youtube.com/shorts/')) {
      embedUrl = url.replace('shorts/', 'embed/') + '?autoplay=1&rel=0';
    }
    else if (url.includes('vimeo.com/')) {
      if (url.includes('player.vimeo.com/video/')) {
        embedUrl = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
      } else {
        const id = url.split('/').pop().split('?')[0];
        embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
    }
    else if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
      const basePath = url.split('?')[0];
      const cleanPath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
      embedUrl = `${cleanPath}/embed/`;
    }
    return embedUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
    >
      <div 
        className={`absolute inset-0 transition-colors duration-500 backdrop-blur-3xl ${
          project.videoUrl ? 'bg-black/95 md:bg-[#cadedd]/95' : 'bg-[#cadedd]/95'
        }`} 
        onClick={onClose} 
      />
      
      <button
        className={`absolute top-6 right-6 z-[310] h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full transition-all duration-500 shadow-2xl ${
          project.videoUrl 
            ? 'bg-white/20 text-white md:bg-white md:text-primary hover:bg-white/30' 
            : 'bg-white text-primary hover:bg-primary hover:text-white'
        }`}
        onClick={onClose}
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className={`relative z-[305] w-full max-w-7xl h-full max-h-[92vh] lg:max-h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-y-auto lg:overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row ${
          project.videoUrl ? 'bg-black md:bg-white' : 'bg-white'
        }`}
      >
        <div className={`w-full shrink-0 bg-black relative flex items-center justify-center mx-auto ${
          project.videoUrl 
            ? 'h-[65vh] max-w-[412px] md:max-w-none md:h-[70vh] lg:h-full lg:flex-[1.5]' 
            : 'aspect-[4/3] max-h-[50vh] lg:aspect-auto lg:h-full lg:flex-[1.5]'
        }`}>
          {project.videoUrl ? (
            <iframe
              src={getEmbedUrl(project.videoUrl)}
              className="w-full h-full absolute inset-0 border-0"
              allow="autoplay; fullscreen"
            />
          ) : (
            <img src={project.url} className="w-full h-full object-contain p-4 absolute inset-0" />
          )}
        </div>

        <div className={`flex-1 p-6 md:p-16 flex flex-col justify-center transition-colors duration-500 ${
          project.videoUrl 
            ? 'bg-zinc-950 text-white md:bg-[#f8f9fa] md:text-slate-600' 
            : 'bg-[#f8f9fa] text-slate-600'
        }`}>
           <div className="space-y-6 md:space-y-8">
              <header>
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                  <span className="w-8 md:w-10 h-[2px] bg-primary" />
                  <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] ${
                    project.videoUrl ? 'text-zinc-400 md:text-primary' : 'text-primary'
                  }`}>Project Showcase</span>
                </div>
                <h2 className={`text-2xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 ${
                  project.videoUrl ? 'text-white md:text-primary-dark' : 'text-primary-dark'
                }`}>
                  {project.title}
                </h2>
              </header>

              <p className={`text-sm md:text-lg font-body leading-relaxed font-light ${
                project.videoUrl ? 'text-zinc-300 md:text-slate-600' : 'text-slate-600'
              }`}>
                {project.description || "Una visión artística ejecutada con precisión técnica para elevar el estándar de la marca."}
              </p>

              <div className={`grid grid-cols-2 gap-4 md:gap-8 py-4 md:py-8 border-y ${
                project.videoUrl ? 'border-zinc-800 md:border-slate-200' : 'border-slate-200'
              }`}>
                 <div className="space-y-1">
                    <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                      project.videoUrl ? 'text-zinc-500 md:text-slate-400' : 'text-slate-400'
                    }`}>Categoría</p>
                    <p className={`text-xs md:text-sm font-bold uppercase tracking-tight ${
                      project.videoUrl ? 'text-zinc-200 md:text-primary-dark' : 'text-primary-dark'
                    }`}>{project.subcategory || (project.videoUrl ? 'Cinematografía' : 'Diseño Digital')}</p>
                 </div>
                 <div className="space-y-1">
                    <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                      project.videoUrl ? 'text-zinc-500 md:text-slate-400' : 'text-slate-400'
                    }`}>Año</p>
                    <p className={`text-xs md:text-sm font-bold uppercase tracking-tight ${
                      project.videoUrl ? 'text-zinc-200 md:text-primary-dark' : 'text-primary-dark'
                    }`}>{project.date || new Date().getFullYear()}</p>
                 </div>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                className="group/btn relative w-full bg-primary text-white px-6 py-4 md:px-8 md:py-6 rounded-2xl font-display font-black uppercase tracking-[0.2em] text-xs hover:bg-primary-dark transition-all duration-500 shadow-xl overflow-hidden flex items-center justify-center gap-4 mt-2"
              >
                <span className="relative z-10">Agendar Consulta</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
