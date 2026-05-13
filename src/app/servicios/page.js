"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
  { id: "01", title: "Gestión Integral", desc: "Todo lo que tu marca necesita, mes a mes.", icon: "layers" },
  { id: "02", title: "Identidad de Marca", desc: "Tu marca, desde cero o desde reinvención.", icon: "architecture" },
  { id: "03", title: "Real Estate", desc: "Video y drone para proyectos de alto nivel.", icon: "domain" },
  { id: "04", title: "Contenido Corporativo", desc: "Video institucional y eventos.", icon: "business_center" }
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
    
    // Autoplay interval (rotates every 5 seconds)
    const intervalId = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    // Resume autoplay after 8 seconds of inactivity on mobile taps
    interactionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    handleInteraction();
  };

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    handleInteraction();
  };

  const handlePrev = () => {
    setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
    handleInteraction();
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-x-hidden min-h-screen w-full">
      <section className="relative w-full pt-[clamp(8rem,14vh,10rem)] pb-4 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.95] relative inline-block">
            Servicios
          </h1>
          <div className="mt-12 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group cursor-default"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-8 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative flex flex-col items-center">
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8"
                />
                
                <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-display font-black tracking-[-0.05em] text-primary-dark leading-none uppercase">
                  {pricingTag.split(' ')[0]} <span className="text-primary italic font-medium lowercase tracking-tighter">{pricingTag.split(' ').slice(1).join(' ')}</span>
                </h2>

                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DASHBOARD GRID — Apple Material Design */}
      <section className="w-full relative pb-24 bg-white flex-1 flex flex-col justify-start pt-0">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative px-[clamp(1.5rem,6vw,6rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Desktop Vertical Menu (Sticky to avoid double scroll) */}
          <div className="hidden lg:flex lg:col-span-6 z-20 lg:flex-col lg:justify-start gap-2 h-fit sticky top-[20px]">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-6 flex items-center gap-6 transition-all duration-500 group min-w-0 rounded-[30px] border border-transparent ${isActive ? 'bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] z-10' : 'bg-transparent hover:bg-slate-50'}`}
                >
                  <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{tab.title}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Carousel (Standardized) */}
          <div className="lg:hidden w-full flex items-center justify-between pb-6 gap-2 z-20">
             <button onClick={handlePrev} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors">
                 <span className="material-symbols-outlined text-xl">chevron_left</span>
             </button>
             
             <div className="flex-1 overflow-hidden relative min-h-[50px] flex items-center justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.2, ease: "easeOut" }}
                     className="absolute inset-0 flex items-center justify-center w-full"
                   >
                     <div className="bg-slate-900 mx-auto p-2 pr-5 rounded-full flex items-center gap-3 shadow-xl max-w-full cursor-pointer" onClick={handleNext}>
                         <div className="w-8 h-8 rounded-full bg-primary text-white flex flex-shrink-0 items-center justify-center font-black shadow-inner">
                            <span className="material-symbols-outlined text-[1rem]">{tabs[activeTab].icon}</span>
                         </div>
                         <h3 className="font-display font-black uppercase text-[10px] sm:text-xs tracking-widest text-white whitespace-nowrap truncate w-full pr-2">
                            {tabs[activeTab].title}
                         </h3>
                      </div>
                   </motion.div>
                 </AnimatePresence>
             </div>
             
             <button onClick={handleNext} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors">
                 <span className="material-symbols-outlined text-xl">chevron_right</span>
             </button>
          </div>
          {/* Column 2: Active Card Viewport (Integrated with page scroll) */}
          <div className="lg:col-span-6 w-full min-h-[500px]">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, filter: 'blur(15px)', y: 20 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(15px)', y: -20 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-full h-full"
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

      {/* Conversion Panel - Unified with Home style */}
      <section className="w-full pb-20 px-[clamp(1.5rem,6vw,6rem)]">
        <div className="relative p-10 md:p-14 lg:p-20 bg-accent-pastel/20 border border-pastel rounded-[3rem] overflow-hidden shadow-2xl shadow-accent-pastel/10 flex flex-col lg:flex-row items-center justify-between gap-12 group transition-all duration-700 hover:shadow-accent-pastel/20">
          
          <div className="relative z-10 flex flex-col space-y-8 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-white px-5 py-2 rounded-full border border-pastel shadow-sm">
                Consulta Exclusiva
              </span>
            </div>
            
            <h2 className="text-primary-dark">
              Diagnóstico <br />
              <span className="text-primary italic text-6xl xl:text-8xl">Sin Costo</span>
            </h2>
            
            <p className="text-lg md:text-xl text-primary-dark opacity-70 font-body leading-relaxed max-w-3xl">
              Analizamos tu marca y te compartimos una lectura estratégica clara. Sin compromiso, con el mismo criterio con el que trabajamos cada cuenta.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch lg:items-center gap-8 shrink-0 w-full lg:w-auto">
             <div className="p-10 bg-white border border-pastel rounded-[2.5rem] flex flex-col items-center text-center justify-center shadow-sm">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                 <span className="material-symbols-outlined text-4xl">insights</span>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary-dark/50 mb-1">Estrategia</p>
               <p className="text-sm font-bold text-primary-dark uppercase tracking-tight">Diagnóstico visual</p>
             </div>
             
             <Link
               href="https://api.whatsapp.com/send?phone=50660060026"
               target="_blank"
               className="relative flex items-center justify-center gap-4 bg-primary text-white px-12 py-8 w-full lg:w-auto rounded-2xl font-display font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 active:scale-95 shadow-xl shadow-primary/20 hover:bg-primary/90"
             >
               <span className="relative z-10">Quiero Trabajar con S2</span>
               <span className="material-symbols-outlined text-sm relative z-10">arrow_outward</span>
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function MainServiceView({ data }) {
  return (
    <div className="p-10 md:p-16 rounded-[3rem] bg-cream border border-pastel shadow-[0_40px_80px_-20px_rgba(202,222,221,0.2)] w-full h-full flex flex-col justify-between transition-all duration-700">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">layers</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-primary-dark pr-8">
          {data.title}
        </h3>
        <p className="text-primary-dark font-body leading-relaxed max-w-2xl">
          {data.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-6 border-t border-pastel/30 mt-6">
           {data.features.map((feature, i) => {
             const subtitles = [
               "Objetivos claros desde el día uno",
               "Calendario, guiones y dirección creativa",
               "Grabación y edición profesional",
               "Pauta estratégica con seguimiento",
               "Análisis mensual y mejora continua"
             ];
             return (
               <div key={i} className="flex gap-4 items-start">
                  <span className="text-primary font-black font-display text-lg opacity-40">0{i+1}</span>
                  <div>
                    <h4 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">{feature}</h4>
                    <p className="text-[10px] text-slate-500 font-body uppercase tracking-wider">
                      {subtitles[i] || "Optimizado para resultados"}
                    </p>
                  </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
}

function SecondaryServiceView({ data, icon }) {
  return (
    <div className="p-10 md:p-16 rounded-[3rem] bg-cream border border-pastel shadow-[0_40px_80px_-20px_rgba(202,222,221,0.2)] w-full h-full flex flex-col justify-between transition-all duration-700">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-primary-dark pr-8">
          {data.title}
        </h3>
        <p className="text-primary-dark font-body leading-relaxed max-w-2xl pb-4">
          {data.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-6 border-t border-pastel/30 mt-6">
           {data.features.map((feature, i) => (
             <div key={i} className="flex gap-4 items-start">
                <span className="text-primary font-black font-display text-lg opacity-40">0{i+1}</span>
                <div className="flex flex-col">
                  <h4 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">{feature}</h4>
                  <p className="text-[10px] text-slate-500 font-body uppercase tracking-wider">Servicio Especializado</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
