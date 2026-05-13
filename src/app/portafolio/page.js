"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "reels",
    title: "REELS",
    href: "/reels",
    image: "/reels-cover.png",
    desc: "Narrativa dinámica y cinematografía de alto impacto."
  },
  {
    id: "artes",
    title: "ARTES",
    href: "/digital-arts",
    image: "/artes-cover.png",
    desc: "Diseño estratégico y creatividad digital sin límites."
  }
];

export default function PortafolioPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center pt-[clamp(8rem,14vh,10rem)] pb-12 overflow-x-hidden relative">
      
      {/* Brand Background Texture */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-slate-50/5 pointer-events-none" />

      {/* Header - Integrated with Site Aesthetic */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-10 text-center relative z-10 px-6"
      >

        <h1 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
          Nuestro <br className="md:hidden" /> <span className="text-primary italic">Trabajo</span>
        </h1>
        <div className="h-1 w-12 bg-primary mx-auto mt-6" />
      </motion.div>

      {/* Categories Grid - Symmetrical 2 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[850px] w-full px-[clamp(1.5rem,6vw,6rem)] relative z-10">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center group"
          >
            {/* Pill-shaped Card - Functionality from Reference */}
            <Link href={cat.href} className="w-full relative">
              <div className="relative aspect-square w-full rounded-[60px] md:rounded-[100px] overflow-hidden shadow-xl transition-all duration-700 group-hover:shadow-primary/20 group-hover:-translate-y-2">
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority={index === 0}
                />
                
                {/* Premium Overlay Layer */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[60px] md:rounded-[100px]" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                   <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                      <span className="material-symbols-outlined text-2xl">
                        {cat.id === 'reels' ? 'play_arrow' : 'auto_fix_high'}
                      </span>
                   </div>
                   <p className="mt-4 text-white font-display font-black uppercase tracking-[0.3em] text-[8px]">Explorar Categoría</p>
                </div>
              </div>
            </Link>

            {/* Typography & Call to Action */}
            <div className="mt-6 text-center space-y-3 px-6">
              <h2 className="text-2xl md:text-4xl font-display font-black uppercase tracking-[0.05em] text-slate-900 group-hover:text-primary transition-colors duration-300">
                {cat.title}
              </h2>
              <p className="text-[9px] md:text-[10px] font-body uppercase tracking-[0.2em] text-accent max-w-[250px] mx-auto leading-relaxed">
                {cat.desc}
              </p>
              
              <div className="pt-3">
                <Link 
                  href={cat.href}
                  className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-display font-black uppercase tracking-[0.2em] text-[9px] transition-all duration-500 hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 group/btn overflow-hidden relative"
                >
                  <span className="relative z-10">Ver Trabajo</span>
                  <span className="material-symbols-outlined text-xs relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
