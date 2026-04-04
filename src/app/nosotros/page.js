"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-20 pb-40 relative bg-background-light">
      {/* Dynamic Background elements - kept subtle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-slate-900/[0.02] rounded-full blur-[100px] -z-10" />

      {/* Full Hero Image Section - Optimized for the provided landscape image */}
      <section className="relative w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6"
        >
          <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[2/1] xl:aspect-[16/7] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/sobre_nosotros.jpg"
              alt="S2 Project Identidad de Marca"
              fill
              className="object-cover md:object-contain bg-[#3b512f]" 
              priority
            />
            {/* Subtle Gradient Overlay only on bottom to blend with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20 md:mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/80">S2 PROJECT</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
              Arquitectos <br />
              <span className="text-primary italic">de Dominio</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 font-body leading-relaxed max-w-xl">
              Somos una **Agencia Boutique Premium** dedicada a dise&ntilde;ar infraestructuras de marca que no solo compiten, sino que dominan su industria mediante estrategia real y resultados medibles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3.5rem] bg-white border border-primary/5 shadow-xl space-y-8"
          >
            <h3 className="text-3xl font-display font-black uppercase tracking-tight">Nuestra Visi&oacute;n</h3>
            <p className="text-slate-500 font-body leading-relaxed text-lg">
              Desde 2026, hemos redefinido el est&aacute;ndar de la gesti&oacute;n digital. No producimos contenido aislado; creamos activos estrat&eacute;gicos que aseguran la **conversi&oacute;n** y maximizan el **ROI** de nuestros aliados.
            </p>
            <ul className="space-y-4">
              {[
                "Dominio Estrat&eacute;gico de Redes Sociales",
                "Ingenier&iacute;a de Contenido de Alta Fidelidad",
                "Optimizaci&oacute;n de Conversi&oacute;n y Meta Ads de &Eacute;lite"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Philosophy Cards Section */}
        <div className="mt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enfoque en ROI",
                desc: "Cada p&iacute;xel y cada palabra est&aacute;n dise&ntilde;ados con un prop&oacute;sito claro: generar resultados tangibles y medibles para tu negocio.",
                icon: "monitoring"
              },
              {
                title: "Exclusividad Boutique",
                desc: "Trabajamos con un n&uacute;mero limitado de socios para garantizar una atenci&oacute;n de &eacute;lite y una estrategia quir&uacute;rgicamente precisa.",
                icon: "workspace_premium"
              },
              {
                title: "Impacto de Marca",
                desc: "Construimos legados digitales que trascienden el ruido, posicionando tu marca en la cima de su categor&iacute;a.",
                icon: "leaderboard"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[3rem] bg-slate-900 text-white hover:bg-primary transition-all duration-500 shadow-2xl"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-white">{item.icon}</span>
                </div>
                <h4 className="text-2xl font-display font-black uppercase tracking-tight mb-4">{item.title}</h4>
                <p className="text-white/60 font-body leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modernized CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 text-center space-y-12"
        >
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter max-w-4xl mx-auto leading-none">
            &iquest;Listo para elevar tus <span className="text-primary italic">Resultados?</span>
          </h2>
          <motion.a
            href="/#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-6 bg-slate-900 text-white px-16 py-8 rounded-full font-display font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all shadow-2xl"
          >
            SOLICITAR DIAGN&Oacute;STICO ROI
            <span className="material-symbols-outlined">north_east</span>
          </motion.a>
        </motion.div>
      </div>
    </main>
  );
}


