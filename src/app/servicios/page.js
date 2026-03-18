"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "photography",
    title: "Fotografía Comercial",
    description: "Capturamos la esencia de tu marca con equipos de última generación y una dirección de arte impecable. Especializados en moda, producto y arquitectura.",
    icon: "photo_camera",
    bg: "bg-slate-50",
    accent: "text-primary",
    delay: 0.1
  },
  {
    id: "reels",
    title: "Producción de Reels",
    description: "Contenido vertical diseñado para la máxima retención. 4K, 60FPS, edición rítmica y estrategias visuales que convierten seguidores en clientes.",
    icon: "movie",
    bg: "bg-slate-900 text-white",
    accent: "text-primary",
    delay: 0.2
  },
  {
    id: "digital-arts",
    title: "Artes Digitales",
    description: "Branding, diseño UI/UX y manipulación digital de alto nivel. Creamos universos visuales que posicionan tu marca en lo más alto del mercado.",
    icon: "draw",
    bg: "bg-slate-50",
    accent: "text-primary",
    delay: 0.3
  }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen pt-24 pb-40 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 mb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[1em] text-primary bg-primary/10 px-6 py-3 rounded-full">
              S2 PROJECT ELITE
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Nuestros <br />
              <span className="text-primary italic">Servicios</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-slate-500 font-body max-w-2xl mx-auto leading-relaxed"
          >
            Elevamos tu visión mediante una ejecución técnica impecable y una narrativa visual provocativa.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: service.delay, duration: 0.8, ease: "easeOut" }}
            className={`relative group p-12 rounded-[3.5rem] ${service.bg} flex flex-col h-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/10`}
          >
            {/* Hover Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
            
            <div className={`mb-12 w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center ${service.accent}`}>
              <span className="material-symbols-outlined text-4xl">{service.icon}</span>
            </div>

            <h2 className="text-3xl font-display font-black uppercase tracking-tight mb-6 leading-tight">
              {service.title}
            </h2>
            
            <p className={`text-lg font-body ${service.bg.includes('dark') ? 'text-slate-400' : 'text-slate-500'} leading-relaxed mb-auto`}>
              {service.description}
            </p>

            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              className="h-1 bg-primary mt-12 rounded-full"
            />
          </motion.div>
        ))}
      </section>

      {/* Philosophy Section - Adding a bit more "Wow" */}
      <section className="max-w-5xl mx-auto px-6 mt-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-16 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.3)_0%,_transparent_60%)]" />
          
          <div className="relative z-10 space-y-8">
            <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter">
              ¿Listo para <span className="text-primary">Evolucionar?</span>
            </h3>
            <p className="text-lg text-slate-400 max-w-xl mx-auto font-body">
              Cada proyecto es una oportunidad para desafiar lo convencional. No solo hacemos fotos o videos, creamos hitos digitales.
            </p>
            <a 
              href="/#contacto" 
              className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-display font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-primary/20"
            >
              Iniciar Proyecto
              <span className="material-symbols-outlined">rocket_launch</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
