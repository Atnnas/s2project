"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-[#f8faf9] text-slate-900 selection:bg-primary/20 pb-40 overflow-hidden">
      {/* Luz Cristalina Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-slate-200/40 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 mb-20">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="space-y-8"
         >
           <div className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-8 bg-primary/40"></span>
              <span className="text-[10px] font-black uppercase tracking-[1em] text-primary">METODOLOGÍA S2</span>
              <span className="h-[1px] w-8 bg-primary/40"></span>
           </div>
           <h1 className="text-7xl md:text-[10rem] font-display font-black uppercase tracking-tighter leading-[0.8] text-slate-900">
             Proceso <br />
             <span className="text-primary italic">Vertical</span>
           </h1>
           <p className="text-xl md:text-3xl text-slate-500 font-body max-w-3xl mx-auto leading-relaxed">
             Estrategia, ejecución y optimización para hacer crecer marcas de forma profesional.
           </p>
         </motion.div>

         <motion.div 
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="mt-20 flex flex-col items-center gap-4 opacity-30"
         >
           <span className="text-[8px] font-black uppercase tracking-[0.5em]">Deslizar para Explorar</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
         </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={containerRef} className="container mx-auto px-6 relative py-20">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 hidden md:block">
           <motion.div 
             style={{ scaleY, originY: 0 }}
             className="absolute inset-0 bg-primary w-full"
           />
        </div>

        <div className="space-y-40 md:space-y-60 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col md:flex-row items-center justify-center w-full group overflow-visible`}>
              {/* Left Side Content */}
              <div className={`w-full md:w-1/2 flex ${step.align === 'left' ? 'md:justify-end md:pr-20' : 'hidden md:flex'}`}>
                {step.align === 'left' ? <ProcessCard step={step} index={index} /> : <div className="w-full" />}
              </div>

              {/* Center Dot - The number in the central line */}
              <div className="relative flex items-center justify-center z-20 my-10 md:my-0">
                 <motion.div 
                   whileInView={{ scale: [0, 1.2, 1], rotate: [0, 90, 0] }}
                   viewport={{ once: false, margin: "-10%" }}
                   className="w-14 h-14 rounded-2xl bg-white shadow-2xl border-2 border-primary/20 flex items-center justify-center text-primary font-black text-xl"
                 >
                   {step.id}
                 </motion.div>
                 {/* Pulse Aura */}
                 <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping -z-10" />
              </div>

              {/* Right Side Content */}
              <div className={`w-full md:w-1/2 flex ${step.align === 'right' ? 'md:justify-start md:pl-20' : 'hidden md:flex'}`}>
                {step.align === 'right' ? <ProcessCard step={step} index={index} /> : <div className="w-full" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expectant Results Section */}
      <section className="container mx-auto px-6 mt-60">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-20%" }}
           className="relative p-12 md:p-32 rounded-[4rem] bg-slate-900 text-white overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.2)_0%,_transparent_60%)]" />
          
          <div className="relative z-10 space-y-20">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none text-primary italic">
                Resultados
              </h2>
              <p className="text-xl text-slate-400 font-body leading-relaxed">
                Nuestra ingeniería de crecimiento produce datos reales que respaldan el éxito de nuestros socios. Transformamos la estrategia en dominio digital.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {metrics.map((metric, idx) => (
                <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-primary transition-all duration-700 group">
                  <div className="space-y-6">
                    <span className="material-symbols-outlined text-primary text-4xl group-hover:text-white transition-colors">
                      {metric.icon}
                    </span>
                    <div className="text-5xl md:text-7xl font-display font-black group-hover:scale-110 transition-transform origin-left">
                      {metric.value}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-white/60 transition-colors">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Lead Generation CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-40">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-12 md:p-24 rounded-[4.5rem] bg-white border border-slate-100 shadow-2xl shadow-primary/5 text-center space-y-12 overflow-hidden relative group"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
              &iquest;Analizamos tu Marca <br />
              <span className="text-primary italic">Estrat&eacute;gicamente Gratis?</span>
            </h3>
            <p className="text-slate-500 text-xl md:text-2xl font-body max-w-2xl mx-auto">
              Identificamos oportunidades de escala y ROI sin costo alguno. El primer paso hacia tu legado empieza aqu&iacute;.
            </p>
          </div>
          
          <Link 
            href="https://api.whatsapp.com/send?phone=50660060026"
            target="_blank"
            className="inline-flex items-center gap-6 bg-slate-900 text-white px-16 py-8 rounded-full font-display font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all shadow-xl"
          >
            SOLICITAR ANÁLISIS ROI
            <span className="material-symbols-outlined">north_east</span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

function ProcessCard({ step, index }) {
  const isRight = step.align === 'right';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`p-10 md:p-16 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-700 relative overflow-hidden group w-full flex flex-col ${isRight ? 'items-end text-right' : 'items-start text-left'}`}
    >
      <div className={`relative z-10 space-y-8 flex flex-col ${isRight ? 'items-end' : 'items-start'}`}>
        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
          <span className="material-symbols-outlined text-4xl">{step.icon}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-tight text-slate-900 group-hover:text-primary transition-colors">
          {step.title}
        </h3>
        <p className="text-lg md:text-xl text-slate-500 font-body leading-relaxed">
          {step.desc}
        </p>
        
        <div className="pt-4 flex items-center gap-4 text-slate-300">
           {!isRight && <span className="h-[2px] w-12 bg-slate-100 group-hover:bg-primary/20"></span>}
           <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-primary">Fase Estrat&eacute;gica</span>
           {isRight && <span className="h-[2px] w-12 bg-slate-100 group-hover:bg-primary/20"></span>}
        </div>
      </div>
    </motion.div>
  );
}
