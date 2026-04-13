"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const tabs = [
  {
    id: "01",
    title: "Sistemas Core 360°",
    desc: "Gestión completa y escalable.",
    icon: "layers"
  },
  {
    id: "02",
    title: "Contacto Directo",
    desc: "Escríbenos info@s2-project.com",
    icon: "alternate_email"
  },
  {
    id: "03",
    title: "Reserva tu Sesión",
    desc: "Disponibilidad en calendario.",
    icon: "calendar_month"
  }
];

const servicesList = [
  { title: "Estrategia de Contenido", desc: "Pilares narrativos de marca." },
  { title: "Planificación Mensual", desc: "Presencia omnipresente." },
  { title: "Producción Multi-Formato", desc: "Cinematografía de élite." },
  { title: "Edición & Post", desc: "Retoque y ritmo." },
  { title: "Crecimiento & Meta Ads", desc: "Escalamiento real." },
  { title: "Análisis de Datos", desc: "Optimización constante." }
];

export default function HomeInteractiveBoard() {
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
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 relative pb-20 lg:pb-40 bg-background-light">
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Column 1: Interactive Menu */}
        <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-16 space-y-2 z-20 flex-col snap-x lg:pb-0 h-fit">
           {tabs.map((tab, index) => {
             const isActive = activeTab === index;
             return (
               <button 
                 key={tab.id} 
                 onClick={() => handleTabClick(index)}
                 className={`text-left p-6 flex items-center gap-6 border-l-4 transition-all duration-300 group min-w-[280px] lg:min-w-0 snap-start ${isActive ? 'bg-white shadow-2xl border-primary scale-[1.02]' : 'bg-transparent border-transparent hover:bg-slate-100/50 hover:border-slate-200'}`}
               >
                 <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                   <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                 </div>
                 <div className="flex-1">
                   <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{tab.title}</h3>
                   {isActive && (
                     <motion.p initial={{opacity:0, h:0}} animate={{opacity:1, h:'auto'}} className="text-[10px] text-slate-400 font-body uppercase tracking-wider mt-1 block">
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

        {/* Column 2: Active Card Viewport */}
        <div className="lg:col-span-5 w-full mb-8 lg:mb-0">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 30 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="w-full h-full flex flex-col"
             >
               {activeTab === 0 && <ServicesView />}
               {activeTab === 1 && <ContactView />}
               {activeTab === 2 && <BookingView />}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Column 3: The Sticky Global Summary & CTA */}
        <div className="lg:col-span-4 h-full relative z-20">
          <div className="relative p-6 lg:p-8 md:p-12 rounded-none bg-slate-900 text-white overflow-hidden shadow-2xl h-full flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.25)_0%,_transparent_75%)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full space-y-8">
              
              <div className="space-y-4">
                <span className="inline-block text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  Agencia Boutique
                </span>
                <h2 className="text-4xl xl:text-5xl font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                  Resultados <br />
                  <span className="text-primary italic">Comprobados</span>
                </h2>
                <p className="text-sm text-slate-400 font-body leading-relaxed max-w-sm">
                  Dej&oacute; de ser sobre hacer contenido bonito. Ahora se trata de conversi&oacute;n y posicionamiento de &eacute;lite.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1 content-center py-4">
                 <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+185%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">Interacci&oacute;n</p>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+42%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">Alcance Real</p>
                 </div>
                 <div className="col-span-2 p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+35%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">En Consultas y Leads</p>
                 </div>
              </div>

              {/* Fully Integrated ROI Action Button */}
              <div className="pt-2 mt-auto">
                <div className="relative group block w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 blur-sm opacity-0 group-hover:opacity-40 transition duration-700"></div>
                  <Link
                    href="https://api.whatsapp.com/send?phone=50660060026"
                    target="_blank"
                    className="relative flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 text-white px-4 py-5 w-full rounded-none font-display font-bold uppercase tracking-[0.1em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                    <span className="relative z-10 flex-shrink-0 text-center">Inicia tu Transformaci&oacute;n</span>
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
  );
}

function ServicesView() {
  return (
    <div className="p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex-1">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined justify-center items-center text-3xl">layers</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          Sistemas <br /> Integrales 360&deg;
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md">
          Dise&ntilde;amos e implementamos operaciones completas de crecimiento mensual.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 pt-4">
           {servicesList.map((srv, i) => (
             <div key={i} className="flex gap-4">
                <span className="text-primary font-black opacity-30 font-display">0{i+1}</span>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">{srv.title}</h4>
                  <p className="text-[10px] text-slate-500">{srv.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between">
      <div className="space-y-6 flex-1 flex flex-col">
        <div className="w-16 h-16 bg-slate-900 flex items-center justify-center text-white">
          <span className="material-symbols-outlined justify-center items-center text-3xl">forum</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          A un <span className="text-primary italic">Click</span> <br/> de Distancia
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md pb-4">
          Nuestra agencia opera 100% remota atendiendo clientes a nivel global.
        </p>
        
        <div className="space-y-4 flex-1">
          <a href="mailto:info@s2-project.com" className="group flex items-center gap-4 p-6 bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all">
             <span className="material-symbols-outlined text-primary">mail</span>
             <div>
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Escr&iacute;benos</p>
               <p className="text-sm font-bold text-slate-900">info@s2-project.com</p>
             </div>
          </a>
          <a href="https://api.whatsapp.com/send?phone=50660060026" target="_blank" className="group flex items-center gap-4 p-6 bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all">
             <span className="material-symbols-outlined text-[#25D366]">chat</span>
             <div>
               <p className="text-[8px] font-black uppercase tracking-widest text-[#25D366]">WhatsApp Directo</p>
               <p className="text-sm font-bold text-slate-900">+506 6006 0026</p>
             </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function BookingView() {
  return (
    <div className="p-4 md:p-8 rounded-none bg-white border border-slate-100 shadow-xl w-full h-[600px] flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">event_available</span>
        </div>
        <div>
          <h3 className="text-xl font-display font-black uppercase tracking-tight text-slate-900">
            Agenda Abierta
          </h3>
          <p className="text-xs text-slate-500">Selecciona tu d&iacute;a preferido abajo</p>
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        <iframe 
          src="https://calendar.app.google/zadeELEGddkDxJ829"
          style={{ border: 0, width: "100%", height: "100%" }} 
          frameBorder="0" 
          scrolling="yes"
          className="bg-white"
        />
      </div>
    </div>
  );
}
