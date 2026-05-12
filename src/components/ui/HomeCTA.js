'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full py-24 px-[clamp(1.5rem,6vw,6rem)] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Calendar Card - High Impact */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-slate-900 rounded-[40px] p-10 md:p-16 overflow-hidden flex flex-col justify-between min-h-[450px] shadow-2xl"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-primary/30" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                Disponibilidad Inmediata
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white leading-[0.85] tracking-tighter mb-6">
                Agenda tu <br />
                <span className="text-primary italic">Estrategia</span>
              </h2>
              <p className="text-slate-400 font-body text-sm md:text-base max-w-sm leading-relaxed mb-12">
                Reserva una sesión de 15 minutos para diagnosticar tu marca y definir una ruta de crecimiento real.
              </p>
            </div>

            <div className="relative z-10">
              <Link 
                href="https://calendar.app.google/zadeELEGddkDxJ829"
                target="_blank"
                className="group/btn relative inline-flex items-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-full font-display font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:bg-primary hover:text-white shadow-xl shadow-black/20"
              >
                Reservar en Calendario
                <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-2">calendar_month</span>
              </Link>
            </div>
            
            {/* Decorative Icon */}
            <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
               <span className="material-symbols-outlined text-[180px] text-white">event_available</span>
            </div>
          </motion.div>

          {/* Contact Card - Direct Access */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="group relative bg-[#f7f7f6] border border-slate-100 rounded-[40px] p-10 md:p-16 overflow-hidden flex flex-col justify-between min-h-[450px]"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 bg-slate-200 border border-slate-300 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                Contacto Directo
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-slate-900 leading-[0.85] tracking-tighter mb-6">
                Hablemos <br />
                <span className="text-primary italic">Ahora</span>
              </h2>
              <p className="text-slate-500 font-body text-sm md:text-base max-w-sm leading-relaxed mb-12">
                ¿Tienes una idea urgente? Escríbenos directamente y recibe atención personalizada de nuestro equipo creativo.
              </p>
            </div>

            <div className="relative z-10">
              <Link 
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                className="group/btn relative inline-flex items-center gap-4 bg-primary text-white px-10 py-6 rounded-full font-display font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:bg-slate-900 shadow-xl shadow-primary/20"
              >
                Iniciar Conversación
                <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-2">chat</span>
              </Link>
            </div>

            {/* Decorative Icon */}
            <div className="absolute bottom-10 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
               <span className="material-symbols-outlined text-[180px] text-slate-900">question_answer</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
