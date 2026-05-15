'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSearchParams, Suspense } from 'next/navigation';

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('error');
  
  let title = "Acceso Restringido";
  let icon = "block";
  let iconColor = "text-red-500 bg-red-50";
  let message = "Lo sentimos, tu correo de Google no está registrado en nuestro panel administrativo. \n\nPor favor, contacta con el administrador principal para que te invite al sistema.";
  
  if (errorType === 'inactive') {
    title = "Solicitud Enviada";
    icon = "verified_user";
    iconColor = "text-primary bg-primary/10";
    message = "¡Tu registro se ha completado con éxito! Tu perfil ahora está en nuestra base de datos esperando ser activado por un administrador.\n\nRecuerda que no tendrás acceso hasta que se te asigne un rol oficial.";
  } else if (errorType === 'unauthorized') {
    title = "Permisos Insuficientes";
    icon = "lock_reset";
    iconColor = "text-orange-500 bg-orange-50";
    message = "Has iniciado sesión correctamente, pero no tienes el rol necesario para entrar a esta sección exclusiva.\n\nSi crees que esto es un error, contacta a soporte.";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pt-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-primary/10 text-center relative overflow-hidden"
      >
        <div className={`w-20 h-20 ${iconColor} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner`}>
          <span className="material-symbols-outlined text-4xl">{icon}</span>
        </div>
        
        <h1 className="text-3xl font-display font-black text-slate-900 mb-4 tracking-tight uppercase">{title}</h1>
        
        <p className="text-slate-500 font-body leading-relaxed mb-10 text-sm whitespace-pre-line px-2">
          {message}
        </p>

        {errorType === 'inactive' && (
          <div className="mb-10 text-left">
            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">¿Quieres acelerar el proceso?</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              <a
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-slate-50 hover:bg-[#25D366]/10 transition-all duration-500 border border-slate-200 hover:border-[#25D366]/30 relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-white rounded-full group-hover:bg-[#25D366] transition-colors duration-300 flex items-center justify-center shadow-sm relative z-10">
                  <i className="fa-brands fa-whatsapp text-2xl text-slate-400 group-hover:text-white"></i>
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-display font-black uppercase text-[11px] tracking-widest text-slate-900 group-hover:text-[#25D366] transition-colors">Hablar por WhatsApp</h4>
                  <p className="text-[10px] text-slate-500 font-body">Notificar registro</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-[#25D366] transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
              </a>

              <a
                href="https://calendar.app.google/zadeELEGddkDxJ829" 
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-slate-50 hover:bg-primary/5 transition-all duration-500 border border-slate-200 hover:border-primary/20 relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-white rounded-full group-hover:bg-primary transition-colors duration-300 flex items-center justify-center shadow-sm relative z-10">
                  <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-white">calendar_month</span>
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-display font-black uppercase text-[11px] tracking-widest text-slate-900 group-hover:text-primary transition-colors">Agendar Llamada</h4>
                  <p className="text-[10px] text-slate-500 font-body">Cita estratégica</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-300 group-hover:text-primary transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
              </a>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Link 
            href="/"
            className="block w-full py-4 px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 text-xs uppercase tracking-widest"
          >
            Volver al Inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminError() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
