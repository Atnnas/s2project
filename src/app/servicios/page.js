"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * S2 DESIGN SYSTEM - PROFESSIONAL IMPLEMENTATION
 * Focus: Stability, Hierarchy, and Balanced Spacing.
 */

const mainService = {
  title: "Gestión Integral",
  subtitle: "Pensado para marcas que quieren crecer",
  description: "Gestionamos tu presencia digital de forma integral: estrategia, producción de contenido, diseño y seguimiento mensual. Todo con un objetivo claro: que tu marca crezca con consistencia y profesionalismo.",
  features: [
    "Estrategia y dirección de marca",
    "Planificación mensual de contenido",
    "Producción de video, foto y reels",
    "Campañas de Meta Ads",
    "Análisis y ajustes continuos"
  ]
};

const secondaryServices = [
  {
    id: "branding",
    title: "Identidad de Marca",
    subtitle: "Brand Kit con Propósito Estratégico",
    description: "Diseñamos la identidad visual de tu marca: logo, colores, tipografía y guía de uso. Todo lo que necesitas para proyectar presencia desde el primer día.",
    features: ["Diseño de logotipo", "Paleta de colores", "Sistema tipográfico", "Manual de marca", "Assets para redes sociales"]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "La propiedad merece verse así",
    description: "Producción audiovisual de alto nivel para proyectos inmobiliarios. Cinematografía, drone y fotografía que transforman propiedades en experiencias.",
    features: ["Cinematografía Inmobiliaria", "Fotografía Aérea con Dron", "Recorridos Visuales Fluidos", "Edición Dinámica Musical", "Optimizados para Meta Ads"]
  },
  {
    id: "corporate",
    title: "Contenido Corporativo",
    subtitle: "Para empresas que comunican con estilo",
    description: "Video institucional, entrevistas, casos de éxito y cobertura de eventos. Producciones pensadas para empresas que entienden el valor de comunicar bien.",
    features: ["Video institucional", "Entrevistas y testimonios", "Casos de éxito", "Cobertura de eventos", "Comunicación interna y ejecutiva"]
  }
];

