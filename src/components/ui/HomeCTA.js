'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full py-12 px-6 bg-white flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        
        {/* Calendar Action - Minimalist Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Link 
            href="https://calendar.app.google/zadeELEGddkDxJ829"
            target="_blank"
            className="group flex items-center gap-4 px-8 py-4 bg-[#1d2729] rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl"
          >
            <div className="flex flex-col">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[8px] leading-none mb-1">Agendar</span>
              <span className="text-white font-display font-black uppercase tracking-widest text-[11px]">Estrategia 1:1</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
            </div>
          </Link>
        </motion.div>

        {/* WhatsApp Action - Minimalist Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="group flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-200 hover:border-primary/50 transition-all duration-500 shadow-lg"
          >
            <div className="flex flex-col">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[8px] leading-none mb-1">Contacto</span>
              <span className="text-slate-900 font-display font-black uppercase tracking-widest text-[11px]">WhatsApp Directo</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">chat</span>
            </div>
          </Link>
        </motion.div>

      </div>
      
      {/* Subtext separator - Elegant Detail */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex items-center gap-4 opacity-20"
      >
        <div className="w-12 h-[1px] bg-slate-900" />
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-900">S2 Project • Legacy</span>
        <div className="w-12 h-[1px] bg-slate-900" />
      </motion.div>
    </section>
  );
}
