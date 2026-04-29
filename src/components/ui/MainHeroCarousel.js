'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Estrategia de Legado",
    subtitle: "No solo creamos contenido, construimos imperios digitales.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Producción de Élite",
    subtitle: "Reels y Artes Digitales que capturan la esencia de tu marca.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Impacto Real",
    subtitle: "Resultados que se traducen en crecimiento y autoridad.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000",
  }
];

export default function MainHeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Ken Burns Effect Image */}
          <motion.div
            initial={{ scale: 1.1, x: -20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[current].image})` }}
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
                {slides[current].title.split(' ').map((word, i) => (
                  <span key={i} className={i === slides[current].title.split(' ').length - 1 ? "text-primary italic block" : "block"}>
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
                {slides[current].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 right-[clamp(1.5rem,6vw,6rem)] z-30 flex gap-4">
        {slides.map((_, i) => (
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
