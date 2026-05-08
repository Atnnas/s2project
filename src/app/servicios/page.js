"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const mainService = {
  title: "Gestión Integral",
  subtitle: "Pensado para marcas que quieren crecer",
  description: "Gestionamos tu presencia digital de forma integral: estrategia, produccion de contenido, diseno y seguimiento mensual. Todo con un objetivo claro: que tu marca crezca con consistencia y profesionalismo.",
  features: [
    "Estrategia y direccion de marca",
    "Planificacion mensual de contenido",
    "Produccion de video, foto y reels",
    "Campanas de Meta Ads",
    "Análisis y ajustes continuos"
  ]
};

const secondaryServices = [
  {
    id: "branding",
    title: "Identidad de Marca",
    subtitle: "Brand Kit con Proposito Estrategico",
    description: "Disenamos la identidad visual de tu marca: logo, colores, tipografia y guia de uso. Todo lo que necesitas para proyectar presencia desde el primer dia.",
    features: ["Diseno de logotipo", "Paleta de colores", "Sistema tipografico", "Manual de marca", "Assets para redes sociales"]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "La propiedad merece verse asi",
    description: "Produccion audiovisual de alto nivel para proyectos inmobiliarios. Cinematografia, drone y fotografia que transforman propiedades en experiencias.",
    features: ["Cinematografía Inmobiliaria", "Fotografía Aérea con Dron", "Recorridos Visuales Fluidos", "Edición Dinámica Musical", "Optimizados para Meta Ads"]
  },
  {
    id: "corporate",
    title: "Contenido Corporativo",
    subtitle: "Para empresas que comunican con estilo",
    description: "Video institucional, entrevistas, casos de exito y cobertura de eventos. Producciones pensadas para empresas que entienden el valor de comunicar bien.",
    features: ["Video institucional", "Entrevistas y testimonios", "Casos de exito", "Cobertura de eventos", "Comunicacion interna y ejecutiva"]
  }
];

const tabs = [
  { id: "01", title: "Gestión Integral", desc: "Todo lo que tu marca necesita, mes a mes.", icon: "layers" },
  { id: "02", title: "Identidad de Marca", desc: "Tu marca, desde cero o desde reinvencion.", icon: "architecture" },
  { id: "03", title: "Real Estate", desc: "Video y drone para proyectos de alto nivel.", icon: "domain" },
  { id: "04", title: "Contenido Corporativo", desc: "Video institucional y eventos.", icon: "business_center" }
];

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const interactionTimeoutRef = useRef(null);

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
      <section className="relative w-full pt-[clamp(8rem,14vh,10rem)] pb-12 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[8px] mb-3 block">Servicios</span>
          <h1 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] relative inline-block">
            Servicios
          </h1>
          <div className="mt-6 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-display font-black uppercase tracking-[0.2em] text-slate-900">
                Planes desde <span className="text-primary text-xs">500</span>/mes
              </p>
            </div>
            <p className="text-[9px] md:text-[10px] font-body uppercase tracking-[0.3em] text-accent max-w-lg leading-tight">
              Diseñados según tu marca, tu objetivo y tu ritmo
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD GRID — Apple Material Design */}
      <section className="w-full relative pb-24 bg-white flex-1 flex flex-col justify-center">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative px-[clamp(1.5rem,6vw,6rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Desktop Vertical Menu (Sticky to avoid double scroll) */}
          <div className="hidden lg:flex lg:col-span-6 z-20 lg:flex-col lg:justify-start lg:gap-2 h-fit sticky top-[160px]">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-6 flex items-center gap-6 transition-all duration-500 group min-w-0 rounded-[30px] ${isActive ? 'bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] scale-[1.03] z-10' : 'bg-transparent hover:bg-slate-50'}`}
                >
                  <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{tab.title}</h3>
                    {isActive && (
                      <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-[10px] text-accent font-body uppercase tracking-wider mt-1 block">
                        {tab.desc}
                      </motion.p>
                    )}
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
          <div className="lg:col-span-6 w-full">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
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

      {/* Conversion Panel (Standardized - Now below tabs) */}
      <section className="w-full pb-20 px-[clamp(1.5rem,6vw,6rem)]">
        <div className="relative p-8 md:p-12 lg:p-16 bg-slate-900 text-white overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 group">
          <div className="absolute inset-0 bg-slate-900/50 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col space-y-6 max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                Consulta Exclusiva
              </span>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
            
            <h2 className="text-4xl xl:text-6xl font-display font-black uppercase tracking-tight leading-[0.85] text-white">
              Diagnostico <br />
              <span className="text-primary italic">Sin Costo</span>
            </h2>
            
            <p className="text-sm md:text-base text-accent font-body leading-relaxed max-w-3xl">
              Analizamos tu marca y te compartimos una lectura estrategica clara. Sin compromiso, con el mismo criterio con el que trabajamos cada cuenta.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-stretch md:items-center gap-6 shrink-0 w-full md:w-auto">
             <div className="p-8 bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center group-hover:bg-white/10 transition-colors duration-500">
               <span className="material-symbols-outlined text-primary mb-3 text-4xl">insights</span>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estrategia</p>
               <p className="text-[12px] font-bold text-white uppercase tracking-tight">Diagnostico visual</p>
             </div>
             
             <div className="relative group/btn flex-1 sm:flex-none">
                <div className="absolute -inset-1 bg-primary/20 blur-sm opacity-0 group-hover/btn:opacity-40 transition duration-700"></div>
                <Link
                  href="https://api.whatsapp.com/send?phone=50660060026"
                  target="_blank"
                  className="relative flex items-center justify-center gap-4 bg-slate-950 border border-slate-800 text-white px-10 py-6 w-full rounded-none font-display font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]"
                >
                  <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  <span className="relative z-10">Quiero Trabajar con S2</span>
                  <div className="relative z-10 w-6 h-6 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span className="material-symbols-outlined text-xs absolute transition-transform duration-500 group-hover/btn:translate-x-[150%] group-hover/btn:-translate-y-[150%]">
                      arrow_outward
                    </span>
                    <span className="material-symbols-outlined text-xs absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
                      arrow_outward
                    </span>
                  </div>
                </Link>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function MainServiceView({ data }) {
  return (
    <div className="p-10 md:p-16 rounded-[60px] bg-white border border-slate-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] w-full h-full flex flex-col justify-between transition-all duration-700">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">layers</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          {data.title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-2xl">
          {data.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 pt-4">
           {data.features.map((feature, i) => {
             const subtitles = [
               "Objetivos claros desde el dia uno",
               "Calendario, guiones y direccion creativa",
               "Grabacion y edicion profesional",
               "Pauta estrategica con seguimiento",
               "Analisis mensual y mejora continua"
             ];
             return (
               <div key={i} className="flex gap-4">
                  <span className="text-primary font-black opacity-30 font-display">0{i+1}</span>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{feature}</h4>
                    <p className="text-[10px] text-slate-500">
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
    <div className="p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-slate-900 flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          {data.title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-2xl pb-4">
          {data.description}
        </p>
        
        <div className="space-y-4 flex-1 border-t border-slate-100 pt-6">
           {data.features.map((feature, i) => (
             <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-slate-700 tracking-tight">{feature}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
