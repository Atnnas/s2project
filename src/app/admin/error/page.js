'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import AnimatedButtonText from '@/components/ui/AnimatedButtonText';

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('error');
  
  useEffect(() => {
    // Silently log out to destroy the NextAuth JWT cookies
    signOut({ redirect: false });
  }, []);
  
  let title = "Acceso Restringido";
  let icon = "block";
  let message = "Lo sentimos, tu correo de Google no está registrado en nuestro panel administrativo. \n\nPor favor, contacta con el administrador principal para que te invite al sistema.";
  
  if (errorType === 'inactive') {
    title = "Solicitud Enviada";
    icon = "verified_user";
    message = "¡Tu registro se ha completado con éxito! Tu perfil ahora está en nuestra base de datos esperando ser activado por un administrador.";
  } else if (errorType === 'unauthorized') {
    title = "Permisos Insuficientes";
    icon = "lock_reset";
    message = "Has iniciado sesión correctamente, pero no tienes el rol necesario para entrar a esta sección exclusiva.\n\nSi crees que esto es un error, contacta a soporte.";
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-[#cadedd] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-[#cadedd]/50 backdrop-blur-xl pointer-events-none" />

      {/* Top right close button */}
      <Link
        href="/"
        className="absolute top-6 right-6 z-[310] h-14 w-14 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </Link>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="max-w-sm w-full bg-gradient-to-br from-primary to-[#2a4d32] rounded-[2.5rem] p-6 sm:p-8 shadow-[0_40px_80px_rgba(29,39,41,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10 text-center relative overflow-hidden z-10 mx-auto"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="w-16 h-16 rounded-[1.75rem] bg-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/5">
          <span className="material-symbols-outlined text-3xl text-[#fdf9e1]">{icon}</span>
        </div>
        
        <div className="text-xs sm:text-sm font-display font-black text-[#fdf9e1] mb-3 tracking-widest uppercase">{title}</div>
        
        <div className="text-white/70 font-body leading-relaxed mb-6 text-xs whitespace-pre-line px-2">
          {message}
        </div>

        {/* Google sign-in option to log in with a different account or retry */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
          className="relative z-10 w-full flex items-center justify-center gap-3 bg-[#fdf9e1] py-3.5 px-6 rounded-2xl font-bold text-primary-dark hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl mb-6 text-xs cursor-pointer"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-4 h-4" />
          <AnimatedButtonText text="Ingresar con Google" baseColor="#1d2729" />
        </button>

        {errorType === 'inactive' && (
          <div className="mb-6 text-left">
            <div className="relative flex items-center py-2 mb-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-3 text-white/50 text-[9px] font-black uppercase tracking-widest">¿Quieres acelerar el proceso?</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              <a
                href="https://api.whatsapp.com/send?phone=50660060026"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 hover:bg-[#25D366]/10 transition-all duration-500 border border-white/5 hover:border-[#25D366]/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#25D366] rounded-2xl blur-md opacity-20 animate-[pulse_3s_ease-in-out_infinite] group-hover:opacity-0 transition-opacity duration-500"></div>
                
                <div className="w-12 h-12 bg-white/10 rounded-full group-hover:bg-[#25D366] transition-colors duration-300 flex items-center justify-center relative z-10">
                  <i className="fa-brands fa-whatsapp text-2xl text-[#fdf9e1] group-hover:text-white"></i>
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-display font-black uppercase text-[11px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">Hablar por WhatsApp</h4>
                  <p className="text-[10px] text-[#fdf9e1]/50 font-body">Notificar registro</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-[#25D366] transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
              </a>

              <a
                href="https://calendar.app.google/zadeELEGddkDxJ829" 
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all duration-500 border border-white/5 hover:border-white/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#fdf9e1] rounded-2xl blur-md opacity-10 animate-[pulse_3s_ease-in-out_infinite] group-hover:opacity-0 transition-opacity duration-500" style={{ animationDelay: '1.5s' }}></div>
                
                <div className="w-12 h-12 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300 flex items-center justify-center relative z-10">
                  <span className="material-symbols-outlined text-2xl text-[#fdf9e1]">calendar_month</span>
                </div>
                <div className="flex-1 relative z-10">
                  <h4 className="font-display font-black uppercase text-[11px] tracking-widest text-[#fdf9e1] group-hover:text-white transition-colors">Agendar Llamada</h4>
                  <p className="text-[10px] text-[#fdf9e1]/50 font-body">Cita estratégica</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
              </a>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Link 
            href="/"
            className="block w-full py-4 px-6 rounded-2xl bg-[#fdf9e1] text-primary-dark font-bold hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl text-xs uppercase tracking-widest font-display text-center"
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
