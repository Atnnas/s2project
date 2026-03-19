"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);

  // Link oficial proporcionado por el usuario
  const calendarUrl = "https://calendar.app.google/q59wA3H5xwSxBxkD6"; 
  const userEmail = "info@s2-project.com"; 

  return (
    <section className="w-full max-w-5xl mx-auto px-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-primary/5 group"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000" />
        
        <div className="relative z-10 p-10 md:p-16 text-center space-y-10">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full"
            >
              Disponibilidad Inmediata
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900">
              Reserva tu <span className="text-primary italic">Sesión Creativa</span>
            </h2>
            <p className="text-slate-500 font-body max-w-xl mx-auto text-lg leading-relaxed">
              Elige el momento perfecto para conversar sobre tu proyecto. Sin correos de ida y vuelta, directo a nuestro calendario.
            </p>
          </div>

          {!isOpen ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-6 rounded-2xl font-display font-bold uppercase tracking-widest overflow-hidden transition-all shadow-xl shadow-slate-900/20"
            >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Ver Horarios Disponibles
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">calendar_month</span>
              </span>
            </motion.button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative"
            >
              <iframe 
                src={calendarUrl}
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="yes"
                className="bg-white"
              />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg hover:text-primary transition-colors z-20"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </motion.div>
          )}

          <div className="pt-6 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Sincronización Google</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">notifications_active</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Recordatorios SMS/Email</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">videocam</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Link de Meet Automático</span>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