const tabs = [
  { id: "01", title: "Gestión Integral", desc: "Estrategia mensual completa.", icon: "layers" },
  { id: "02", title: "Identidad de Marca", desc: "Branding con propósito.", icon: "architecture" },
  { id: "03", title: "Real Estate", desc: "Audiovisual inmobiliario.", icon: "domain" },
  { id: "04", title: "Contenido Corporativo", desc: "Comunicación empresarial.", icon: "business_center" }
];

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pricingTag, setPricingTag] = useState("Planes desde $500/mes");
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings?key=pricing_tag');
        const data = await res.json();
        if (data.success && data.data) {
          setPricingTag(data.data.value);
        }
      } catch (e) { console.error(e); }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    handleInteraction();
  };

  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-x-hidden min-h-screen w-full">
      {/* CINEMATIC GRAIN TEXTURE - ANIMATED & MORE VISIBLE */}
      <motion.div 
        animate={{ 
          x: [0, -10, 10, -5, 0],
          y: [0, 5, -10, 5, 0]
        }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.07] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" 
      />
      
      {/* AMBIENT LIGHT FOLLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-[#2a4d32]/5 rounded-full blur-[100px]" />
      </div>

      {/* HERO SECTION - COMPACT & MINIMAL */}
      <section className="relative w-full pt-44 pb-4 px-6 shrink-0 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <p className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-primary-dark leading-[0.85] relative inline-block mb-12">
              Servicios
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative"
            >
              <div className="relative flex flex-col items-center">
                <motion.div 
                  animate={{ 
                    filter: [
                      'brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))',
                      'brightness(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.2))',
                      'brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))'
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative transform-gpu"
                  style={{ perspective: 1000 }}
                >
                  <p className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase relative flex flex-nowrap justify-center items-center gap-x-3 whitespace-nowrap overflow-hidden px-8 py-2">
                    <span className="text-primary-dark">{pricingTag.split(' ')[0]}</span>
                    <span className="text-primary italic font-medium lowercase tracking-tighter">
                      {pricingTag.split(' ').slice(1).join(' ')}
                    </span>
                    <motion.span 
                      animate={{ 
                        left: ["-50%", "150%"],
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        repeatDelay: 10,
                        ease: "easeInOut"
                      }}
                      className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-20 pointer-events-none"
                    />
                  </p>
                </motion.div>

                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.5 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-5"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID - MAXIMUM WIDTH EXPANSION */}
      <section className="w-full relative pb-24 bg-background px-4 md:px-10 flex-1 flex flex-col justify-start pt-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* TABS - 50% WIDTH WITH VERTICAL INDICATOR */}
          <div className="hidden lg:flex lg:col-span-6 z-20 lg:flex-col lg:justify-start gap-3 h-fit sticky top-[32px] pl-6 border-l border-black/5">
            {/* Animated Active Indicator */}
            <motion.div 
              className="absolute left-0 w-1 bg-primary rounded-full z-30"
              animate={{ 
                top: activeTab * 76, // Approximate height of each tab
                height: 64 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-4 flex items-center gap-6 transition-all duration-700 group min-w-0 rounded-[2rem] border border-transparent relative overflow-hidden ${isActive ? 'bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] scale-[1.02] z-10' : 'bg-transparent hover:bg-white/40 backdrop-blur-[2px]'}`}
                >
                  <div className={`w-14 h-14 flex flex-shrink-0 items-center justify-center font-black transition-all duration-500 rounded-2xl ${isActive ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-2xl">{tab.icon}</span>
                  </div>
                  <div className="flex-1 pr-1 overflow-hidden">
                    <h3 
                      className={`font-display font-black uppercase text-[10px] tracking-[0.3em] whitespace-nowrap transition-colors duration-500 origin-left ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}
                      style={{ transform: 'scale(0.36)' }}
                    >
                      {tab.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* VIEWPORT - 50% WIDTH */}
          <div className="lg:col-span-6 w-full">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="w-full"
                >
                  {activeTab === 0 && <MainServiceView data={mainService} />}
                  {activeTab === 1 && <SecondaryServiceView data={secondaryServices[0]} icon="architecture" />}
                  {activeTab === 2 && <SecondaryServiceView data={secondaryServices[1]} icon="domain" />}
                  {activeTab === 3 && <SecondaryServiceView data={secondaryServices[2]} icon="business_center" />}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CONVERSION PANEL - ULTRA PREMIUM EDITORIAL */}
      <section className="w-full pb-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-20 bg-gradient-to-br from-primary via-primary to-[#2a4d32] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-center justify-between gap-16"
          >
            {/* Ambient Light Effect */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-8 max-w-2xl text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-[#fdf9e1] px-6 py-2.5 rounded-full w-fit mx-auto lg:mx-0 shadow-xl shadow-black/10">
                  Oportunidad Estratégica
                </span>
                <h2 className="text-[#fdf9e1] text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
                  Diagnóstico <br />
                  <span className="italic font-light lowercase opacity-60 tracking-normal block mt-2 text-3xl md:text-5xl">sin costo alguno.</span>
                </h2>
              </div>
              
              <div className="w-20 h-[1px] bg-[#fdf9e1]/30 mx-auto lg:mx-0" />

              <p className="text-base md:text-lg text-[#fdf9e1]/80 font-body leading-relaxed font-light">
                Elevamos la lectura de tu marca a través de un análisis <span className="text-[#fdf9e1] font-medium italic">honesto y profundo</span>. Descubre el potencial oculto de tu visión con la perspectiva estratégica de S2.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto">
              <Link
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                className="group relative flex items-center justify-center gap-6 bg-[#fdf9e1] text-primary px-16 py-8 rounded-2xl font-display font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-700 hover:bg-white hover:scale-[1.02] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Agendar Consultoría</span>
                <span className="material-symbols-outlined text-lg relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">arrow_outward</span>
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MainServiceView({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="p-8 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full flex flex-col justify-between transition-all duration-700 relative overflow-hidden group"
    >
      {/* Ambient Light Rim */}
      <div className="absolute inset-0 rounded-[3.5rem] border-[1.5px] border-white/5 pointer-events-none" />
      
      <div className="space-y-8 flex-1 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-[#fdf9e1]/10 rounded-2xl flex items-center justify-center text-[#fdf9e1] shadow-inner transition-transform duration-500"
        >
          <span className="material-symbols-outlined text-3xl">layers</span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-[3.3rem] font-display font-black uppercase tracking-tight leading-[0.9] text-[#fdf9e1]"
        >
          {data.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-[#fdf9e1]/70 font-body leading-relaxed max-w-3xl font-light"
        >
          {data.description}
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-[#fdf9e1]/10 mt-10">
           {data.features.map((feature, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex gap-5 items-start group/item"
             >
                <span className="text-[#fdf9e1] font-black font-display text-xl opacity-10 mt-1 transition-opacity group-hover/item:opacity-30">0{i+1}</span>
                <div>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#fdf9e1] leading-tight mb-1">{feature}</h4>
                  <p className="text-[12px] text-[#fdf9e1]/30 font-body uppercase tracking-wider">Estándar de excelencia S2</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function SecondaryServiceView({ data, icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="p-8 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full flex flex-col justify-between transition-all duration-700 relative overflow-hidden group"
    >
      {/* Ambient Light Rim */}
      <div className="absolute inset-0 rounded-[3.5rem] border-[1.5px] border-white/5 pointer-events-none" />

      <div className="space-y-8 flex-1 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-inner transition-transform duration-500"
        >
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-[3.3rem] font-display font-black uppercase tracking-tight leading-[0.9] text-white"
        >
          {data.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-white/70 font-body leading-relaxed max-w-3xl font-light"
        >
          {data.description}
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-white/10 mt-10">
           {data.features.map((feature, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex gap-5 items-start group/item"
             >
                <span className="text-white font-black font-display text-xl opacity-10 mt-1 transition-opacity group-hover/item:opacity-30">0{i+1}</span>
                <div>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-white leading-tight mb-1">{feature}</h4>
                  <p className="text-[12px] text-white/30 font-body uppercase tracking-wider">Estándar de excelencia S2</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
