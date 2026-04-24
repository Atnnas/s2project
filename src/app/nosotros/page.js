"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {

  const servicios = [
    { icon: "hub", label: "Dominio de Redes Sociales" },
    { icon: "movie_edit", label: "Contenido Premium" },
    { icon: "ads_click", label: "Meta Ads" },
    { icon: "trending_up", label: "Estrategia de Crecimiento" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-x-hidden w-full">
      {/* Premium Minimal Hero — Standardized Spacing (Compact) */}
      <section className="relative w-full pt-[clamp(8rem,14vh,11rem)] pb-[clamp(0.5rem,1vh,1rem)] px-6 shrink-0 text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2 mb-3"
          >
            <span className="h-[1px] w-6 bg-primary/40"></span>
            <span className="text-[9px] font-black uppercase tracking-[1em] text-primary">S2 PROJECT</span>
            <span className="h-[1px] w-6 bg-primary/40"></span>
          </motion.div>
        </div>
      </section>

      {/* RESTRUCTURACIÓN TOTAL: Grid de 2 Columnas (Compact) */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10 lg:min-h-[calc(100vh-140px)]">
        
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
                src="/foto_nosotros_final.png"
                alt="S2 Project Identidad de Marca"
                fill
                className="object-contain object-bottom pointer-events-none" 
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: Bloque de Información (Compact) */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-10 lg:py-6 gap-[clamp(1rem,3vh,2rem)] order-1 lg:order-2 h-full lg:overflow-y-auto">
          
          {/* Main Title Section */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <h1 className="text-[clamp(1.8rem,4.5vw,3.8rem)] [@media(min-width:1600px)]:text-[clamp(3.5rem,6vw,6rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              La Agencia de la <br />
              <span className="text-primary italic">Nueva Generación</span>
            </h1>
            <p className="text-[clamp(0.9rem,1vw,1.15rem)] [@media(min-width:1600px)]:text-[clamp(1.2rem,1.5vw,1.8rem)] text-slate-500 font-body leading-relaxed max-w-xl">
              Somos una <strong>agencia boutique</strong> con un enfoque fresco del marketing digital. Trabajamos con marcas que buscan mas que publicaciones: buscan presencia, diferenciacion y crecimiento real.
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
              <p className="text-slate-400 font-body leading-relaxed text-[clamp(0.85rem,1vw,1.05rem)] [@media(min-width:1600px)]:text-[clamp(1.1rem,1.2vw,1.4rem)] max-w-xl">
                Cada cuenta recibe estrategia, produccion y seguimiento. No publicamos por publicar: cada pieza tiene un proposito dentro del crecimiento de tu marca.
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
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-3"
            >
              <Link
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-7 py-3.5 rounded-none font-display font-black uppercase tracking-widest text-[10px] transition-all duration-500 overflow-hidden hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Agenda tu consulta</span>
                <span className="material-symbols-outlined relative z-10 text-xs group-hover:rotate-45 transition-transform duration-500">north_east</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
