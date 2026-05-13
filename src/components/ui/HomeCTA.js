'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomeCTA() {
  return (
    <section className="w-full py-16 px-[clamp(1.5rem,6vw,6rem)] bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1920px] mx-auto">
        
        {/* Card 1: Contacto & Cita — Institutional Green Authority */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden bg-primary rounded-[3rem] p-10 md:p-14 border border-primary/20 flex flex-col justify-between min-h-[480px] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30"
        >
          <div className="relative z-10">
            <h2 className="text-white mb-8">
              Estrategia & <br />
              <span className="text-white italic">Planificación</span>
            </h2>
            
            <div className="space-y-6 mb-12">
              <a href="tel:+50660060026" className="flex items-center gap-5 text-white hover:opacity-80 transition-all group/item">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm transition-all">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black opacity-50">Llámanos</span>
                  <span className="text-lg font-body font-bold">+506 6006 0026</span>
                </div>
              </a>
              
              <a href="mailto:info@s2-project.com" className="flex items-center gap-5 text-white hover:opacity-80 transition-all group/item">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm transition-all">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black opacity-50">Escríbenos</span>
                  <span className="text-lg font-body font-bold">info@s2-project.com</span>
                </div>
              </a>
            </div>
          </div>

          <Link 
            href="https://calendar.app.google/zadeELEGddkDxJ829"
            target="_blank"
            className="relative z-10 w-full py-6 bg-[#fdf9e1] text-primary font-display font-black uppercase tracking-widest text-center rounded-2xl hover:bg-[#fdf9e1]/90 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
          >
            Agende su cita
          </Link>
        </motion.div>

        {/* Card 2: WhatsApp — Institutional Green Authority */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group overflow-hidden bg-primary rounded-[3rem] p-10 md:p-14 border border-primary/20 flex flex-col justify-between min-h-[480px] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30"
        >
          <div className="relative z-10">
            <h2 className="text-white mb-8">
              Atención <br />
              <span className="text-white italic">Inmediata</span>
            </h2>
            
            <p className="text-white opacity-90 font-body text-lg max-w-sm leading-relaxed mb-12">
              ¿Tienes un proyecto en mente o una urgencia creativa? Chatea con nuestro equipo ahora mismo para una respuesta prioritaria.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white/70">Respuesta rápida</span>
              <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white/70">Consultas 24/7</span>
            </div>
          </div>

          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="relative z-10 w-full py-6 bg-[#fdf9e1] text-primary font-display font-black uppercase tracking-widest text-center rounded-2xl hover:bg-[#fdf9e1]/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-black/10"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            Iniciar Conversación
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
