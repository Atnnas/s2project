'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const routes = [
  { path: '/', label: 'Inicio', desc: 'Regreso al origen.', icon: 'home' },
  { path: '/nosotros', label: 'Nosotros', desc: 'Quiénes somos.', icon: 'group' },
  { path: '/servicios', label: 'Servicios', desc: 'Nuestra oferta.', icon: 'layers' },
  { path: '/proceso', label: 'Proceso', desc: 'Cómo trabajamos.', icon: 'auto_fix_high' },
  { path: '/portafolio', label: 'Portafolio', desc: 'Nuestro legado.', icon: 'grid_view' },
];

export default function HomeDynamicGrid() {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentRoute, setCurrentRoute] = useState(0);

  useEffect(() => {
    fetch('/api/home-banners')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const gridBanners = data.data.filter(b => b.type === 'grid');
          setBanners(gridBanners);
        }
      });

    // Auto-rotate route carousel
    const routeTimer = setInterval(() => {
      setCurrentRoute(prev => (prev + 1) % routes.length);
    }, 4500);

    // Auto-rotate banners
    const bannerTimer = setInterval(() => {
      if (banners.length > 1) {
        setCurrentBanner(prev => (prev + 1) % banners.length);
      }
    }, 7000);

    return () => {
      clearInterval(routeTimer);
      clearInterval(bannerTimer);
    };
  }, [banners.length]);

  return (
    <section className="w-full bg-white py-12 px-[clamp(1.5rem,6vw,6rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
        
        {/* 2/3 Dynamic Banner Section */}
        <div className="lg:col-span-2 relative overflow-hidden group min-h-[400px]">
          <AnimatePresence mode="wait">
            {banners.length > 0 ? (
              <motion.div
                key={banners[currentBanner]._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full"
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="w-full h-full"
                >
                  <div 
                    className="w-full h-full bg-cover"
                    style={{ 
                      backgroundImage: `url(${banners[currentBanner].imageUrl})`,
                      backgroundPosition: banners[currentBanner].focalPoint === 'top' ? 'center top' : banners[currentBanner].focalPoint === 'bottom' ? 'center bottom' : 'center center'
                    }}
                  />
                </motion.div>
                
                {/* Overlay with Glassmorphism Text */}
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors duration-500" />
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="backdrop-blur-md bg-white/10 border border-white/20 p-8 max-w-lg"
                  >
                    <h3 className="text-3xl font-display font-black uppercase text-white mb-2 leading-tight">
                      {banners[currentBanner].title}
                    </h3>
                    <p className="text-white/80 text-sm font-body">
                      {banners[currentBanner].subtitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Sin contenido dinámico disponible</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 1/3 Route Carousel Section */}
        <div className="lg:col-span-1 bg-slate-900 overflow-hidden relative flex flex-col justify-center min-h-[400px]">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mt-16 -mr-16" />
           <div className="relative z-10 px-8">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[8px] mb-8 block">Explora el sitio</span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoute}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-8">
                    <span className="material-symbols-outlined text-3xl">{routes[currentRoute].icon}</span>
                  </div>
                  
                  <h4 className="text-4xl font-display font-black uppercase text-white tracking-tighter leading-none">
                    {routes[currentRoute].label}
                  </h4>
                  <p className="text-slate-400 text-sm font-body max-w-[200px]">
                    {routes[currentRoute].desc}
                  </p>
                  
                  <Link 
                    href={routes[currentRoute].path}
                    className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] group/btn pt-4"
                  >
                    Ir a la sección
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform text-primary">arrow_forward</span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots for routes */}
              <div className="flex gap-2 mt-12">
                {routes.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 transition-all duration-500 ${i === currentRoute ? 'w-8 bg-primary' : 'w-2 bg-white/10'}`}
                  />
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
