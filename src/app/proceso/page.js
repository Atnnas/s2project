"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Diagnóstico y Estrategia",
    desc: "Analizamos la marca, su industria, su público y oportunidades para definir una dirección clara en redes sociales.",
    icon: "analytics",
    align: "left"
  },
  {
    id: "02",
    title: "Planificación de Contenido",
    desc: "Definimos ideas, formatos, frecuencia, estilo visual y estructura alineada a objetivos reales.",
    icon: "calendar_month",
    align: "right"
  },
  {
    id: "03",
    title: "Producción Profesional",
    desc: "Creamos contenido utilizando equipo 100% profesional, cuidando branding y ejecución.",
    icon: "videocam",
    align: "left"
  },
  {
    id: "04",
    title: "Edición y Optimización",
    desc: "Adaptamos contenido, optimizamos copies y analizamos el rendimiento constantemente.",
    icon: "tune",
    align: "right"
  },
  {
    id: "05",
    title: "Crecimiento y Resultados",
    desc: "Buscamos aumentar visibilidad, interacción, posicionamiento y oportunidades de venta.",
    icon: "trending_up",
    align: "left"
  }
];

const metrics = [
  { label: "Interacción", value: "+185%", icon: "rebase_edit" },
  { label: "Alcance", value: "+42%", icon: "rocket_launch" },
  { label: "Nuevos Seguidores", value: "+1,200", icon: "group_add" },
  { label: "Consultas", value: "+35%", icon: "forum" },
  { label: "Ventas", value: "+28%", icon: "payments" },
  { label: "Visualizaciones", value: "+90K", icon: "visibility" }
];

