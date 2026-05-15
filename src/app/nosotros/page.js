"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlassIconButton from "@/components/ui/GlassIconButton";

export default function NosotrosPage() {
  const [showContactModal, setShowContactModal] = useState(false);

  const servicios = [
    { icon: "hub", label: "Dominio de Redes Sociales" },
    { icon: "movie_edit", label: "Contenido Premium" },
    { icon: "ads_click", label: "Meta Ads" },
    { icon: "trending_up", label: "Estrategia de Crecimiento" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-x-hidden w-full">
      {/* Premium Minimal Hero — Standardized Spacing (Compact) */}
      <section className="relative w-full pt-[clamp(8rem,14vh,11rem)] pb-[clamp(0.5rem,1vh,1rem)] px-6 shrink-0 text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
        </div>
      </section>

      {/* RESTRUCTURACIÓN TOTAL: Grid de 2 Columnas (Compact) */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10 lg:min-h-[calc(100vh-140px)] overflow-hidden">
        
        {/* COLUMNA IZQUIERDA: Anclaje de Foto */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-full order-2 lg:order-1 flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-end"
          >
            <div className="relative w-full h-full"> 
              <Image
                src="/foto_nosotros_transp.png"
                alt="S2 Project Identidad de Marca"
                fill
                className="object-contain object-bottom pointer-events-none" 
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: Bloque de Información (Compact) */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-10 lg:py-6 gap-[clamp(1rem,3vh,2rem)] order-1 lg:order-2 h-full">
          
          {/* Main Title Section */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] relative inline-block mb-2">
              La Agencia de la <br />
              <span className="text-primary whitespace-nowrap">Nueva Generación</span>
            </h2>
            <p className="text-[clamp(1.1rem,1.4vw,1.4rem)] [@media(min-width:1600px)]:text-[clamp(1.4rem,1.8vw,2rem)] text-accent font-body leading-relaxed max-w-xl">
              Somos una <strong>agencia boutique</strong> con un enfoque fresco del marketing digital. Trabajamos con marcas que buscan más que publicaciones: buscan presencia, diferenciación y crecimiento real.
            </p>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <h3 className="text-[clamp(1.4rem,2vw,1.9rem)] [@media(min-width:1600px)]:text-[clamp(2rem,2.5vw,3rem)] font-display font-black uppercase tracking-tight text-slate-800">Como Trabajamos</h3>
              <p className="text-accent font-body leading-relaxed text-[clamp(1rem,1.2vw,1.25rem)] [@media(min-width:1600px)]:text-[clamp(1.25rem,1.5vw,1.6rem)] max-w-xl">
                Cada cuenta recibe estrategia, producción y seguimiento. No publicamos por publicar: cada pieza tiene un propósito dentro del crecimiento de tu marca.
              </p>
            </div>
            
            {/* Services List — Clean Green Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {servicios.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex flex-col border-l-4 border-primary pl-4 py-0.5 cursor-default group"
                >
                  <span className="text-slate-800 font-bold text-[clamp(0.85rem,1vw,1rem)] [@media(min-width:1600px)]:text-[clamp(1.2rem,1.5vw,1.6rem)] transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="pt-6 relative z-10 w-full lg:w-auto flex justify-center lg:justify-start"
              >
                {/* Elegant Liquid Ripple Waves - Wrapped to prevent overflow scroll */}
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.8],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: i * 1.3,
                        ease: [0.25, 0.1, 0.25, 1] 
                      }}
                      className="absolute inset-0 bg-primary rounded-full blur-2xl"
                    />
                  ))}
                </div>

              <motion.button
                onClick={() => setShowContactModal(true)}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-between gap-8 bg-primary text-[#fdf9e1] px-8 py-4 md:px-10 md:py-5 rounded-full font-body transition-all duration-500 hover:bg-[#2a4d32] overflow-hidden w-full sm:w-auto border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(57,101,66,0.6)]"
              >
                {/* Glow Aura Layer (Hover) */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <span className="relative z-10 flex flex-col items-start text-left">
                  <span className="text-[#cadedd] text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black mb-1 opacity-70">Diagnóstico visual</span>
                  <span className="font-display font-black text-lg md:text-xl tracking-tight text-white">
                    AGENDA TU CONSULTA
                  </span>
                </span>
                
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#fdf9e1] transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-[#fdf9e1]/30 group-hover:rotate-[360deg]">
                  <span className="material-symbols-outlined text-xl text-[#fdf9e1] group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                
                {/* Dynamic Glass Shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* MODAL DE CONTACTO */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-primary w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-3xl font-display font-black text-[#fdf9e1] mb-2 uppercase tracking-tight">Conecta con S2</h3>
              <p className="text-[#fdf9e1]/70 font-body text-sm mb-8">Elige el medio que prefieras para comunicarte con nuestro equipo estratégico.</p>

              <div className="flex flex-col gap-4">
                <Link
                  href="https://api.whatsapp.com/send?phone=50660060026"
                  target="_blank"
                  className="group flex items-center gap-6 p-4 rounded-[2rem] bg-transparent hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                >
                  <GlassIconButton 
                    icon="chat" 
                    color="pastel" 
                    darkMode={true}
                    isActive={true} 
                    className="w-16 h-16 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500" 
                    iconClassName="text-2xl text-[#1d2729]"
                  />
                  <div>
                    <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">Hablar por WhatsApp</h4>
                    <p className="text-xs text-[#fdf9e1]/50 font-body">Respuesta rápida</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-[#25D366] transition-colors group-hover:translate-x-1">arrow_forward</span>
                </Link>

                <Link
                  href="https://calendar.app.google/zadeELEGddkDxJ829" 
                  target="_blank"
                  className="group flex items-center gap-6 p-4 rounded-[2rem] bg-transparent hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                >
                  <GlassIconButton 
                    icon="calendar_month" 
                    color="pastel" 
                    darkMode={true}
                    isActive={true} 
                    className="w-16 h-16 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500" 
                    iconClassName="text-2xl text-[#1d2729]"
                  />
                  <div>
                    <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-white transition-colors">Agendar en Calendario</h4>
                    <p className="text-xs text-[#fdf9e1]/50 font-body">Reunión virtual estratégica</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
