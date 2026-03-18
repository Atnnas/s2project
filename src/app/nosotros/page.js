"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-24 pb-40 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-slate-900/[0.02] rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section with Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-block text-[10px] font-black uppercase tracking-[1em] text-primary bg-primary/10 px-6 py-3 rounded-full">
              S2 PROJECT TEAM
            </span>
            
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
              Vanguardia <br />
              <span className="text-primary italic">Creativa</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-body leading-relaxed max-w-xl">
              Somos un aliado estratégico dedicado a transformar la presencia digital de marcas líderes a través de una ejecución técnica impecable y una visión creativa de alto nivel.
            </p>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-2 bg-primary rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0] 
            }}
            transition={{ 
              duration: 1, 
              ease: "circOut",
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
          >
            {/* Image Container with Custom Frame */}
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl shadow-primary/20 aspect-video lg:aspect-square group">
              <Image 
                src="/nosotros.jpeg" 
                alt="Equipo S2 Project"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
            
            {/* Decorative Card behind image */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[4rem] -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary opacity-10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Misión Disruptiva",
              desc: "Desafiamos el status quo. No seguimos tendencias, las creamos. Cada píxel y cada segundo de video está diseñado para romper el ruido digital.",
              icon: "bolt"
            },
            {
              title: "Tecnología de Punta",
              desc: "Combinamos hardware de última generación con una visión artística impecable. Software de precisión que garantiza resultados de nivel cinematográfico.",
              icon: "auto_awesome"
            },
            {
              title: "Resultados Reales",
              desc: "Para nosotros, la estética es solo el principio. Construimos conexiones emocionales que se traducen en lealtad y crecimiento para tu marca.",
              icon: "trending_up"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-10 rounded-[3rem] bg-white border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <span className="material-symbols-outlined text-4xl text-primary mb-6 transition-transform group-hover:rotate-12">{item.icon}</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-slate-500 font-body leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-60 text-center space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter max-w-4xl mx-auto leading-none">
            ¿Quieres formar parte de la <span className="text-primary italic">Revolución Visual?</span>
          </h2>
          <a 
            href="/#contacto" 
            className="inline-flex items-center gap-6 bg-slate-900 text-white px-12 py-6 rounded-3xl font-display font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary transition-all shadow-2xl shadow-slate-900/20"
          >
            Contratar S2 Project
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
