'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import GlassIconButton from "@/components/ui/GlassIconButton";
import AnimatedButtonText from "@/components/ui/AnimatedButtonText";

import Link from "next/link";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Redirecting to:", callbackUrl);
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen bg-[#cadedd] relative">
      {/* Full screen modal overlay container */}
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop con Blur total que cubre toda la pantalla y el Navbar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#cadedd]/90 backdrop-blur-2xl"
        />

        {/* Botón de cerrar para volver al Inicio */}
        <Link
          href="/"
          className="absolute top-6 right-6 z-[310] h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl border border-primary/5"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </Link>
        
        {/* El Card de Login */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full bg-primary p-8 sm:p-10 mx-4 sm:mx-0 rounded-[2.5rem] border border-primary-dark/10 shadow-[0_50px_100px_-20px_rgba(29,39,41,0.25)] text-center relative overflow-hidden flex flex-col items-center justify-center z-10"
        >
          {/* Brillos sutiles de fondo para la tarjeta */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="mb-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5">
              <span className="material-symbols-outlined text-3xl text-[#fdf9e1]">lock_person</span>
            </div>
            <div className="text-xl sm:text-2xl font-display font-black text-[#fdf9e1] uppercase tracking-normal mb-3 text-center">
              Solicita tu acceso
            </div>
            <p className="text-white/70 font-body text-sm leading-relaxed text-center">
              Esta es un área privada para clientes y equipo de S2 Project. Si aún no tienes credenciales, contáctanos por WhatsApp o agenda una llamada para evaluar tu proyecto.
            </p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="relative z-10 w-full flex items-center justify-center gap-4 bg-[#fdf9e1] py-4 px-6 rounded-2xl font-bold text-primary-dark hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl mb-8"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
            <AnimatedButtonText text="Ingresar con Google" baseColor="#1d2729" />
          </button>

          <div className="relative flex items-center py-2 mb-6 z-10 w-full">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-white/50 text-[10px] font-black uppercase tracking-widest text-center">¿Aún no eres cliente?</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="flex flex-col gap-3 relative z-10 w-full text-left">
            <a
              href="https://api.whatsapp.com/send?phone=50660060026"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 hover:bg-[#25D366]/10 transition-all duration-500 border border-white/5 hover:border-[#25D366]/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#25D366] rounded-2xl blur-md opacity-20 animate-[pulse_3s_ease-in-out_infinite] group-hover:opacity-0 transition-opacity duration-500"></div>
              
              <GlassIconButton 
                icon="chat" 
                color="pastel" 
                darkMode={true}
                isActive={true} 
                className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500 relative z-10" 
                iconClassName="text-xl sm:text-2xl text-[#1d2729]"
              />
              <div className="flex-1 relative z-10">
                <h4 className="font-display font-black uppercase text-[11px] sm:text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">
                  <AnimatedButtonText text="Hablar por WhatsApp" baseColor="#fdf9e1" />
                </h4>
                <p className="text-[10px] sm:text-xs text-[#fdf9e1]/50 font-body">Respuesta rápida</p>
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
              
              <GlassIconButton 
                icon="calendar_month" 
                color="pastel" 
                darkMode={true}
                isActive={true} 
                className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 scale-90 group-hover:scale-100 transition-transform duration-500 relative z-10" 
                iconClassName="text-xl sm:text-2xl text-[#1d2729]"
              />
              <div className="flex-1 relative z-10">
                <h4 className="font-display font-black uppercase text-[11px] sm:text-[12px] tracking-widest text-[#fdf9e1] group-hover:text-white transition-colors">
                  <AnimatedButtonText text="Agendar Llamada" baseColor="#fdf9e1" />
                </h4>
                <p className="text-[10px] sm:text-xs text-[#fdf9e1]/50 font-body">Reunión estratégica</p>
              </div>
              <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <LoginContent />
    </Suspense>
  );
}
