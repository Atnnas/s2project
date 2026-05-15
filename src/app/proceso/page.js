"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GlassIconButton from "@/components/ui/GlassIconButton";
import AnimatedButtonText from "@/components/ui/AnimatedButtonText";

const steps = [
  {
    id: "01",
    title: "Diagnóstico",
    desc: "Analizamos tu marca, tu industria y tu competencia. Definimos como diferenciarte y hacia dónde llevarte.",
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
  const [showContactModal, setShowContactModal] = useState(false);
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
    <div className="flex-1 flex flex-col bg-[#cadedd] relative overflow-x-hidden min-h-screen w-full">
      {/* CINEMATIC GRAIN TEXTURE */}
      <motion.div 
        animate={{ 
          x: [0, -10, 10, -5, 0],
          y: [0, 5, -10, 5, 0]
        }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-repeat" 
      />

      {/* PURE BACKGROUND - NO AMBIENT LIGHTS */}


      {/* HERO SECTION */}
      <section className="relative w-full pt-44 pb-4 px-6 shrink-0 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black uppercase tracking-tighter text-primary-dark leading-[0.9] relative inline-block mb-4">
              ASÍ <span className="text-primary italic block md:inline">TRABAJAMOS</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[clamp(1rem,1.5vw,1.4rem)] text-accent font-body max-w-2xl mx-auto leading-relaxed"
            >
              Un proceso claro de 5 pasos para llevar tu marca de donde <span className="text-primary font-medium italic">está</span> a donde quiere llegar.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section className="w-full relative pb-24 flex-1 flex flex-col justify-start pt-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative px-[clamp(1.5rem,6vw,6rem)]">
          
          {/* MENU - LEFT SIDE */}
          <div className="hidden lg:flex lg:col-span-6 space-y-3 flex-col h-fit sticky top-32 pr-8 border-r border-slate-100 pt-0">
            {/* Vertical Indicator Line */}
            <div className="absolute right-[-1px] top-0 bottom-0 w-[1px] bg-slate-100" />
            <motion.div 
              className="absolute right-[-1px] w-[2px] bg-primary z-30"
              animate={{ 
                height: 88,
                y: activeStep * 101 // Button h-[88px] + gap-3 (12px) + 1px border = 101 approx
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button 
                  key={step.id} 
                  onClick={() => handleStepClick(index)}
                  className={`text-left p-4 pr-8 flex items-center gap-5 transition-all duration-700 group min-w-0 rounded-[2rem] border border-transparent relative overflow-hidden h-[88px] ${isActive ? 'bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] scale-[1.02] z-10' : 'bg-transparent hover:bg-white/40 backdrop-blur-[2px]'}`}
                >
                  <div className="flex items-center gap-6">
                    <GlassIconButton 
                      icon={step.icon} 
                      color="primary" 
                      isActive={isActive} 
                      className="w-14 h-14 flex-shrink-0" 
                      iconClassName="text-2xl text-[#1d2729] transition-colors duration-500"
                    />
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 
                        className={`font-display font-black uppercase text-[9px] md:text-[9.35px] tracking-[0.25em] whitespace-nowrap transition-colors duration-500 origin-left ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}
                      >
                        <span className={isActive ? 'text-primary' : 'text-inherit opacity-60'}>0{index + 1}</span> {step.title}
                      </h3>
                    </div>
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

      {/* RESULTADOS PANEL - FULL WIDTH IMMERSIVE */}
      <section className="w-full pb-32 px-4 md:px-10">
        <div className="w-full">
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
                  <span className="italic font-light opacity-60 tracking-normal block mt-2 text-2xl md:text-4xl">Lo que logramos para nuestras marcas.</span>
                </h2>
              </div>
              
              <p className="text-base md:text-lg text-[#fdf9e1]/80 font-body leading-relaxed font-light">
                No creemos en la visibilidad vacía. Nuestro proceso está diseñado para generar <span className="text-[#fdf9e1] font-medium italic">retorno y posicionamiento real</span> de marca.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 relative z-10 w-full lg:w-auto flex justify-center lg:justify-start"
              >
                {/* Elegant Liquid Ripple Waves */}
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.8],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: i * 1.3,
                        ease: [0.25, 0.1, 0.25, 1] 
                      }}
                      className="absolute inset-0 bg-[#fdf9e1] rounded-full blur-2xl"
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => setShowContactModal(true)}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center justify-between gap-8 bg-[#fdf9e1] text-primary px-8 py-4 md:px-10 md:py-5 rounded-full font-body transition-all duration-500 hover:bg-white overflow-hidden w-full sm:w-auto border border-white/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(253,249,225,0.6),0_0_20px_rgba(253,249,225,0.2)]"
                >
                  {/* Glow Aura Layer */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                  <span className="relative z-10 flex flex-col items-start text-left">
                    <AnimatedButtonText 
                      text="QUIERO EMPEZAR" 
                      baseColor="#396542" 
                      className="font-display font-black text-lg md:text-xl tracking-tight"
                    />
                  </span>
                  
                  <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-primary/30 group-hover:rotate-[360deg]">
                    <span className="material-symbols-outlined text-xl text-primary group-hover:text-[#fdf9e1] transition-colors">arrow_forward</span>
                  </div>
                  
                  {/* Dynamic Glass Shimmer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                </motion.button>
              </motion.div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-4xl">
               {metrics.slice(0, 6).map((metric, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ scale: 1.05, x: 5 }}
                   className="flex items-center gap-4 pl-3 pr-8 py-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full group transition-all duration-500 hover:bg-white/20 shadow-lg w-full"
                 >
                    <GlassIconButton 
                      icon={metric.icon} 
                      color="pastel" 
                      darkMode={true}
                      isActive={true} 
                      className="w-10 h-10 flex-shrink-0" 
                      iconClassName="text-lg text-[#1d2729]"
                    />
                    <div className="flex flex-col">
                      <div className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-display font-black text-[#fdf9e1] leading-none tracking-tighter">
                        {metric.value}
                      </div>
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#fdf9e1]/50 leading-tight">
                        {metric.label}
                      </p>
                    </div>
                 </motion.div>
               ))}
               
               {/* Disclaimer sutil */}
               <div className="w-full mt-8 pt-6 border-t border-white/5">
                 <p className="text-[10px] md:text-[11px] text-[#fdf9e1]/40 font-body leading-relaxed text-center lg:text-left max-w-2xl mx-auto lg:mx-0 uppercase tracking-widest">
                   <span className="opacity-100 font-bold mr-1">*</span> MÉTRICAS PROMEDIO OBSERVADAS EN CUENTAS S2 PROJECT 2025.
                 </p>
               </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* CONTACT MODAL (Same as Nosotros) */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#1d2729]/95 backdrop-blur-xl"
              onClick={() => setShowContactModal(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-gradient-to-br from-[#2a4d32] to-[#1d2729] p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col space-y-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-[#fdf9e1] px-5 py-2 rounded-full">Próximo paso</span>
                    <h2 className="text-3xl md:text-5xl font-display font-black text-[#fdf9e1] uppercase leading-none tracking-tighter">
                      ¿Cómo prefieres <br />
                      <span className="italic font-light lowercase opacity-60 tracking-normal block mt-1">comenzar?</span>
                    </h2>
                  </div>
                  <button 
                    onClick={() => setShowContactModal(false)}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#fdf9e1]">close</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href="https://api.whatsapp.com/send?phone=50660060026"
                    target="_blank"
                    className="group flex items-center gap-6 p-4 rounded-[2rem] bg-transparent hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                  >
                    <GlassIconButton 
                      icon="chat" 
                      color="pastel" 
                      darkMode={true}
                      isActive={true} 
                      className="w-16 h-16 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500" 
                      iconClassName="text-2xl text-[#1d2729]"
                    />
                    <div>
                      <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">
                        <AnimatedButtonText text="Hablar por WhatsApp" baseColor="#fdf9e1" />
                      </h4>
                      <p className="text-xs text-[#fdf9e1]/50 font-body">Respuesta rápida</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-[#25D366] transition-colors group-hover:translate-x-1">arrow_forward</span>
                  </Link>

                  <Link
                    href="https://calendar.app.google/zadeELEGddkDxJ829" 
                    target="_blank"
                    className="group flex items-center gap-6 p-4 rounded-[2rem] bg-transparent hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
                  >
                    <GlassIconButton 
                      icon="calendar_month" 
                      color="pastel" 
                      darkMode={true}
                      isActive={true} 
                      className="w-16 h-16 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500" 
                      iconClassName="text-2xl text-[#1d2729]"
                    />
                    <div>
                      <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-white transition-colors">
                        <AnimatedButtonText text="Agendar en Calendario" baseColor="#fdf9e1" />
                      </h4>
                      <p className="text-xs text-[#fdf9e1]/50 font-body">Reunión virtual estratégica</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <GlassIconButton 
          icon={data.icon} 
          color="pastel" 
          darkMode={true} 
          isActive={true} 
          className="w-16 h-16 mb-8 mt-0" 
          iconClassName="text-3xl text-[#1d2729]"
        />
        
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
        
        <div className="pb-4" />
      </div>
    </motion.div>
  );
}
