'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full bg-white relative z-30 -mt-10 md:-mt-16 pb-12 px-[clamp(1.5rem,6vw,6rem)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          
          {/* Calendar Quick Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <Link 
              href="https://calendar.app.google/zadeELEGddkDxJ829"
              target="_blank"
              className="flex items-center justify-between p-6 md:p-8 bg-slate-900 rounded-[30px] border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-slate-800"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                </div>
                <div>
                  <h3 className="text-white font-display font-bold uppercase tracking-widest text-[10px] md:text-xs">Agenda Estrategia</h3>
                  <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-0.5">Disponibilidad en línea</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">arrow_outward</span>
            </Link>
          </motion.div>

          {/* WhatsApp Quick Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative"
          >
            <Link 
              href="https://api.whatsapp.com/send?phone=50660060026"
              target="_blank"
              className="flex items-center justify-between p-6 md:p-8 bg-white rounded-[30px] border border-slate-100 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-slate-200"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-xl">chat</span>
                </div>
                <div>
                  <h3 className="text-slate-900 font-display font-bold uppercase tracking-widest text-[10px] md:text-xs">Contacto Directo</h3>
                  <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-0.5">Respuesta inmediata</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_outward</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
