"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingSection() {
  const [step, setStep] = useState('initial'); // 'initial' or 'redirected'

  // Link oficial proporcionado por el usuario
  const calendarUrl = "https://calendar.app.google/zadeELEGddkDxJ829"; 
  const userEmail = "info@s2-project.com"; 

  const handleBooking = () => {
    // Abrir en pestaña nueva con seguridad rel="noopener noreferrer"
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
    // Cambiar al paso de confirmación visual
    setStep('redirected');
  };

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

          {step === 'initial' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBooking}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl mx-auto rounded-[2rem] bg-slate-50 border border-primary/10 p-10 md:p-16 relative overflow-hidden group"
            >
              {/* Subtle background pulse */}
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl animate-bounce">check_circle</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 uppercase tracking-tight">
                  ¡Calendario Abierto con Éxito!
                </h3>
                
                <div className="space-y-4 text-slate-500 font-body text-base max-w-md mx-auto">
                    <p>
                      Hemos abierto el sistema de reservas en una <span className="text-primary font-bold">nueva ventana</span> para garantizar 100% de seguridad en tu dispositivo.
                    </p>
                    <p className="text-sm italic">
                      Por favor, completa tu reserva allí. Una vez finalices, recibirás una confirmación por correo.
                    </p>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setStep('initial')}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-black uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Reiniciar proceso
                  </button>
                  
                  <div className="hidden sm:block w-px h-4 bg-slate-200" />

                  <a 
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    Abrir de nuevo si se cerró
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>
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
