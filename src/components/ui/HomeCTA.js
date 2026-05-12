'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full py-10 px-[clamp(1.5rem,6vw,6rem)] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Calendar Action - Wide Horizontal Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Link 
            href="https://calendar.app.google/zadeELEGddkDxJ829"
            target="_blank"
            className="group flex items-center justify-between px-10 py-6 bg-[#1d2729] rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl w-full"
          >
            <div className="flex flex-col">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[9px] leading-none mb-1">Disponibilidad 1:1</span>
              <span className="text-white font-display font-black uppercase tracking-widest text-sm md:text-base">Agendar Estrategia Digital</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
          </Link>
        </motion.div>

        {/* WhatsApp Action - Wide Horizontal Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="group flex items-center justify-between px-10 py-6 bg-white rounded-full border border-slate-200 hover:border-primary/50 transition-all duration-500 shadow-lg w-full"
          >
            <div className="flex flex-col">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[9px] leading-none mb-1">Atención Inmediata</span>
              <span className="text-slate-900 font-display font-black uppercase tracking-widest text-sm md:text-base">Contacto Directo por WhatsApp</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <span className="material-symbols-outlined text-xl">chat</span>
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
