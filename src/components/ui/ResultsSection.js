"use client";

import { motion } from "framer-motion";

const results = [
  { label: "Interacción", value: "+185%", desc: "Crecimiento de compromiso", color: "bg-blue-500" },
  { label: "Alcance Real", value: "+42%", desc: "Impacto en audiencias nuevas", color: "bg-primary" },
  { label: "Seguidores", value: "+1,200", desc: "Comunidad orgánica mensual", color: "bg-amber-500" },
  { label: "Consultas", value: "+35%", desc: "Leads de alta calidad", color: "bg-indigo-500" },
  { label: "Ventas Directas", value: "+28%", desc: "Conversión de marca", color: "bg-emerald-500" },
  { label: "Visualizaciones", value: "+90K", desc: "Exposición de marca", color: "bg-rose-500" }
];

const processSteps = [
  { id: "01", title: "Diagnóstico", desc: "Análisis profundo de identidad, industria y público objetivo. Definimos el punto de partida real." },
  { id: "02", title: "Planificación", desc: "Diseño de la narrativa estratégica, selección de formatos y frecuencia táctica de impacto." },
  { id: "03", title: "Producción", desc: "Ejecución técnica de alta fidelidad con equipos profesionales de cine y fotografía de élite." },
  { id: "04", title: "Optimización", desc: "Edición rítmica, SEO digital y gestión de campañas quirúrgicas para máxima visibilidad." },
  { id: "05", title: "Crecimiento", desc: "Escalamiento real basado en métricas tangibles que construyen el legado de tu marca." }
];

export default function ResultsSection() {
  return (
    <section data-navbar-theme="dark" className="py-40 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.6em] text-primary"
          >
            Sistemas de Impacto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter"
          >
            Estrategia, Ejecución y <br />
            <span className="text-primary italic">Resultados</span>
          </motion.h2>
        </div>

        {/* Process Steps (Timeline Style) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-60 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[2.5rem] left-[5rem] right-[5rem] h-[1px] bg-white/10 -z-0" />
          
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 text-center space-y-8 group"
            >
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:-translate-y-2">
                <span className="text-2xl font-display font-black text-primary group-hover:text-white transition-colors">
                  {step.id}
                </span>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-display font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-400 font-body leading-relaxed group-hover:text-white/60 transition-colors">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Results Grid */}
        <div className="max-w-6xl mx-auto">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter border-l-4 border-primary pl-8">
              Métricas de Rendimientos de <br />
              <span className="text-primary opacity-60">Crecimiento Mensual</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {results.map((result, idx) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.05) }}
                className="group p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white transition-all duration-700 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-2 h-0 group-hover:h-full ${result.color} transition-all duration-[1.5s]`} />
                
                <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-slate-500 transition-colors">
                    {result.label}
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl md:text-7xl font-display font-black group-hover:text-slate-900 transition-colors">
                      {result.value}
                    </span>
                    <span className="material-symbols-outlined text-primary mb-2 animate-bounce">trending_up</span>
                  </div>
                  <p className="text-[11px] font-body text-slate-400 group-hover:text-slate-500 transition-colors uppercase tracking-widest font-bold">
                    {result.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Gen Button Block */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-40 text-center"
        >
          <a
            href="/#contacto"
            className="group inline-flex items-center gap-10 p-1 bg-white/10 rounded-full border border-white/10 pr-12 hover:bg-white hover:text-slate-900 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-black transition-transform group-hover:scale-90 duration-500">
               !
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-black uppercase tracking-[0.6em] text-primary">Diagnóstico Estratégico</span>
              <span className="block text-lg font-display font-black uppercase tracking-tight">Análisis Gratuito de Marca</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
