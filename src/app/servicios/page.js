"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const mainService = {
  title: "Gestión Estratégica 360°",
  subtitle: "El motor de tu Retorno de Inversión (ROI)",
  description: "Nuestra arquitectura de gestión mensual no es solo contenido; es una infraestructura diseñada para dominar el mercado digital. Fusionamos narrativa de alta fidelidad con ingeniería de datos para asegurar resultados medibles.",
  features: [
    "Estrategia de Crecimiento y Posicionamiento",
    "Planificación Táctica de Contenido Trimestral",
    "Producción de Activos con Enfoque en Conversión",
    "Gestión de Campañas Meta Ads y Optimización",
    "Análisis de Métricas y Rendimiento"
  ]
};

const secondaryServices = [
  {
    id: "branding",
    title: "Identidad de Legado",
    subtitle: "Brand Kits con Propósito Estratégico",
    description: "Diseñamos el ADN visual de marcas destinadas a liderar. Construimos una estética premium que comunica autoridad instantánea en tu sector comercial.",
    features: ["Diseño de Logotipo Premium", "Paleta de Colores Exclusiva", "Tipografía Corporativa", "Guía de Estilo de Marca", "Assets de Redes Sociales"]
  },
  {
    id: "real-estate",
    title: "Real Estate Premium",
    subtitle: "Elevación del Valor Percibido",
    description: "Producciones cinematográficas y fotografía aérea con drones para activos inmobiliarios de lujo. Capturamos la esencia de las propiedades para cerrar ventas más rápido.",
    features: ["Cinematografía Inmobiliaria", "Fotografía Aérea con Dron", "Recorridos Visuales Fluidos", "Edición Dinámica Musical", "Optimizados para Meta Ads"]
  },
  {
    id: "corporate",
    title: "Narrativa Corporativa",
    subtitle: "Comunicaciones de Alta Fidelidad",
    description: "Material audiovisual para empresas con visión. Transmitimos el mensaje central de tu corporación a través de producciones de alcance ejecutivo y corporativo.",
    features: ["Videos Institucionales", "Entrevistas Comerciales", "Casos de Éxito y Testimonios", "Cobertura Premium de Eventos", "Comunicaciones de Alto Nivel"]
  }
];

