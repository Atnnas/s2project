"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-[clamp(160px,18vh,220px)] pb-6 flex items-center justify-center overflow-hidden bg-white">
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

      <div className="container mx-auto px-[clamp(1.5rem,6vw,6rem)] relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-1">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2"
          >
            <span className="h-[1px] w-8 bg-primary/40"></span>
            <span className="text-[10px] font-black uppercase tracking-[1em] text-primary">S2 PROJECT</span>
            <span className="h-[1px] w-8 bg-primary/40"></span>
          </motion.div>

          {/* Main Title - Ethereal & Powerful */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.5rem,5.5vw,4rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.95] pt-2"
          >
            La agencia que tu marca <br />
            estaba <span className="text-primary italic relative inline-block">
              esperando
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="absolute -bottom-2 left-0 h-2 bg-primary/10 -z-10"
              />
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
