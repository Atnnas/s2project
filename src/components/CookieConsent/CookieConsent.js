'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[420px] z-[500]"
        >
          <div className="bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 p-6 sm:p-7 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                <span className="material-symbols-outlined text-[#fdf9e1] text-2xl">cookie</span>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-black uppercase tracking-widest text-[#fdf9e1] mb-1">
                    Configuración de Cookies
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/70 font-body leading-relaxed">
                    Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico del portfolio cinematográfico.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-3 bg-[#fdf9e1] text-primary-dark text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md font-display"
                  >
                    Aceptar Todo
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-4 py-3 bg-white/10 text-[#fdf9e1] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/5 font-display"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
