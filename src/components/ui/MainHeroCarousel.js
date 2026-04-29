'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/home-banners')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const heroBanners = data.data.filter(b => b.type === 'hero');
          setBanners(heroBanners);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading) return <div className="w-full h-[85vh] bg-slate-900 animate-pulse" />;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[current]._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Ken Burns Effect Image */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="w-full h-full bg-cover"
              style={{ 
                backgroundImage: `url(${banners[current].imageUrl})`,
                backgroundPosition: banners[current].focalPoint === 'top' ? 'center top' : banners[current].focalPoint === 'bottom' ? 'center bottom' : 'center center'
              }}
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-[clamp(1.5rem,6vw,6rem)]">
            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-block text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-md"
              >
                S2 Project • Boutique Agency
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.5rem,8vw,6rem)] font-display font-black uppercase text-white leading-[0.85] tracking-tighter mb-6"
              >
                {banners[current].title.split(' ').map((word, i) => (
                  <span key={i} className={i === banners[current].title.split(' ').length - 1 ? "text-primary italic block" : "block"}>
                    {word}
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-lg md:text-xl text-slate-300 font-body max-w-xl leading-relaxed"
              >
                {banners[current].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 right-[clamp(1.5rem,6vw,6rem)] z-30 flex gap-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative w-12 h-1 overflow-hidden bg-white/20 transition-all hover:h-2"
          >
            <div 
              className={`absolute top-0 left-0 h-full bg-primary transition-all duration-[6000ms] ease-linear ${i === current ? 'w-full' : 'w-0'}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
