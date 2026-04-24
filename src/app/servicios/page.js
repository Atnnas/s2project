"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const mainService = {
  title: "Gestión Integral",
  subtitle: "Pensado para marcas que quieren crecer",
  description: "Nuestra arquitectura de gestión mensual no es solo contenido; es una infraestructura diseñada para dominar el mercado digital. Fusionamos narrativa de alta fidelidad con ingeniería de datos para asegurar resultados medibles.",
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
  { id: "03", title: "Real Estate", desc: "Fotografia, video y drone para proyectos de alto nivel.", icon: "domain" },
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
      {/* Hero Header Standardized */}
      <section className="relative w-full pt-[clamp(160px,18vh,220px)] pb-12 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-primary/40"></span>
            <span className="text-[10px] font-black uppercase tracking-[1em] text-primary">S2 PROJECT</span>
            <span className="h-[1px] w-8 bg-primary/40"></span>
          </motion.div>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] relative inline-block">
            Servicios
          </h1>
        </div>
      </section>

      {/* DASHBOARD GRID — Standardized Geometry from Home */}
      <section className="w-full relative pb-20 bg-white flex-1 flex flex-col justify-center">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative px-[clamp(1.5rem,6vw,6rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Desktop Vertical Menu (Sticky to avoid double scroll) */}
          <div className="hidden lg:flex lg:col-span-3 z-20 lg:flex-col lg:justify-start lg:gap-2 h-fit sticky top-[160px]">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-6 flex items-center gap-6 border-l-4 transition-all duration-300 group min-w-0 ${isActive ? 'bg-white shadow-2xl border-primary scale-[1.02] z-10' : 'bg-transparent border-transparent hover:bg-slate-100/50'}`}
                >
                  <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{tab.title}</h3>
                    {isActive && (
                      <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-[10px] text-slate-400 font-body uppercase tracking-wider mt-1 block">
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
          <div className="lg:col-span-5 w-full">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="w-full h-full"
               >
                 {activeTab === 0 && <MainServiceView data={mainService} />}
                 {activeTab === 1 && <SecondaryServiceView data={secondaryServices[0]} icon="architecture" />}
                 {activeTab === 2 && <SecondaryServiceView data={secondaryServices[1]} icon="domain" />}
                 {activeTab === 3 && <SecondaryServiceView data={secondaryServices[2]} icon="business_center" />}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Column 3: Conversion Panel (Standardized) */}
          <div className="lg:col-span-4 h-full relative z-20">
            <div className="relative p-8 md:p-12 rounded-none bg-slate-900 text-white overflow-hidden shadow-2xl h-full flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.25)_0%,_transparent_75%)] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    Consulta Exclusiva
                  </span>
                  <h2 className="text-4xl xl:text-5xl font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                    Diagnostico <br />
                    <span className="text-primary italic">Sin Costo</span>
                  </h2>
                  <p className="text-sm text-slate-400 font-body leading-relaxed max-w-sm">
                    Analizamos tu marca y te compartimos una lectura estrategica clara. Sin compromiso, con el mismo criterio con el que trabajamos cada cuenta.
                  </p>
                </div>

                <div className="flex-1 content-center">
                   <div className="p-4 bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center">
                     <span className="material-symbols-outlined text-primary mb-2 text-3xl">insights</span>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Diagnostico visual</p>
                   </div>
                </div>

                <div className="pt-2 mt-auto">
                  <div className="relative group block w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 blur-sm opacity-0 group-hover:opacity-40 transition duration-700"></div>
                    <Link
                      href="https://api.whatsapp.com/send?phone=50660060026"
                      target="_blank"
                      className="relative flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 text-white px-4 py-5 w-full rounded-none font-display font-bold uppercase tracking-[0.1em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10 flex-shrink-0 text-center">Quiero Trabajar con S2</span>
                      <div className="relative z-10 w-6 h-6 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 rounded-none hidden sm:flex">
                        <span className="material-symbols-outlined text-xs absolute transition-transform duration-500 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
                          arrow_outward
                        </span>
                        <span className="material-symbols-outlined text-xs absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
                          arrow_outward
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

function MainServiceView({ data }) {
  return (
    <div className="p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">layers</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          {data.title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md">
          {data.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 pt-4">
           {data.features.map((feature, i) => (
             <div key={i} className="flex gap-4">
                <span className="text-primary font-black opacity-30 font-display">0{i+1}</span>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{feature}</h4>
                  <p className="text-[10px] text-slate-500">Optimizado para resultados</p>
                </div>
             </div>
           ))}
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
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md pb-4">
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