const tabs = [
  { id: "01", title: "Gestión Estrella 360°", desc: "El motor principal de tu ROI.", icon: "layers" },
  { id: "02", title: "Identidad de Legado", desc: "Construcción de ADN de Marca.", icon: "architecture" },
  { id: "03", title: "Real Estate Premium", desc: "Producción Inmobiliaria Luxury.", icon: "domain" },
  { id: "04", title: "Narrativa Corporativa", desc: "Comunicaciones corporativas.", icon: "business_center" }
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
    <main className="min-h-screen pt-8 sm:pt-10 lg:pt-12 pb-40 overflow-hidden bg-background-light text-slate-900 flex flex-col w-full">
      
      {/* Premium Minimal Hero */}
      <section className="relative px-6 mb-8 md:mb-12 text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
            Arquitectura <br />
            <span className="text-primary italic relative inline-block">
              de Resultados
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-2 bg-primary/10 -z-10"
              />
            </span>
          </h1>
        </div>
      </section>

      {/* DASHBOARD GRID */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 relative flex-1">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch h-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Desktop Vertical Menu */}
          <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-8 z-20 lg:flex-col lg:justify-start lg:gap-3 h-fit">
            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left flex items-center lg:gap-5 transition-all duration-300 group lg:min-w-0 lg:rounded-none lg:border-l-4 ${
                    isActive 
                      ? 'lg:p-6 lg:bg-white lg:shadow-xl lg:border-primary lg:scale-[1.02] z-10' 
                      : 'lg:p-6 lg:bg-transparent lg:border-transparent lg:hover:bg-white/50 lg:hover:border-slate-200'
                  }`}
                >
                  <div className={`lg:w-12 lg:h-12 lg:rounded-none flex flex-shrink-0 items-center justify-center font-black transition-colors duration-300 ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'lg:bg-slate-200 text-slate-500 group-hover:text-primary lg:group-hover:bg-primary/20'
                  }`}>
                    <span className="material-symbols-outlined lg:text-xl">{tab.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display font-black uppercase lg:text-sm tracking-widest ${
                      isActive 
                        ? 'lg:text-slate-900' 
                        : 'text-slate-500 group-hover:text-slate-700'
                    }`}>{tab.title}</h3>
                    {isActive && (
                      <motion.p initial={{opacity:0, h:0}} animate={{opacity:1, h:'auto'}} className="hidden lg:block text-[10px] text-slate-400 font-body uppercase tracking-wider mt-1">
                        {tab.desc}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Single-Pill Carousel */}
          <div className="lg:hidden w-full flex items-center justify-between pb-6 gap-2 z-20">
             <button onClick={handlePrev} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors focus:outline-none">
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
                     <div className="bg-slate-900 mx-auto p-2 pr-5 rounded-full flex items-center gap-3 transition-all shadow-xl max-w-full cursor-pointer" onClick={handleNext}>
                         <div className="w-8 h-8 rounded-full bg-primary text-white flex flex-shrink-0 items-center justify-center font-black shadow-inner">
                            <span className="material-symbols-outlined text-[1rem]">{tabs[activeTab].icon}</span>
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <h3 className="font-display font-black uppercase text-[10px] sm:text-xs tracking-widest text-white whitespace-nowrap truncate w-full pr-2">
                               {tabs[activeTab].title}
                            </h3>
                         </div>
                      </div>
                   </motion.div>
                 </AnimatePresence>
             </div>
             
             <button onClick={handleNext} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors focus:outline-none">
                 <span className="material-symbols-outlined text-xl">chevron_right</span>
             </button>
          </div>

          {/* Column 2: Viewport Activo */}
          <div className="lg:col-span-5 w-full mb-8 lg:mb-0">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                 className="w-full h-full"
               >
                 {activeTab === 0 && <MainServiceView data={mainService} />}
                 {activeTab === 1 && <SecondaryServiceView data={secondaryServices[0]} icon="architecture" />}
                 {activeTab === 2 && <SecondaryServiceView data={secondaryServices[1]} icon="domain" />}
                 {activeTab === 3 && <SecondaryServiceView data={secondaryServices[2]} icon="business_center" />}
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Column 3: The Sticky Conversion Panel */}
          <div className="lg:col-span-4 h-full relative z-20">
            <div className="relative p-6 lg:p-8 md:p-12 bg-slate-900 text-white overflow-hidden shadow-2xl h-full flex flex-col justify-between border border-white/10 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="relative z-10 flex flex-col h-full space-y-10">
                
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-none border border-primary/20">
                    Oportunidad de Escala
                  </span>
                  <h2 className="text-4xl xl:text-5xl font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                    Diagn&oacute;stico <br />
                    <span className="text-primary italic opacity-90">Gratuito</span>
                  </h2>
                  <p className="text-sm text-slate-300 font-body leading-relaxed">
                    Evaluamos tu marca sin costo alguno. Descubre fisuras en tu ecosistema actual e identifica el verdadero potencial estrat&eacute;gico.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1 content-center">
                   <div className="p-4 bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center">
                     <span className="material-symbols-outlined text-primary mb-2 text-3xl">insights</span>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Auditor&iacute;a Visual</p>
                   </div>
                   <div className="p-4 bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center">
                     <span className="material-symbols-outlined text-primary mb-2 text-3xl">schema</span>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Roadmap T&aacute;ctico</p>
                   </div>
                </div>

                {/* ROI Action Button */}
                <div className="pt-4 mt-auto">
                  <div className="relative block w-full">
                    <Link
                      href="https://api.whatsapp.com/send?phone=50660060026"
                      target="_blank"
                      className="group relative flex items-center justify-center gap-3 bg-white text-slate-900 px-4 py-5 w-full rounded-none font-display font-bold uppercase tracking-[0.1em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)]"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10 flex-shrink-0 text-center group-hover:text-white transition-colors duration-300">Solicitar An&aacute;lisis ROI</span>
                      <div className="relative z-10 w-6 h-6 bg-slate-900/10 group-hover:bg-white/20 flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors duration-300">
                        <span className="material-symbols-outlined text-xs absolute transition-transform duration-500 group-hover:translate-x-[150%] group-hover:-translate-y-[150%] group-hover:text-white">
                          north_east
                        </span>
                        <span className="material-symbols-outlined text-xs absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 text-white">
                          north_east
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
    </main>
  );
}

function MainServiceView({ data }) {
  return (
    <div className="p-8 md:p-12 lg:p-14 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="relative z-10 space-y-6 flex-1">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {data.subtitle}
        </div>
        
        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-display font-black uppercase tracking-tighter leading-none text-slate-900 pr-8">
          {data.title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed">
          {data.description}
        </p>
        
        <div className="pt-8 space-y-3">
          {data.features.map((feature, i) => (
             <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-200/50 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">done</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-700">{feature}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecondaryServiceView({ data, icon }) {
  return (
    <div className="p-8 md:p-12 lg:p-14 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col relative overflow-hidden group">
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="w-20 h-20 bg-slate-50 flex items-center justify-center text-primary mb-8 border border-slate-100">
          <span className="material-symbols-outlined text-4xl">{icon}</span>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-3xl lg:text-5xl font-display font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
            {data.title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 inline-block px-3 py-1">
            {data.subtitle}
          </p>
          <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed pt-2">
            {data.description}
          </p>
        </div>
        
        <div className="pt-10 flex-1 flex flex-col justify-end">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Capacidades Analíticas</p>
          <div className="space-y-3">
            {data.features.map((feature, i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-primary/40"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{feature}</span>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
