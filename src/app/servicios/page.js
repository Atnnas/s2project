"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GlassIconButton from "@/components/ui/GlassIconButton";
import AnimatedButtonText from "@/components/ui/AnimatedButtonText";

/**
 * S2 DESIGN SYSTEM - PROFESSIONAL IMPLEMENTATION
 * Focus: Stability, Hierarchy, and Balanced Spacing.
 */

const mainService = {
  title: "Gestión Integral",
  subtitle: "Pensado para marcas que quieren crecer",
  description: "Gestionamos tu presencia digital de forma integral: estrategia, producción de contenido, diseño y seguimiento mensual. Todo con un objetivo claro: que tu marca crezca con consistencia y profesionalismo.",
  features: [
    "Objetivos claros desde el día uno",
    "Calendario, guiones y dirección creativa",
    "Grabación y edición profesional",
    "Pauta estratégica con seguimiento",
    "Análisis mensual y mejora continua"
  ]
};

const secondaryServices = [
  {
    id: "branding",
    title: "Identidad de Marca",
    subtitle: "Tu marca, desde cero o desde reinvención.",
    description: "Diseñamos la identidad visual de tu marca: logo, colores, tipografía y guía de uso. Todo lo que necesitas para proyectar presencia desde el primer día.",
    features: ["Diseño de logotipo", "Paleta de colores", "Sistema tipográfico", "Manual de marca", "Assets para redes sociales"]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "REAL ESTATE / Fotografía, video y drone para proyectos de alto nivel.",
    description: "Producción audiovisual de alto nivel para proyectos inmobiliarios. Cinematografía, drone y fotografía que transforman propiedades en experiencias.",
    features: ["Cinematografía Inmobiliaria", "Fotografía Aérea con Dron", "Recorridos Visuales Fluidos", "Edición Dinámica Musical", "Optimizados para Meta Ads"]
  },
  {
    id: "corporate",
    title: "Contenido Corporativo",
    subtitle: "Video institucional y eventos.",
    description: "Video institucional, entrevistas, casos de éxito y cobertura de eventos. Producciones pensadas para empresas que entienden el valor de comunicar bien.",
    features: ["Video institucional", "Entrevistas y testimonios", "Casos de éxito", "Cobertura de eventos", "Comunicación interna y ejecutiva"]
  }
];

