"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Diagnóstico",
    desc: "Analizamos tu marca, tu industria y tu competencia. Definimos cómo diferenciarte y hacia dónde llevarte.",
    icon: "analytics"
  },
  {
    id: "02",
    title: "Planificación",
    desc: "Creamos el calendario mensual: cada pieza pensada, cada publicación con intención.",
    icon: "calendar_month"
  },
  {
    id: "03",
    title: "Producción",
    desc: "Grabamos con equipo profesional y ojo estratégico. Cada detalle importa: luz, encuadre, sonido, dirección.",
    icon: "videocam"
  },
  {
    id: "04",
    title: "Edición",
    desc: "Editamos con ritmo, estilo y propósito. Publicamos en los momentos justos, con copies que invitan a accionar.",
    icon: "tune"
  },
  {
    id: "05",
    title: "Crecimiento",
    desc: "Hacemos crecer tu marca: más visibilidad, más presencia, más conversación, más oportunidades.",
    icon: "trending_up"
  }
];

const metrics = [
  { label: "Interacción", value: "+185%", icon: "rebase_edit" },
  { label: "Alcance", value: "+42%", icon: "rocket_launch" },
  { label: "Seguidores", value: "+1,200", icon: "group_add" },
  { label: "Consultas", value: "+35%", icon: "forum" },
  { label: "Ventas", value: "+28%", icon: "payments" },
  { label: "Visualizaciones", value: "+90K", icon: "visibility" }
];

