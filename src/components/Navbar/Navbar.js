'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';

const NavbarLink = ({ href, children, isActive, onClick }) => {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`relative px-5 h-10 rounded-full transition-all duration-300 group/link overflow-hidden flex items-center justify-center ${
        isActive 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-primary-dark hover:text-primary'
      }`}
    >
      <span className="relative z-10 text-[15.5px] font-black uppercase tracking-[0.2em] font-display">
        {children}
      </span>
      {!isActive && (
        <motion.span 
          initial={false}
          className="absolute inset-0 z-0 scale-0 group-hover/link:scale-100 transition-transform duration-500 rounded-full bg-primary/5"
        />
      )}
    </Link>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = session?.user?.role === "Admin" || session?.user?.email === "david.artavia.rodriguez@gmail.com";

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/portafolio', label: 'Portafolio' },
    { href: '/proceso', label: 'Proceso' },
    { href: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-0 w-full z-[100] px-6 flex justify-center pointer-events-none"
      >
        <nav 
          className={`pointer-events-auto flex items-center justify-between px-6 md:px-12 py-5 rounded-full transition-all duration-700 max-w-[90vw] w-full border border-pastel ${
            isScrolled ? 'bg-cream-glass shadow-xl' : 'bg-white shadow-sm'
          }`}
        >
          {/* Logo Section - Optimized for Retina */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] -mt-4">
            <img 
              src="/logo-final.png" 
              alt="S2 PROJECT" 
              className="h-12 md:h-15 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav - Expanded horizontally & Vertically Centered */}
          <div className="hidden lg:flex flex-1 items-center justify-around gap-2 px-8 h-full">
            {navLinks.map((link) => (
              <NavbarLink 
                key={link.href}
                href={link.href}
                isActive={pathname === link.href}
              >
                {link.label}
              </NavbarLink>
            ))}
          </div>

          {/* Auth Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-primary/10">
            {!session ? (
              <>
                <button 
                  onClick={() => signIn('google', { callbackUrl: pathname })}
                  className="px-5 py-2.5 text-[12px] font-black uppercase tracking-[0.15em] text-primary-dark hover:text-primary transition-colors font-display"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsSignUpOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-primary text-[#fdf9e1] text-[12px] font-black uppercase tracking-[0.15em] hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-display"
                >
                  Sign Up
                </button>
              </>
            ) : (
              isAdmin && (
                <Link 
                  href="/admin/dashboard"
                  className={`px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-display ${
                    pathname.startsWith('/admin') 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  Dashboard Admin
                </Link>
              )
            )}
          </div>

          {/* Mobile Toggle & Auth (Mobile) */}
          <div className="lg:hidden flex items-center gap-3">
            {!session && (
              <button 
                onClick={() => setIsSignUpOpen(true)}
                className="w-10 h-10 rounded-full bg-primary text-[#fdf9e1] flex items-center justify-center shadow-md"
              >
                <span className="material-symbols-outlined text-xl">person_add</span>
              </button>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-pastel/20 text-primary-dark"
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-cream flex flex-col items-center justify-center pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-display font-black uppercase tracking-tighter ${pathname === link.href ? 'text-primary' : 'text-primary-dark'}`}
                >
                  {link.label}
                </Link>
              ))}
              {!session ? (
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    signIn('google', { callbackUrl: pathname });
                  }}
                  className="text-2xl font-display font-black uppercase tracking-tighter text-primary-dark mt-4 pt-4 border-t border-primary/10"
                >
                  Login
                </button>
              ) : (
                isAdmin && (
                  <Link 
                    href="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-display font-black uppercase tracking-tighter text-primary mt-4 pt-4 border-t border-primary/10"
                  >
                    Admin
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGN UP MODAL */}
      <AnimatePresence>
        {isSignUpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-primary w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative text-center flex flex-col items-center"
            >
              <button 
                onClick={() => setIsSignUpOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/5 mt-4">
                <span className="material-symbols-outlined text-3xl text-[#fdf9e1]">admin_panel_settings</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-black text-[#fdf9e1] mb-3 uppercase tracking-widest">Solicita tu acceso</h3>
              <p className="text-[#fdf9e1]/70 font-body text-sm mb-8 px-2">
                Para solicitar acceso a S2 Project, primero debes registrar tu perfil iniciando sesión con Google. Luego, nuestro equipo activará tu cuenta.
              </p>

              <div className="flex flex-col gap-4 w-full">
                <button
                  onClick={() => {
                    setIsSignUpOpen(false);
                    signIn("google", { callbackUrl: "/portafolio" });
                  }}
                  className="relative z-10 w-full flex items-center justify-center gap-4 bg-[#fdf9e1] py-4 px-6 rounded-2xl font-bold text-primary-dark hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl mb-4"
                >
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-5 h-5" />
                  Iniciar Registro con Google
                </button>

                <div className="relative flex items-center py-2 mb-2">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-white/40 text-[9px] font-black uppercase tracking-widest">¿Ya te registraste? Acelera el proceso</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <div className="flex flex-col gap-3 w-full text-left">
                  <a
                    href="https://api.whatsapp.com/send?phone=50660060026"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 hover:bg-[#25D366]/10 transition-all duration-500 border border-white/5 hover:border-[#25D366]/30 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#25D366] rounded-2xl blur-md opacity-20 animate-[pulse_3s_ease-in-out_infinite] group-hover:opacity-0 transition-opacity duration-500"></div>
                    
                    <div className="w-12 h-12 bg-white/10 rounded-full group-hover:bg-[#25D366] transition-colors duration-300 flex items-center justify-center relative z-10">
                      <i className="fa-brands fa-whatsapp text-2xl text-[#fdf9e1]"></i>
                    </div>
                    <div className="flex-1 relative z-10">
                      <h4 className="font-display font-black uppercase text-[11px] tracking-widest text-[#fdf9e1] group-hover:text-[#25D366] transition-colors">Hablar por WhatsApp</h4>
                      <p className="text-[10px] text-[#fdf9e1]/50 font-body">Respuesta rápida</p>
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
                      <p className="text-[10px] text-[#fdf9e1]/50 font-body">Reunión estratégica</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1 relative z-10">arrow_forward</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
