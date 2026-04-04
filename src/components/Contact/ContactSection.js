"use client";

import { motion } from "framer-motion";

export default function ContactSection({ compact = false }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className={`${compact ? 'pb-8' : 'pb-16'} px-6 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-slate-900">
            Diagn&oacute;stico de <span className="text-primary italic">Resultados</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-body max-w-2xl mx-auto leading-relaxed">
            &iquest;Listo para escalar el ROI de tu marca mediante una estrategia de dominio integral? Iniciemos la transformaci&oacute;n de tu presencia digital hoy mismo.
          </p>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {/* Direct Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-12"
        >
          <div className="space-y-4 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Informaci&oacute;n Directa</p>
            <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-slate-900 leading-tight">
              Estamos a un <span className="opacity-40 italic">Click</span> de Distancia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Email Item */}
            <a 
              href="mailto:info@s2-project.com"
              className="group flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Escr&iacute;benos</p>
                <p className="text-base md:text-lg font-display font-medium text-slate-900 whitespace-nowrap">info@s2-project.com</p>
              </div>
            </a>

            {/* Location Item */}
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/60">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ubicaci&oacute;n</p>
                <p className="text-lg font-display font-medium text-slate-900">San Jos&eacute;, Costa Rica</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Item */}
          <div className="max-w-2xl mx-auto">
            <a 
              href="https://api.whatsapp.com/send?phone=50660060026" 
              target="_blank"
              className="group flex items-center gap-6 p-8 bg-primary text-white rounded-[2.5rem] hover:bg-primary/90 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481 2.239 2.24 3.478 5.226 3.477 8.406-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.669zm6.722-3.736l.363.216c1.448.86 3.329 1.315 5.259 1.316 5.462 0 9.907-4.445 9.91-9.909.003-2.646-1.02-5.132-2.88-6.991-1.859-1.859-4.343-2.882-6.993-2.883-5.463 0-9.91 4.446-9.913 9.91-.001 2.15.565 4.254 1.637 6.096l.236.406-1.082 3.957 4.053-1.072zm11.954-6.761c-.307-.154-1.817-.897-2.098-.998-.282-.102-.487-.154-.692.154-.205.308-.795.998-.974 1.205-.179.206-.359.231-.666.077-.308-.154-1.299-.479-2.476-1.529-.915-.817-1.534-1.825-1.713-2.133-.18-.308-.019-.475.134-.627.138-.137.308-.359.461-.538.154-.18.205-.308.308-.513.102-.205.051-.385-.026-.538-.077-.154-.692-1.667-.948-2.282-.25-.601-.523-.519-.718-.529l-.615-.013c-.205 0-.538.077-.82.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.103 2.974 1.256 3.18.154.205 2.17 3.313 5.257 4.645.735.316 1.307.505 1.754.646.737.234 1.407.201 1.938.122.591-.088 1.817-.743 2.074-1.461.256-.718.256-1.333.179-1.461-.076-.128-.282-.205-.59-.359z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[12px] font-black uppercase tracking-widest text-white/60 mb-1">WhatsApp Business</p>
                <p className="text-2xl md:text-3xl font-display font-black text-white">+506 6006 0026</p>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:translate-x-1 transition-transform text-4xl">arrow_forward</span>
            </a>
          </div>

          <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10 max-w-2xl mx-auto text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">&iquest;Por qu&eacute; S2 Project?</p>
            <p className="text-sm text-slate-600 font-body leading-relaxed">
              No somos solo una productora. Somos un socio estrat&eacute;gico que dise&ntilde;a historias visuales con est&aacute;ndares cinematogr&aacute;ficos y excelencia t&eacute;cnica.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
