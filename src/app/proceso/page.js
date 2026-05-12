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
    const resetTimer = setTimeout(() => {
      setProgress(0);
    }, 0);
    
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
      clearTimeout(resetTimer);
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
      {/* Hero Header Standardized */}
      <section className="relative w-full pt-[clamp(8rem,14vh,10rem)] pb-12 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[8px] mb-3 block">Metodología</span>
          <h1 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] relative inline-block">
            Así <span className="text-primary italic">Trabajamos</span>
          </h1>
          <p className="mt-8 text-[10px] md:text-xs font-body uppercase tracking-[0.3em] text-accent max-w-lg mx-auto leading-relaxed">
            Un proceso claro de 5 pasos para llevar tu marca de donde esta a donde quiere llegar
          </p>
        </div>
      </section>

      {/* DASHBOARD GRID — Expanded to fill horizontal space */}
      <section className="w-full relative pb-12 bg-white flex-1 flex flex-col justify-center">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative px-[clamp(1.5rem,6vw,6rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Interactive Menu (Expanded to 6 columns) */}
          <div className="hidden lg:flex lg:col-span-6 space-y-2 z-20 flex-col h-fit sticky top-[160px]">
             {steps.map((step, index) => {
               const isActive = activeStep === index;
               return (
                 <button 
                   key={step.id} 
                   onClick={() => handleStepClick(index)}
                   className={`text-left p-6 flex items-center gap-6 transition-all duration-500 group min-w-0 relative rounded-[30px] ${isActive ? 'bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] scale-[1.03] z-10' : 'bg-transparent hover:bg-slate-50'}`}
                 >
                   <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                     <span className="material-symbols-outlined text-xl">{step.icon}</span>
                   </div>
                   <div className="flex-1 overflow-hidden">
                     <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                       {step.id} {step.title}
                     </h3>
                     {isActive && (
                       <motion.div className="absolute left-0 bottom-0 h-[2px] bg-primary/20" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
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
                     key={activeStep}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.2, ease: "easeOut" }}
                     className="absolute inset-0 flex items-center justify-center w-full"
                   >
                     <div className="bg-slate-900 mx-auto p-2 pr-5 rounded-full flex items-center gap-3 shadow-xl max-w-full cursor-pointer" onClick={handleNext}>
                         <div className="w-8 h-8 rounded-full bg-primary text-white flex flex-shrink-0 items-center justify-center font-black shadow-inner">
                            <span className="material-symbols-outlined text-[1rem]">{steps[activeStep].icon}</span>
                         </div>
                         <h3 className="font-display font-black uppercase text-[10px] sm:text-xs tracking-widest text-white whitespace-nowrap truncate w-full pr-2">
                            {steps[activeStep].id} {steps[activeStep].title}
                         </h3>
                      </div>
                   </motion.div>
                 </AnimatePresence>
             </div>
             
             <button onClick={handleNext} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 transition-colors">
                 <span className="material-symbols-outlined text-xl">chevron_right</span>
             </button>
          </div>

          {/* Column 2: Active Card Viewport (Expanded to 6 columns) */}
          <div className="lg:col-span-6 w-full">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="w-full h-full flex flex-col"
                >
                 <ProcessCard step={steps[activeStep]} />
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Results Section (Standardized — Now below grid) */}
      <section className="w-full pb-20 px-[clamp(1.5rem,6vw,6rem)]">
        <div className="relative p-8 md:p-12 lg:p-16 bg-slate-900 text-white overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 group">
          <div className="absolute inset-0 bg-slate-900/50 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                Nuestra Metodología
              </span>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>
            
            <h2 className="text-4xl xl:text-6xl font-display font-black uppercase tracking-tight leading-[0.85] text-white">
              Resultados <br />
              <span className="text-primary italic">Probados</span>
            </h2>
            
            <p className="text-sm md:text-base text-slate-400 font-body leading-relaxed max-w-xl">
              Lo que logramos para nuestras marcas a través de este proceso estratégico. Cada paso está diseñado para convertir visibilidad en crecimiento.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-auto">
             {metrics.slice(0, 6).map((metric, idx) => (
               <div key={idx} className="p-6 bg-white/5 border border-white/10 flex flex-col items-center text-center justify-center group-hover:bg-white/10 transition-colors duration-500 rounded-[20px] md:rounded-[30px]">
                 <div className="text-xl md:text-2xl font-display font-black text-white">{metric.value}</div>
                 <p className="text-[8px] font-black uppercase tracking-widest text-accent mt-2">{metric.label}</p>
               </div>
             ))}
          </div>

          <div className="relative z-10 w-full lg:w-auto">
             <Link
               href="https://api.whatsapp.com/send?phone=50660060026"
               target="_blank"
               className="relative flex items-center justify-center gap-4 bg-primary text-white px-10 py-6 w-full lg:w-auto rounded-none font-display font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 overflow-hidden active:scale-95 shadow-xl hover:bg-slate-950"
             >
               <span className="relative z-10">Inicia tu Proceso</span>
               <span className="material-symbols-outlined text-sm relative z-10">arrow_outward</span>
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function ProcessCard({ step }) {
  return (
    <div className="p-10 md:p-16 rounded-[60px] bg-white border border-slate-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] w-full h-full flex flex-col justify-between relative overflow-hidden transition-all duration-700">
      <div className="absolute top-0 right-0 p-8 text-primary/5 font-display font-black text-[120px] pointer-events-none select-none">
        {step.id}
      </div>
      <div className="space-y-6 flex-1 relative z-10">
        <div className="w-16 h-16 bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-3xl">{step.icon}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 pr-8">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-slate-500 font-body leading-relaxed max-w-2xl">
          {step.desc}
        </p>
        
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="flex gap-4">
              <span className="text-primary font-black opacity-30 font-display italic text-lg">01</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Eficiencia</p>
                <p className="text-[10px] text-slate-400">Optimizado por S2</p>
              </div>
           </div>
           <div className="flex gap-4">
              <span className="text-primary font-black opacity-30 font-display italic text-lg">02</span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Escalabilidad</p>
                <p className="text-[10px] text-slate-400">Diseñado para crecer</p>
              </div>
           </div>
        </div>
      </div>
      <div className="mt-auto pt-8 border-t border-slate-50 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Metodología de Alto Impacto</span>
      </div>
    </div>
  );
}