const tabs = [
  { id: "01", title: "Gestión Integral", desc: "Estrategia mensual completa.", icon: "layers" },
  { id: "02", title: "Identidad de Marca", desc: "Branding con propósito.", icon: "architecture" },
  { id: "03", title: "Real Estate", desc: "Audiovisual inmobiliario.", icon: "domain" },
  { id: "04", title: "Contenido Corporativo", desc: "Comunicación empresarial.", icon: "business_center" }
];

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pricingTag, setPricingTag] = useState("Planes desde $500/mes");
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings?key=pricing_tag');
        const data = await res.json();
        if (data.success && data.data) {
          setPricingTag(data.data.value);
        }
      } catch (e) { console.error(e); }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (isPaused || isMobile) return;
    const intervalId = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isPaused, isMobile]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    handleInteraction();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#cadedd] relative overflow-x-hidden min-h-screen w-full">
      {/* CINEMATIC GRAIN TEXTURE - ANIMATED & MORE VISIBLE */}
      <motion.div 
        animate={{ 
          x: [0, -10, 10, -5, 0],
          y: [0, 5, -10, 5, 0]
        }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-repeat" 
      />
      
      {/* PURE BACKGROUND - NO AMBIENT LIGHTS */}


      {/* HERO SECTION - COMPACT & MINIMAL */}
      <section className="relative w-full pt-12 md:pt-44 pb-4 px-6 shrink-0 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black uppercase tracking-tighter text-primary-dark leading-[0.9] relative inline-block mb-4">
              SERVICIOS
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
          >
            <div className="relative flex flex-col items-center">
              <div className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase relative flex flex-nowrap justify-center items-center gap-x-3 whitespace-nowrap px-8 py-2">
                {/* TEXT: PLANES */}
                <div className="flex text-primary-dark">
                  {"PLANES".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        color: ["#1d2729", "#ffffff", "#1d2729"],
                        textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 10,
                        delay: i * 0.1 
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* TEXT: DESDE $500/MES */}
                <div className="flex text-primary italic font-medium lowercase tracking-tighter">
                  {"desde $500/mes".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      animate={{ 
                        opacity: [1, 0.6, 1],
                        color: ["#396542", "#ffffff", "#396542"],
                        textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 10,
                        delay: 0.6 + (i * 0.1) 
                      }}
                      className={char === " " ? "mx-1" : ""}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* MOBILE NAVIGATION CONTROLS - REPOSITIONED BELOW PLANES WITH SPECIFIC TRANSFORM */}
              <div className="lg:hidden flex flex-col items-center w-full">
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 1.5 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8"
                />

                <div className="flex items-center justify-center gap-12 mb-4 px-6">
                    <button 
                      onClick={() => handleTabClick((activeTab - 1 + tabs.length) % tabs.length)}
                      style={{ transform: 'translateX(-4.4px) translateY(4.4px)' }}
                      className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-primary-dark/60 shadow-2xl active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-3xl">chevron_left</span>
                    </button>

                    <div className="flex gap-2" style={{ transform: 'translateX(-4.4px) translateY(4.4px)' }}>
                      {tabs.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeTab === i ? 'bg-primary w-4' : 'bg-primary/10'}`} 
                        />
                      ))}
                    </div>

                    <button 
                      onClick={() => handleTabClick((activeTab + 1) % tabs.length)}
                      style={{ transform: 'translateX(-4.4px) translateY(4.4px)' }}
                      className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-primary-dark/60 shadow-2xl active:scale-90 transition-all"
                    >
                      <span className="material-symbols-outlined text-3xl">chevron_right</span>
                    </button>
                </div>
              </div>

              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-5"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section className="w-full relative pb-24 flex-1 z-10 px-[clamp(1.5rem,6vw,6rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-0">
          
          {/* MENU - LEFT SIDE */}
          <div className="hidden lg:flex lg:col-span-6 space-y-3 flex-col h-fit sticky top-16 pr-8 border-r border-slate-100 -mt-40 pt-0">
            {/* Vertical Indicator Line */}
            <div className="absolute right-[-1px] top-0 bottom-0 w-[1px] bg-slate-100" />
            <motion.div 
              className="absolute right-[-1px] w-[2px] bg-primary z-30"
              animate={{ 
                height: 88,
                y: activeTab * 101
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {tabs.map((tab, index) => {
              const isActive = activeTab === index;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabClick(index)}
                  className={`text-left p-4 pr-8 flex items-center gap-6 transition-all duration-700 group min-w-0 rounded-[2rem] border border-transparent relative overflow-hidden h-[88px] ${isActive ? 'bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] scale-[1.02] z-10' : 'bg-transparent hover:bg-white/40 backdrop-blur-[2px]'}`}
                >
                  <GlassIconButton 
                    icon={tab.icon} 
                    color="primary" 
                    isActive={isActive} 
                    className="w-14 h-14 flex-shrink-0" 
                    iconClassName="text-2xl text-[#1d2729] transition-colors duration-500"
                  />
                  <div className="flex-1 pr-1 overflow-hidden">
                    <h3 
                      className={`font-display font-bold uppercase text-[8px] md:text-[8px] tracking-[0.15em] whitespace-nowrap transition-colors duration-500 origin-left ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}
                    >
                      {tab.title}
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
                  key={activeTab}
                  initial={isMobile ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={isMobile ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: isMobile ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex flex-col pt-0 mt-0"
                >
                  {activeTab === 0 && <MainServiceView data={mainService} isMobile={isMobile} />}
                  {activeTab === 1 && <SecondaryServiceView data={secondaryServices[0]} icon="architecture" isMobile={isMobile} />}
                  {activeTab === 2 && <SecondaryServiceView data={secondaryServices[1]} icon="domain" isMobile={isMobile} />}
                  {activeTab === 3 && <SecondaryServiceView data={secondaryServices[2]} icon="business_center" isMobile={isMobile} />}
                </motion.div>
             </AnimatePresence>

             {/* MOBILE PAGINATION DOTS (Keep it subtle) */}
             <div className="flex lg:hidden items-center justify-center mt-8 gap-2">
                {tabs.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeTab === i ? 'bg-primary w-4' : 'bg-primary/10'}`} 
                  />
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* CONVERSION PANEL - ULTRA PREMIUM EDITORIAL */}
      <section className="w-full pb-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-20 bg-gradient-to-br from-primary via-primary to-[#2a4d32] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-center justify-between gap-16"
          >
            {/* Ambient Light Effect */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col space-y-8 max-w-2xl text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-primary bg-[#fdf9e1] px-6 py-2.5 rounded-full w-fit mx-auto lg:mx-0 shadow-xl shadow-black/10">
                  CONSULTA EXCLUSIVA
                </span>
                <h2 className="text-[#fdf9e1] text-4xl md:text-6xl font-display font-black uppercase leading-[0.9] tracking-tighter">
                  Diagnóstico <br />
                  <span className="italic font-light lowercase opacity-60 tracking-normal block mt-2 text-3xl md:text-5xl">sin costo.</span>
                </h2>
              </div>
              
              <div className="w-20 h-[1px] bg-[#fdf9e1]/30 mx-auto lg:mx-0" />

              <p className="text-base md:text-lg text-[#fdf9e1]/80 font-body leading-relaxed font-light">
                Analizamos tu marca y te compartimos una lectura estratégica clara. Sin compromiso, con el mismo criterio con el que trabajamos cada cuenta.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto flex justify-center lg:justify-start">
              {/* Elegant Liquid Ripple Waves */}
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
                    ease: [0.25, 0.1, 0.25, 1] // Custom smooth bezier
                  }}
                  className="absolute inset-0 bg-[#fdf9e1] rounded-full blur-2xl -z-10"
                />
              ))}

              <motion.button
                onClick={() => setShowContactModal(true)}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-between gap-8 bg-[#fdf9e1] text-[#1d2729] px-8 py-4 md:px-10 md:py-5 rounded-full font-body transition-all duration-500 hover:bg-white overflow-hidden w-full sm:w-auto border border-white/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(253,249,225,0.6),0_0_20px_rgba(253,249,225,0.2)]"
              >
                {/* Glow Aura Layer (Hover) */}
                <div className="absolute inset-0 bg-[#fdf9e1] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

                <span className="relative z-10 flex flex-col items-center text-center">
                  <AnimatedButtonText 
                    text="Diagnóstico visual" 
                    baseColor="#396542" 
                    className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black mb-1 opacity-70"
                  />
                  <div className="flex flex-col leading-[0.9]">
                    <AnimatedButtonText 
                      text="AGENDA TU" 
                      baseColor="#1d2729" 
                      className="font-display font-black text-lg md:text-xl tracking-tight"
                    />
                    <AnimatedButtonText 
                      text="CONSULTA" 
                      baseColor="#1d2729" 
                      className="font-display font-black text-lg md:text-xl tracking-tight"
                    />
                  </div>
                </span>
                
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-[#1d2729] rounded-full flex items-center justify-center group-hover:bg-[#396542] transition-all duration-500 flex-shrink-0 shadow-lg group-hover:shadow-[#396542]/30 group-hover:rotate-[360deg]">
                  <span className="material-symbols-outlined text-xl text-[#fdf9e1]">arrow_forward</span>
                </div>
                
                {/* Dynamic Glass Shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL DE CONTACTO */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-primary w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-3xl font-display font-black text-[#fdf9e1] mb-2 uppercase tracking-tight">Conecta con S2</h3>
              <p className="text-[#fdf9e1]/70 font-body text-sm mb-8">Elige el medio que prefieras para comunicarte con nuestro equipo estratégico.</p>

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
                    <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">Hablar por WhatsApp</h4>
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
                    <h4 className="font-display font-black uppercase text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-white transition-colors">Agendar en Calendario</h4>
                    <p className="text-xs text-[#fdf9e1]/50 font-body">Reunión virtual estratégica</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainServiceView({ data, isMobile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full flex flex-col justify-between transition-all duration-700 relative overflow-hidden group mt-0"
    >
      {/* Ambient Light Rim */}
      <div className="absolute inset-0 rounded-[3.5rem] border-[1.5px] border-white/5 pointer-events-none" />
      
      <div className="space-y-8 flex-1 relative z-10 pt-0">
        <GlassIconButton 
          icon="layers" 
          color="pastel" 
          darkMode={true} 
          isActive={true} 
          className="w-16 h-16 mb-8 mt-0" 
          iconClassName="text-3xl text-[#1d2729]"
        />
        
        <motion.h3 
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0 : 0.4 }}
          className="text-3xl md:text-[3.3rem] font-display font-black uppercase tracking-tight leading-[0.9] text-[#fdf9e1]"
        >
          {data.title}
        </motion.h3>
 
        {data.subtitle && (
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.35, duration: isMobile ? 0 : 0.4 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary-dark shadow-[0_0_10px_rgba(57,101,66,0.5)]" />
            <p className="text-[9px] md:text-[10px] font-display font-black text-[#fdf9e1] uppercase tracking-[0.3em] leading-none">
              {data.subtitle}
            </p>
          </motion.div>
        )}
        
        <motion.p 
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0 : 0.4 }}
          className="text-base md:text-lg text-[#fdf9e1]/70 font-body leading-relaxed max-w-3xl font-light"
        >
          {data.description}
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-[#fdf9e1]/10 mt-10">
           {data.features.map((feature, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex gap-5 items-center group/item"
             >
                <span className="text-[#fdf9e1] font-black font-display text-xl opacity-10 transition-opacity group-hover/item:opacity-30">0{i+1}</span>
                <div>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-[#fdf9e1] leading-tight">{feature}</h4>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function SecondaryServiceView({ data, icon, isMobile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 md:p-14 rounded-[3.5rem] bg-gradient-to-br from-primary to-[#2a4d32] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] w-full flex flex-col justify-between transition-all duration-700 relative overflow-hidden group mt-0"
    >
      {/* Ambient Light Rim */}
      <div className="absolute inset-0 rounded-[3.5rem] border-[1.5px] border-white/5 pointer-events-none" />

      <div className="space-y-8 flex-1 relative z-10 pt-0">
        <GlassIconButton 
          icon={icon} 
          color="pastel" 
          darkMode={true} 
          isActive={true} 
          className="w-16 h-16 mb-8 mt-0" 
          iconClassName="text-3xl text-[#1d2729]"
        />
        
        <motion.h3 
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.3, duration: isMobile ? 0 : 0.4 }}
          className="text-3xl md:text-[3.3rem] font-display font-black uppercase tracking-tight leading-[0.9] text-white"
        >
          {data.title}
        </motion.h3>
 
        {data.subtitle && (
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.35, duration: isMobile ? 0 : 0.4 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#fdf9e1] shadow-[0_0_10px_rgba(253,249,225,0.4)]" />
            <p className="text-[9px] md:text-[10px] font-display font-black text-[#fdf9e1] uppercase tracking-[0.3em] leading-none">
              {data.subtitle}
            </p>
          </motion.div>
        )}
        
        <motion.p 
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.4, duration: isMobile ? 0 : 0.4 }}
          className="text-base md:text-lg text-white/70 font-body leading-relaxed max-w-3xl font-light"
        >
          {data.description}
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-white/10 mt-10">
           {data.features.map((feature, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="flex gap-5 items-center group/item"
             >
                <span className="text-white font-black font-display text-xl opacity-10 transition-opacity group-hover/item:opacity-30">0{i+1}</span>
                <div>
                  <h4 className="text-[13px] font-black uppercase tracking-widest text-white leading-tight">{feature}</h4>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
