"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingSection() {
  const [isOpen, setIsOpen] = useState(false);

  // Reemplaza este URL con tu link oficial de Google Calendar Appointment Schedule (Opción 1)
  // Para obtenerlo: Ve a tu Google Calendar -> Pulsa en tu bloque de Citas -> Compartir -> Inserción en sitios web
  const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZss01v5Z9uX1Y3C0B1B3B2B1B1B1B1-example"; // Placeholder con tu cuenta
  const userEmail = "david.artavia.rodriguez@gmail.com"; 

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
                scrolling="no"
                className="bg-white"
              />
              
              {/* Overlay for Placeholder State */}
              {(calendarUrl.includes("example") || calendarUrl.includes("placeholder")) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-md">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-4xl">link_off</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Configuración para {userEmail}</h3>
                  <p className="text-sm text-slate-500 max-w-xs mb-8">
                    Ya tenemos tu cuenta vinculada. Para activar las citas, solo pega el link de "Página de Citas" de Google Calendar en el código del componente.
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href={`https://calendar.google.com/calendar/u/0/r/settings/appointment-schedules`} 
                      target="_blank"
                      className="text-xs font-black uppercase tracking-widest bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-primary transition-colors"
                    >
                      Configurar citas en Google
                    </a>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors px-6"
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              )}
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