export default function ProcesoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    
    const intervalId = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
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

  const handleStepClick = (index) => {
    setActiveStep(index);
    handleInteraction();
  };

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    handleInteraction();
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
    handleInteraction();
  };

  return (
    <main className="bg-[#f8faf9] text-slate-900 selection:bg-primary/20 pt-8 sm:pt-10 lg:pt-12 pb-40">
      {/* Luz Cristalina Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mb-4 md:mb-6">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="space-y-4"
         >
           <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-6 bg-primary/40"></span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.8em] text-primary">METODOLOGÍA S2</span>
              <span className="h-[1px] w-6 bg-primary/40"></span>
           </div>
           {/* COMPACT SINGLE-LINE TITLE */}
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tighter text-slate-900">
             Proceso <span className="text-primary italic">Vertical</span>
           </h1>
         </motion.div>
      </section>

      {/* Main 3-Column Interactive Layout */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 relative pt-2 mb-20 lg:mb-40 min-h-[70vh]">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Interactive Menu (Desktop only, vertical list) */}
          <div className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-32 space-y-2 z-20 flex-col snap-x lg:pb-0 h-fit">
             {steps.map((step, index) => {
               const isActive = activeStep === index;
               return (
                 <button 
                   key={step.id} 
                   onClick={() => handleStepClick(index)}
                   className={`text-left p-6 flex items-center gap-6 border-l-4 transition-all duration-300 group min-w-[280px] lg:min-w-0 snap-start ${isActive ? 'bg-white shadow-2xl border-primary scale-[1.02]' : 'bg-transparent border-transparent hover:bg-slate-100 hover:border-slate-200'}`}
                 >
                   <div className={`w-12 h-12 flex shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                     {step.id}
                   </div>
                   <div className="flex-1">
                     <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{step.title}</h3>
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
                     key={activeStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.2, ease: "easeOut" }}
                     className="absolute inset-0 flex items-center justify-center w-full"
                   >
                     <div className="bg-slate-900 mx-auto p-2 pr-5 rounded-full flex items-center gap-3 transition-all shadow-xl max-w-full cursor-pointer" onClick={handleNext}>
                         <div className="w-8 h-8 rounded-full bg-primary text-white flex flex-shrink-0 items-center justify-center font-black shadow-inner">
                            <span className="text-[10px] sm:text-xs">{steps[activeStep].id}</span>
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <h3 className="font-display font-black uppercase text-[10px] sm:text-xs tracking-widest text-white whitespace-nowrap truncate w-full pr-2">
                               {steps[activeStep].title}
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
                 key={activeStep}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 30 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="w-full h-full flex flex-col"
               >
                 <ProcessCard step={{ ...steps[activeStep], align: 'left' }} index={activeStep} />
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Column 3: Sticky Results Board & Immediate CTA */}
          <div className="lg:col-span-4 h-full relative z-20">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative p-6 lg:p-8 rounded-none bg-slate-900 text-white overflow-hidden shadow-2xl h-full flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.25)_0%,_transparent_75%)] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col space-y-6">
                
                {/* Compact Header */}
                <div className="space-y-1">
                  <h2 className="text-3xl xl:text-5xl font-display font-black uppercase tracking-tight leading-none text-primary italic">
                    Resultados
                  </h2>
                  <p className="text-xs xl:text-sm text-slate-400 font-body leading-relaxed">
                    Datos reales que respaldan tu éxito institucional.
                  </p>
                </div>

                {/* Ultra-Dense Grid: Always 3 Columns */}
                <div className="grid grid-cols-3 gap-2 lg:gap-3 flex-1 content-center">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="p-3 lg:p-4 rounded-none bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-300 group flex flex-col justify-between h-full">
                      <div className="space-y-1 lg:space-y-2 flex flex-col h-full">
                        <span className="material-symbols-outlined text-primary text-xl lg:text-2xl group-hover:text-white transition-colors">
                          {metric.icon}
                        </span>
                        <div className="text-xl lg:text-2xl xl:text-3xl font-display font-black text-white group-hover:scale-105 transition-transform origin-left mt-auto">
                          {metric.value}
                        </div>
                        <p className="text-[6px] sm:text-[7px] xl:text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/80 transition-colors truncate">
                          {metric.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fully Integrated ROI Action Button */}
                <div className="pt-2">
                  <div className="relative group block w-full">
                    {/* Animated Glow Wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 blur-sm opacity-0 group-hover:opacity-40 transition duration-700"></div>
                    
                    <Link
                      href="https://api.whatsapp.com/send?phone=50660060026"
                      target="_blank"
                      className="relative flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 text-white px-4 py-4 w-full rounded-none font-display font-bold uppercase tracking-[0.1em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]"
                    >
                      {/* Background Sweep */}
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                      
                      {/* Button Text */}
                      <span className="relative z-10 flex-shrink-0 text-center">Solicitar Análisis ROI</span>
                      
                      {/* Icon Animation */}
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
            </motion.div>
          </div>

        </div>
      </section>

    </main>
  );
}

function ProcessCard({ step, index }) {
  const isRight = step.align === 'right';
  
  return (
    <div
      className={`p-10 md:p-16 rounded-none bg-white border border-slate-100 shadow-xl relative overflow-hidden group w-full h-full flex flex-col justify-between items-start text-left`}
    >
      <div className={`relative z-10 flex flex-col ${isRight ? 'items-end' : 'items-start'} h-full w-full`}>
        <div className="space-y-8 flex-1">
          <div className="w-20 h-20 rounded-none bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
            <span className="material-symbols-outlined text-4xl">{step.icon}</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 group-hover:text-primary transition-colors pr-8">
            {step.title}
          </h3>
          <p className="text-lg md:text-xl text-slate-500 font-body leading-relaxed max-w-xl">
            {step.desc}
          </p>
        </div>
        
        <div className="pt-8 w-full flex items-center gap-4 text-slate-300 mt-auto">
           {!isRight && <span className="h-[2px] w-12 bg-slate-100 group-hover:bg-primary/20"></span>}
           <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-primary">Fase Estrat&eacute;gica</span>
           {isRight && <span className="h-[2px] w-12 bg-slate-100 group-hover:bg-primary/20"></span>}
        </div>
      </div>
    </div>
  );
}
