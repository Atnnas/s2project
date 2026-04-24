"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const tabs = [
  {
    id: "01",
    title: "Servicios",
    desc: <>Lo que hacemos por tu <br /> marca.</>,
    icon: "layers"
  },
  {
    id: "02",
    title: "Contacto",
    desc: "info@s2-project.com",
    icon: "alternate_email"
  },
  {
    id: "03",
    title: "Agenda tu Consulta",
    desc: "Disponibilidad en calendario.",
    icon: "calendar_month"
  }
];

const servicesList = [
  { title: "Estrategia", desc: "Direccion clara con proposito." },
  { title: "Planificacion", desc: "Cada publicacion pensada." },
  { title: "Produccion", desc: "Video, foto, reels." },
  { title: "Edicion", desc: "Ritmo, estilo, detalle." },
  { title: "Meta Ads", desc: "Campanas que convierten." },
  { title: "Analisis", desc: "Datos que informan decisiones." }
];

export default function HomeInteractiveBoard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bookingStep, setBookingStep] = useState('initial'); // 'initial' or 'redirected'
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    // Si estamos en el panel de reserva y se inició el proceso, pausar permanentemente hasta resetear
    const shouldPause = isPaused || (activeTab === 2 && bookingStep === 'redirected');
    if (shouldPause) return;
    
    // Autoplay interval (rotates every 5 seconds)
    const intervalId = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused, activeTab, bookingStep]);

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
    <section id="home-interactive-board" className="w-full relative pb-12 bg-white flex-1 flex flex-col justify-center">
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative px-[clamp(1.2rem,4vw,4.5rem)]"
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
                     <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-[10px] text-slate-400 font-body uppercase tracking-wider mt-1 block">
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
                {activeTab === 2 && (
                  <BookingView 
                    step={bookingStep} 
                    onBooking={() => {
                      window.open("https://calendar.app.google/zadeELEGddkDxJ829", "_blank", "noopener,noreferrer");
                      setBookingStep('redirected');
                    }}
                    onReset={() => setBookingStep('initial')}
                  />
                )}
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
                  Resultados
                </h2>
                <p className="text-sm text-slate-400 font-body leading-relaxed max-w-sm">
                  Las marcas que trabajan con nosotros crecen. Asi de simple.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1 content-center py-4">
                 <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+185%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">Interacci&oacute;n</p>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+42%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">Alcance</p>
                 </div>
                 <div className="col-span-2 p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                   <div className="text-3xl font-display font-black text-white">+35%</div>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 truncate">Consultas</p>
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
          Todo lo que tu marca <br /> Necesita
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md">
          Un servicio mensual completo. Todo cubierto.
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
          <span className="text-primary italic">Hablemos</span>
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-md pb-4">
          Trabajamos con marcas en Costa Rica, Panama y toda Latinoamerica.
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

function BookingView({ step, onBooking, onReset }) {
  const calendarUrl = "https://calendar.app.google/zadeELEGddkDxJ829";

  return (
    <div className="p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="container mx-auto px-[clamp(1.5rem,6vw,6rem)] relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">event_available</span>
        </div>
        
        <AnimatePresence mode="wait">
          {step === 'initial' ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
                Agenda tu <br /> <span className="text-primary italic">Sesión Directa</span>
              </h3>
              <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-sm">
                Sin intermediarios. Selecciona el espacio que mejor te funcione y hablemos de tu visión.
              </p>
              
              <button
                onClick={onBooking}
                className="group w-full py-6 bg-slate-900 text-white font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-xl shadow-slate-200 mt-4"
              >
                Ver Disponibilidad
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">calendar_month</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="redirected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-6"
            >
              <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl animate-pulse">check_circle</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 uppercase tracking-tight">
                ¡Calendario Abierto!
              </h3>
              <p className="text-sm text-slate-500 font-body leading-relaxed">
                Hemos abierto el sistema en una <span className="font-bold text-primary">nueva ventana</span> para garantizar seguridad total en tu dispositivo.
              </p>
              <div className="pt-4 space-y-4">
                <a 
                  href={calendarUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-primary font-black uppercase tracking-widest text-[10px] hover:underline"
                >
                  Abrir de nuevo <span className="material-symbols-outlined text-sm align-middle">open_in_new</span>
                </a>
                <button 
                  onClick={onReset}
                  className="flex items-center gap-2 mx-auto text-slate-300 hover:text-slate-500 transition-colors text-[10px] font-black uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-xs">arrow_back</span>
                  Volver al inicio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-8 flex items-center gap-6 opacity-30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs text-primary">verified</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Google Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs text-primary">lock</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Secure Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}
