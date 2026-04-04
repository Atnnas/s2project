"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background-light">
      {/* Premium Background Elements - Ethereal Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[140px] -z-10" 
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-[1px] w-8 bg-primary/40"></span>
            <span className="text-[10px] font-black uppercase tracking-[1em] text-primary">S2 PROJECT ELITE</span>
            <span className="h-[1px] w-8 bg-primary/40"></span>
          </motion.div>

          {/* Main Title - Ethereal & Powerful */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]"
          >
            Arquitectos de <br />
            <span className="text-primary italic relative inline-block">
              Legados
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-2 bg-primary/10 -z-10"
              />
            </span> <br />
            Digitales
          </motion.h1>

          {/* Subtitle - The Promise */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-xl md:text-3xl text-slate-500 font-body max-w-3xl mx-auto leading-relaxed tracking-tight"
          >
            Elevamos tu Marca al Nivel de las <span className="text-slate-900 font-bold italic">Leyendas</span>. 
            Estrategia de crecimiento integral para audiencias imparables.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8"
          >
            <a 
              href="#servicios-core" 
              className="group relative px-12 py-7 bg-slate-900 text-white rounded-full font-display font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Explorar Estrategia
                <span className="material-symbols-outlined text-sm">north_east</span>
              </span>
            </a>

            <a 
              href="/#contacto" 
              className="group flex items-center gap-4 text-slate-900 font-display font-black uppercase tracking-widest text-xs hover:text-primary transition-colors"
            >
              Análisis Gratis
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-sm">analytics</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-400">Deslizar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
