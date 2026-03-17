'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminError() {
  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-primary/10 text-center"
      >
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
          <span className="material-symbols-outlined text-4xl">block</span>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-4 tracking-tight">Acceso Restringido</h1>
        
        <p className="text-slate-500 font-body leading-relaxed mb-10 text-sm">
          Lo sentimos, tu correo de Google no está registrado en nuestro panel administrativo. 
          <br/><br/>
          Por favor, contacta con el administrador principal para que te invite al sistema.
        </p>

        <div className="space-y-3">
          <Link 
            href="/admin/login"
            className="block w-full py-4 px-6 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm"
          >
            Volver al Login
          </Link>
          
          <Link 
            href="/"
            className="block w-full py-4 px-6 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all text-sm"
          >
            Ir al Inicio Público
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
