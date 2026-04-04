"use client";

import { motion } from "framer-motion";

const mainService = {
  title: "Gestión Estratégica 360°",
  subtitle: "El motor de tu Retorno de Inversión (ROI)",
  description: "Nuestra arquitectura de gestión mensual no es solo contenido; es una infraestructura diseñada para dominar el mercado digital. Fusionamos narrativa de alta fidelidad con ingeniería de datos para asegurar resultados medibles.",
  features: [
    "Estrategia de Crecimiento y Posicionamiento",
    "Planificación Táctica de Contenido Trimestral",
    "Producción de Activos con Enfoque en Conversión",
    "Gestión de Campañas Meta Ads y Optimización de ROI",
    "Análisis de Métricas y Rendimiento de Negocio"
  ]
};

const secondaryServices = [
  {
    id: "branding",
    title: "Identidad de Legado",
    description: "Diseñamos el ADN visual de marcas destinadas a liderar. Logos y Brand Kits con propósito estratégico.",
    icon: "architecture",
    delay: 0.1
  },
  {
    id: "real-estate",
    title: "Real Estate Premium",
    description: "Producciones cinematográficas y drones para activos inmobiliarios de lujo. Elevamos el valor percibido.",
    icon: "domain",
    delay: 0.2
  },
  {
    id: "corporate",
    title: "Narrativa Corporativa",
    description: "Comunicaciones de alta fidelidad para empresas con visión. Presentaciones y videos de impacto ejecutivo.",
    icon: "business_center",
    delay: 0.3
  }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen pt-24 pb-40 overflow-hidden bg-white text-slate-900">
      {/* Hero Section - The ROI Focus */}
      <section className="relative px-6 py-20 mb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[1em] text-primary bg-primary/10 px-8 py-4 rounded-full">
              SISTEMAS DE CRECIMIENTO
            </span>
            <h1 className="text-5xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.85]">
              Arquitectura <br />
              <span className="text-primary italic">de Resultados</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl text-slate-500 font-body max-w-3xl mx-auto leading-relaxed"
          >
            Sustituimos la producción tradicional por <strong>Estrategia de Dominio</strong>. No vendemos contenido, vendemos alcance, conversión y ROI.
          </motion.p>
        </div>
      </section>

      {/* Main Service - Detailed Block */}
      <section className="max-w-7xl mx-auto px-6 mb-60">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-slate-900 text-white p-12 md:p-24 overflow-hidden border border-white/5"
        >
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_rgba(57,101,66,0.4)_0%,_transparent_60%)]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Servicio Estrella (80% ROI Focus)
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
                {mainService.title}
              </h2>
              <p className="text-xl text-slate-400 font-body leading-relaxed max-w-xl">
                {mainService.description}
              </p>
              <div className="pt-8">
                <a href="#contacto" className="bg-primary text-white px-10 py-5 rounded-2xl font-display font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-primary/20">
                  Escalar mi Marca Ahora
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {mainService.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <span className="text-lg font-display font-bold uppercase tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Secondary Services Header */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-20 space-y-6">
        <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter">
          Capacidades <span className="text-primary italic">Especializadas</span>
        </h3>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Soluciones específicas diseñadas para potenciar objetivos concretos: desde lanzamientos inmobiliarios hasta identidades de marca icónicas.
        </p>
      </section>

      {/* Secondary Services Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {secondaryServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: service.delay }}
            className="group p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 flex flex-col hover:bg-primary transition-all duration-500 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">{service.icon}</span>
            </div>
            <h4 className="text-2xl font-display font-black uppercase tracking-tight mb-6 group-hover:text-white transition-colors">
              {service.title}
            </h4>
            <p className="font-body text-slate-500 group-hover:text-white/80 transition-colors leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Free Analysis CTA */}
      <section className="max-w-5xl mx-auto px-6 mt-40">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="p-12 md:p-20 rounded-[4rem] bg-primary text-white text-center space-y-10 shadow-2xl shadow-primary/40"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">
              ¿Quieres un Diagnóstico <br />
              <span className="italic opacity-60">Estratégico Gratis?</span>
            </h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto font-body">
              Analizamos tu marca y tus redes sociales sin costo alguno para identificar oportunidades reales de escala.
            </p>
          </div>
          <a href="/#contacto" className="inline-flex bg-slate-900 px-12 py-6 rounded-2xl font-display font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
            Solicitar Análisis ROI Gratis
          </a>
        </motion.div>
      </section>
    </main>
  );
}
