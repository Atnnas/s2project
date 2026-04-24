"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  // Número de WhatsApp proporcionado por el cliente
  const whatsappNumber = "50660060026";
  const whatsappMessage = encodeURIComponent("Hola S2, me interesa conocer como trabajan con marcas como la mia.");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.1, 
        y: -8,
        rotateX: -10,
        rotateY: 10
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15
      }}
      className="fixed bottom-[clamp(1rem,4vw,2rem)] right-[clamp(1rem,4vw,2rem)] z-[100] flex items-center justify-center w-[clamp(60px,8vw,86px)] h-[clamp(60px,8vw,86px)] rounded-full bg-[#25D366] text-white shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,211,102,0.6)] border border-white/20 overflow-hidden group perspective-1000 transition-shadow duration-300"
      aria-label="Contactar por WhatsApp"
    >
      {/* 3D Sphere Lighting - Top Highlight (Inner Glow) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-80 pointer-events-none"></div>
      
      {/* 3D Sphere Depth - Bottom Shadow (Inner Shadow) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

      {/* Main Brand Gradient (Organic) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] opacity-90"></div>

      {/* Interactive Sheen (Soft Blur, no hard edges) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4)_0%,_transparent_60%)]"></div>

      <i className="fa-brands fa-whatsapp text-4xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] z-10 transition-transform duration-500 group-hover:scale-110"></i>
      
      {/* Premium Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-6 px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl pointer-events-none hidden md:block whitespace-nowrap border border-white/5"
      >
        Impulsamos tu Éxito
      </motion.span>

      {/* Subtle Aura */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-10"></span>
    </motion.a>
  );
}