export default function ProcesoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    
    // Reset progress when step changes
    setProgress(0);
    
    const duration = 5000;
    const interval = 50; 
    const step = (interval / duration) * 100;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + step, 100));
    }, interval);

    const stepInterval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isPaused, activeStep]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
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
    <div className="flex-1 flex flex-col bg-white relative overflow-x-hidden min-h-screen w-full">
      {/* Hero Header - Compact Version (75% scale) */}
      <section className="relative w-full pt-[clamp(120px,14vh,160px)] pb-8 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2 mb-3"
          >
            <span className="h-[1px] w-6 bg-primary/40"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.8em] text-primary">S2 PROJECT</span>
            <span className="h-[1px] w-6 bg-primary/40"></span>
          </motion.div>
          <h1 className="text-[clamp(2rem,5.5vw,4.2rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] relative inline-block">
            Así <span className="text-primary italic">Trabajamos</span>
          </h1>
        </div>
      </section>

      {/* DASHBOARD GRID - Compact Geometry (75% scale) */}
      <section className="w-full relative pb-16 bg-white flex-1 flex flex-col justify-center">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative px-[clamp(1.2rem,5vw,4.5rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Interactive Menu (Sticky & Compact) */}
          <div className="hidden lg:flex lg:col-span-3 space-y-1.5 z-20 flex-col h-fit sticky top-[140px]">
             {steps.map((step, index) => {
               const isActive = activeStep === index;
               return (
                 <button 
                   key={step.id} 
                   onClick={() => handleStepClick(index)}
                   className={`text-left p-4.5 flex items-center gap-4 border-l-4 transition-all duration-300 group min-w-0 relative ${isActive ? 'bg-white shadow-xl border-primary scale-[1.02] z-10' : 'bg-transparent border-transparent hover:bg-slate-100/50'}`}
                 >
                   <div className={`w-10 h-10 flex flex-shrink-0 items-center justify-center font-black text-lg transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                     <span className="material-symbols-outlined text-lg">{step.icon}</span>
                   </div>
                   <div className="flex-1 overflow-hidden">
                     <h3 className={`font-display font-black uppercase text-[10px] md:text-xs tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                       {step.id} {step.title}
                     </h3>
                     {isActive && (
                       <motion.div className="absolute left-0 bottom-0 h-[1.5px] bg-primary/20" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
                     )}
                   </div>
                 </button>
               );
             })}
          </div>

          {/* Mobile Carousel (Compact) */}
          <div className="lg:hidden w-full flex items-center justify-between pb-6 gap-2 z-20 px-2">
             <button onClick={handlePrev} className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                 <span className="material-symbols-outlined text-lg">chevron_left</span>
             </button>
             
             <div className="flex-1 overflow-hidden relative min-h-[40px] flex items-center justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeStep}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="absolute inset-0 flex items-center justify-center w-full"
                   >
                     <div className="bg-slate-900 mx-auto p-1.5 pr-4 rounded-full flex items-center gap-2.5 shadow-lg max-w-full cursor-pointer" onClick={handleNext}>
                         <div className="w-6 h-6 rounded-full bg-primary text-white flex flex-shrink-0 items-center justify-center font-black shadow-inner">
                            <span className="material-symbols-outlined text-[0.8rem]">{steps[activeStep].icon}</span>
                         </div>
                         <h3 className="font-display font-black uppercase text-[9px] tracking-widest text-white whitespace-nowrap truncate pr-1">
                            {steps[activeStep].id} {steps[activeStep].title}
                         </h3>
                      </div>
                   </motion.div>
                 </AnimatePresence>
             </div>
             
             <button onClick={handleNext} className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                 <span className="material-symbols-outlined text-lg">chevron_right</span>
             </button>
          </div>

          {/* Column 2: Active Card Viewport (Integrated & Compact) */}
          <div className="lg:col-span-5 w-full">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="w-full h-full flex flex-col"
               >
                 <ProcessCard step={steps[activeStep]} />
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Column 3: Results & CTA (Compact) */}
          <div className="lg:col-span-4 h-full relative z-20">
            <div className="relative p-6 md:p-8 lg:p-10 rounded-none bg-slate-900 text-white overflow-hidden shadow-2xl h-full flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.25)_0%,_transparent_75%)] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="space-y-3">
                  <span className="inline-block text-[8px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    Nuestra Metodología
                  </span>
                  <h2 className="text-3xl xl:text-4xl font-display font-black uppercase tracking-tight leading-[0.9] text-white">
                    Resultados <br />
                    <span className="text-primary italic">Probados</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 font-body leading-relaxed max-w-xs">
                    Lo que logramos para nuestras marcas a traves de este proceso estrategico.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1 content-center">
                  {metrics.slice(0, 4).map((metric, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div className="text-xl font-display font-black text-white">{metric.value}</div>
                      <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 mt-1 truncate">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 mt-auto">
                  <div className="relative group block w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 blur-sm opacity-0 group-hover:opacity-40 transition duration-700"></div>
                    <Link
                      href="https://api.whatsapp.com/send?phone=50660060026"
                      target="_blank"
                      className="relative flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 text-white px-4 py-4 w-full rounded-none font-display font-bold uppercase tracking-[0.1em] text-[10px] transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:shadow-[0_0_25px_-5px_rgba(var(--primary),0.5)]"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                      <span className="relative z-10 flex-shrink-0 text-center">Inicia tu Proceso</span>
                      <div className="relative z-10 w-5 h-5 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 rounded-none hidden sm:flex">
                        <span className="material-symbols-outlined text-[10px] absolute transition-transform duration-500 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]">
                          arrow_outward
                        </span>
                        <span className="material-symbols-outlined text-[10px] absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
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

function ProcessCard({ step }) {
  return (
    <div className="p-6 md:p-10 rounded-none bg-white border border-slate-100 shadow-xl w-full h-full flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 text-primary/5 font-display font-black text-[90px] pointer-events-none select-none">
        {step.id}
      </div>
      <div className="space-y-5 flex-1 relative z-10">
        <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">{step.icon}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          {step.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-500 font-body leading-relaxed max-w-sm">
          {step.desc}
        </p>
      </div>
      <div className="mt-auto pt-6 border-t border-slate-50 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Metodología de Alto Impacto</span>
      </div>
    </div>
  );
}
