"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-8 sm:pt-10 lg:pt-12 pb-16 relative bg-slate-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-slate-900/[0.02] rounded-full blur-[100px] -z-10" />

      {/* Main Container - Expands fully to utilize the space */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Image Area */}
          <div className="w-full flex justify-center lg:justify-start lg:sticky lg:top-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[70vh]"
            >
              <Image
                src="/sobre_nosotros.jpg"
                alt="S2 Project Identidad de Marca"
                fill
                className="object-contain object-top drop-shadow-2xl" 
                priority
              />
            </motion.div>
          </div>

          {/* Right Column: Information */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 lg:pr-8">
            
            {/* Header section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-primary"></span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.8em] text-primary/80">S2 PROJECT</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
                Arquitectos <br />
                <span className="text-primary italic">de Dominio</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-body leading-relaxed max-w-2xl pt-2">
                Somos una <strong>Agencia Boutique Premium</strong> dedicada a diseñar infraestructuras de marca que no solo compiten, sino que dominan su industria mediante estrategia real y resultados medibles.
              </p>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-slate-800">Nuestra Visión</h3>
              <p className="text-slate-500 font-body leading-relaxed text-base sm:text-lg max-w-2xl">
                Desde 2026, hemos redefinido el estándar de la gestión digital. No producimos contenido aislado; creamos activos estratégicos que aseguran la <strong>conversión</strong> y maximizan el <strong>ROI</strong> de nuestros aliados.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  "Dominio Estratégico de Redes",
                  "Ingeniería de Contenido",
                  "Meta Ads de Élite",
                  "Optimización de Conversión"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm sm:text-base border-l-4 border-primary pl-4 py-1">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 border-t border-slate-200 mt-1 flex"
            >
              <div className="relative group inline-block">
                {/* Animated Glow Wrapper */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition duration-700"></div>
                
                <a
                  href="/#contacto"
                  className="relative flex items-center justify-center gap-4 sm:gap-5 bg-slate-900 border border-slate-800 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-display font-bold uppercase tracking-[0.15em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-2xl hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]"
                >
                  {/* Background Sweep */}
                  <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex-shrink-0">Solicitar Diagnóstico ROI</span>
                  
                  {/* Icon Animation */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="material-symbols-outlined text-sm absolute transition-transform duration-500 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
                      arrow_outward
                    </span>
                    <span className="material-symbols-outlined text-sm absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
                      arrow_outward
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
