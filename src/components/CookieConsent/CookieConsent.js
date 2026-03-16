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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[400px] z-[500]"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-primary/10 p-6 rounded-3xl shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">cookie</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">
                    Configuración de Cookies
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico del portfolio cinematográfico.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Aceptar Todo
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all"
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
