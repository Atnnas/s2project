'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full py-24 px-[clamp(1.5rem,6vw,6rem)] bg-background relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
        <span className="text-[20vw] font-display font-black leading-none uppercase tracking-tighter text-primary-dark whitespace-nowrap">
          S2 PROJECT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-[1920px] mx-auto relative z-10">
        
        {/* Card 1: Contacto & Cita — Institutional Green Authority */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden bg-primary rounded-[3.5rem] p-10 md:p-16 border border-primary/20 flex flex-col justify-between min-h-[520px] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(57,101,66,0.4)]"
        >
          <div className="relative z-10">
            <h2 className="text-white mb-10 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] font-black uppercase tracking-tighter">
              Estrategia & <br />
              <span className="text-white italic opacity-80">Planificación</span>
            </h2>
            
            <div className="space-y-8 mb-12">
              <a href="tel:+50660060026" className="flex items-center gap-6 text-white hover:opacity-80 transition-all group/item">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm transition-all group-hover/item:bg-white group-hover/item:text-primary">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-black opacity-50">Llámanos</span>
                  <span className="text-xl font-body font-bold">+506 6006 0026</span>
                </div>
              </a>
              
              <a href="mailto:info@s2-project.com" className="flex items-center gap-6 text-white hover:opacity-80 transition-all group/item">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm transition-all group-hover/item:bg-white group-hover/item:text-primary">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-black opacity-50">Escríbenos</span>
                  <span className="text-xl font-body font-bold">info@s2-project.com</span>
                </div>
              </a>
            </div>
          </div>

          <Link 
            href="https://calendar.app.google/zadeELEGddkDxJ829"
            target="_blank"
            className="relative z-10 w-full py-7 bg-[#fdf9e1] text-primary font-display font-black uppercase tracking-[0.25em] text-[13px] text-center rounded-[1.5rem] hover:bg-white transition-all active:scale-[0.98] shadow-2xl shadow-black/20"
          >
            Agende su cita
          </Link>
        </motion.div>

        {/* Card 2: WhatsApp — Institutional Green Authority */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden bg-primary rounded-[3.5rem] p-10 md:p-16 border border-primary/20 flex flex-col justify-between min-h-[520px] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(57,101,66,0.4)]"
        >
          <div className="relative z-10">
            <h2 className="text-white mb-10 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] font-black uppercase tracking-tighter">
              Atención <br />
              <span className="text-white italic opacity-80">Inmediata</span>
            </h2>
            
            <p className="text-white opacity-90 font-body text-xl md:text-2xl font-medium max-w-sm leading-tight mb-12 tracking-tight">
              ¿Tienes un proyecto en mente? Chatea con nuestro equipo ahora mismo para una respuesta prioritaria.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-black uppercase tracking-widest text-white">Respuesta rápida</span>
              <span className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-black uppercase tracking-widest text-white">Consultas 24/7</span>
            </div>
          </div>

          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="relative z-10 w-full py-7 bg-[#fdf9e1] text-primary font-display font-black uppercase tracking-[0.25em] text-[13px] text-center rounded-[1.5rem] hover:bg-white transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            Iniciar Conversación
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
