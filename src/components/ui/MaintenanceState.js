'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MaintenanceState({ 
  category = "Esta sección",
  icon = "construction",
  message = "Estamos preparando una experiencia visual increíble para ti." 
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square bg-primary/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-primary/20 flex items-center justify-center mx-auto mb-10 shadow-2xl"
        >
          <span className="material-symbols-outlined text-5xl text-primary">{icon}</span>
        </motion.div>

        <p className="text-primary text-xs font-black uppercase tracking-[0.5em] mb-6">S2 PROJECT • PRÓXIMAMENTE</p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter text-slate-900 mb-8 leading-none">
          {category} <br/>
          <span className="text-primary/40 text-[0.8em]">En Producción</span>
        </h1>

        <div className="h-1 w-20 bg-primary mx-auto mb-10 rounded-full" />

        <p className="text-xl text-slate-500 font-body mb-12 max-w-lg mx-auto leading-relaxed">
          {message} Mientras tanto, puedes contactarnos para cotizar tus proyectos personalizados.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            Consultar por WhatsApp
          </Link>
          <Link 
            href="/servicios"
            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
          >
            Nuestros Servicios
          </Link>
        </div>
      </motion.div>

      {/* Floating Elements Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              x: [0, (i % 2 === 0 ? 100 : -100), 0],
              y: [0, (i % 3 === 0 ? 80 : -80), 0],
              opacity: [0, 0.2, 0]
            }}
            transition={{ 
              duration: 15 + i * 2, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-primary rounded-full hidden md:block"
            style={{ 
              left: `${15 + i * 15}%`, 
              top: `${20 + (i % 3) * 25}%` 
            }}
          />
        ))}
      </div>
    </div>
  );
}
