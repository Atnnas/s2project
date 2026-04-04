"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Estrategia de Contenido",
    desc: "Análisis profundo de marca y definición de pilares narrativos que resuenan."
  },
  {
    title: "Planificación Mensual",
    desc: "Calendarios estratégicos diseñados para mantener una presencia omnipresente y coherente."
  },
  {
    title: "Producción Multi-Formato",
    desc: "Videos, reels y fotografía con estándares de alta fidelidad y ejecución cinematográfica."
  },
  {
    title: "Edición & Post-Producción",
    desc: "Tratamiento visual de élite, corrección de color y narrativa rítmica de alto impacto."
  },
  {
    title: "Crecimiento & Meta Ads",
    desc: "Gestión de campañas de tráfico y conversión para escalar tu alcance de forma real."
  },
  {
    title: "Análisis de Resultados",
    desc: "Informes detallados y optimización constante basada en datos duros del mercado."
  }
];

export default function StrategicServices() {
  return (
    <section id="servicios-core" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Column - The Core Message */}
          <div className="space-y-12 sticky top-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">Servicio Maestro (80%)</p>
              <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
                Gestión <br />
                <span className="text-primary italic">Integral 360°</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-10 rounded-[3rem] bg-slate-900 text-white space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <p className="text-xl md:text-2xl font-body leading-relaxed text-slate-300">
                &quot;No construimos contenido suelto; diseñamos infraestructuras de crecimiento digital. Nuestra gestión mensual es el motor que transforma tu marca en una comunidad activa y leal.&quot;
              </p>
              <div className="flex items-center gap-4 text-primary">
                 <span className="material-symbols-outlined text-4xl">verified</span>
                 <span className="font-display font-bold uppercase tracking-widest text-xs">Estándar S2 Project</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - The Feature Grid */}
          <div className="grid grid-cols-1 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 md:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-primary transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10 flex items-start gap-8">
                  <span className="text-4xl md:text-6xl font-display font-black text-slate-200 group-hover:text-white/20 transition-colors">
                    0{index + 1}
                  </span>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-black uppercase tracking-tight text-slate-900 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-body text-slate-500 group-hover:text-white/80 transition-colors leading-relaxed">
                      {service.description || service.desc}
                    </p>
                  </div>
                </div>
                {/* Decorative Pattern on hover */}
                <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:10px_10px]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary Services Hook */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-12 md:p-20 rounded-[4rem] bg-slate-50 border border-slate-100 text-center space-y-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Soluciones Complementarias</p>
          <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900">
            ¿Necesitas una <span className="text-primary italic">Solución Específica?</span>
          </h3>
          <p className="text-slate-500 font-body max-w-2xl mx-auto">
            Desde artes digitales y branding hasta producciones para Real Estate. Ofrecemos capacidades especializadas para marcas que buscan la excelencia en cada píxel.
          </p>
          <a href="/servicios" className="inline-flex items-center gap-4 text-primary font-display font-black uppercase tracking-widest text-xs hover:gap-6 transition-all">
            Ver Todos los Servicios <span className="material-symbols-outlined">east</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
