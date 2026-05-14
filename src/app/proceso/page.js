"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: "01",
    title: "Diagnóstico",
    desc: "Analizamos tu marca, tu industria y tu competencia. Definimos cómo diferenciarte y hacia dónde llevarte con una estrategia de alto impacto.",
    icon: "analytics"
  },
  {
    id: "02",
    title: "Planificación",
    desc: "Creamos el calendario mensual: cada pieza pensada, cada publicación con intención estratégica y alineada a tus objetivos de negocio.",
    icon: "calendar_month"
  },
  {
    id: "03",
    title: "Producción",
    desc: "Grabamos con equipo profesional y ojo estratégico. Cada detalle importa: luz, encuadre, sonido, dirección y narrativa cinematográfica.",
    icon: "videocam"
  },
  {
    id: "04",
    title: "Edición",
    desc: "Editamos con ritmo, estilo y propósito. Publicamos en los momentos justos, con copies que invitan a accionar y retener a tu audiencia.",
    icon: "tune"
  },
  {
    id: "05",
    title: "Crecimiento",
    desc: "Hacemos crecer tu marca: más visibilidad, más presencia, más conversación, más oportunidades y un posicionamiento de autoridad real.",
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
    
    const duration = 5000;
    const interval = 50; 
    const stepValue = (interval / duration) * 100;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + stepValue, 100));
    }, interval);

    const stepInterval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isPaused, activeStep]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setProgress(0);
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 12000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background relative overflow-x-hidden min-h-screen w-full">
      {/* CINEMATIC GRAIN TEXTURE */}
      <motion.div 
        animate={{ 
          x: [0, -10, 10, -5, 0],
          y: [0, 5, -10, 5, 0]
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.07] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" 
      />

      {/* AMBIENT LIGHT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full pt-44 pb-4 px-6 shrink-0 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <p className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter text-primary-dark leading-[0.85] relative inline-block mb-4">
              Metodología <span className="text-primary italic block md:inline">Estratégica</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section className="w-full relative pb-24 flex-1 flex flex-col justify-start pt-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative px-[clamp(1.5rem,6vw,6rem)]">
          
          {/* MENU - LEFT SIDE */}
          <div className="hidden lg:flex lg:col-span-6 space-y-2 z-20 flex-col h-fit sticky top-32 pr-8 border-r border-slate-100">
            {/* Vertical Indicator Line */}
            <div className="absolute right-[-1px] top-0 bottom-0 w-[1px] bg-slate-100" />
            <motion.div 
              className="absolute right-[-1px] w-[2px] bg-primary z-30"
              animate={{ 
                height: 80,
                y: activeStep * 88 // Button h-20 (80px) + gap-2 (8px)
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button 
                  key={step.id} 
                  onClick={() => handleStepClick(index)}
                  className={`text-left px-4 flex items-center gap-6 transition-all duration-700 group min-w-0 rounded-2xl border border-transparent relative overflow-hidden h-20 ${isActive ? 'bg-white shadow-lg scale-[1.02] z-10' : 'bg-transparent hover:bg-white/40 backdrop-blur-[2px]'}`}
                >
                  <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black transition-all duration-500 rounded-xl ${isActive ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  </div>
                  <div className="flex-1 pr-1 overflow-hidden">
                    <h3 
                      className={`font-display font-black uppercase text-[10px] tracking-[0.3em] whitespace-nowrap transition-colors duration-500 origin-left ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}
                      style={{ transform: 'scale(0.36)' }}
                    >
                      Etapa {step.id}: {step.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* VIEWPORT - RIGHT SIDE */}
          <div className="lg:col-span-6 w-full sticky top-32 pt-0 mt-0">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <ProcessCard data={steps[activeStep]} />
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* RESULTS PANEL */}
      <section className="w-full pb-32 px-4 md:px-10 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-20 bg-gradient-to-br from-primary via-primary to-[#2a4d32] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-center justify-between gap-16"
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col space-y-8 max-w-2xl text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-[#fdf9e1] px-6 py-2.5 rounded-full w-fit mx-auto lg:mx-0 shadow-xl shadow-black/10">
                  Impacto Mensurable
                </span>
                <h2 className="text-[#fdf9e1] text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
                  Resultados <br />
                  <span className="italic font-light lowercase opacity-60 tracking-normal block mt-2 text-3xl md:text-5xl">que hablan por nosotros.</span>
                </h2>
              </div>
              
              <p className="text-base md:text-lg text-[#fdf9e1]/80 font-body leading-relaxed font-light">
                No creemos en la visibilidad vacía. Nuestro proceso está diseñado para generar <span className="text-[#fdf9e1] font-medium italic">retorno y posicionamiento real</span> de marca.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
               {metrics.slice(0, 4).map((metric, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ scale: 1.05 }}
                   className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group"
                 >
                    <span className="material-symbols-outlined text-[#fdf9e1] mb-2 opacity-40 group-hover:opacity-100 transition-opacity">{metric.icon}</span>
                    <div className="text-2xl font-display font-black text-[#fdf9e1]">{metric.value}</div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#fdf9e1]/40 mt-1">{metric.label}</p>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProcessCard({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="p-8 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full flex flex-col justify-between transition-all duration-700 relative overflow-hidden group"
    >
      <div className="absolute inset-0 rounded-[3.5rem] border-[1.5px] border-white/5 pointer-events-none" />
      
      <div className="space-y-8 flex-1 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-[#fdf9e1]/10 rounded-2xl flex items-center justify-center text-[#fdf9e1] shadow-inner transition-transform duration-500"
        >
          <span className="material-symbols-outlined text-3xl">{data.icon}</span>
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
          {data.desc}
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-[#fdf9e1]/10 mt-10">
           {[
             { title: "Metodología S2", sub: "Control de Calidad" },
             { title: "Optimización", sub: "Alta Eficiencia" }
           ].map((feature, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex gap-5 items-start group/item"
             >
                <span className="text-[#fdf9e1] font-black font-display text-xl opacity-10 mt-1 transition-opacity group-hover/item:opacity-30">0{i+1}</span>
                <div>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#fdf9e1] leading-tight mb-1">{feature.title}</h4>
                  <p className="text-[12px] text-[#fdf9e1]/30 font-body uppercase tracking-wider">{feature.sub}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
