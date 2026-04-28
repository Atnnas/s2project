'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Siempre mantenemos la visibilidad de la cabecera en true para que el logo esté presente
      setIsVisible(true);
      setLastScrollY(currentScrollY);

      // Check current background theme
      const elementUnderNavbar = document.elementFromPoint(window.innerWidth / 2, 40);
      if (elementUnderNavbar) {
        const section = elementUnderNavbar.closest('[data-navbar-theme]');
        setIsDark(section?.getAttribute('data-navbar-theme') === 'dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial call to set correct state on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const dropdownItems = [
    { href: '/photography', label: 'Fotografía' },
    { href: '/reels', label: 'Reels' },
    { href: '/digital-arts', label: 'Artes Digitales' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleRestrictedAccess = (e) => {
    // Si no hay sesión o si la sesión existe pero no está activo
    if (!session || !session.user || !session.user.isActive) {
      e.preventDefault();
      setShowAccessModal(true);
      if (isMenuOpen) setIsMenuOpen(false);
      if (isDropdownOpen) setIsDropdownOpen(false);
      return false;
    }
    // Si tiene permisos, permite navegación y cierra menús
    if (isMenuOpen) setIsMenuOpen(false);
    if (isDropdownOpen) setIsDropdownOpen(false);
    return true;
  };

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      // If already on home, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-10 z-[60]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <AnimatePresence>
        {mounted && (isVisible || isHovered || isMenuOpen) && (
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
              isMenuOpen 
                ? 'bg-primary border-b border-white/10 shadow-none' 
                : isDark
                  ? 'bg-slate-900 border-b border-white/10 shadow-xl'
                  : 'bg-white shadow-none'
            } group/navbar`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between px-2 md:px-4 relative h-[140px]">
              
              {/* Logo - Massive Authority Overlay (110px) as per user request for 10% smaller */}
              <div id="main-logo-container" className="hidden md:flex items-center justify-start absolute top-1/2 -translate-y-1/2 left-2 z-[100] h-[110px] pointer-events-none">
                <Link 
                  href="/" 
                  onClick={handleLogoClick}
                  className="group relative cursor-pointer block h-full w-auto pointer-events-auto"
                >
                  <motion.img 
                    id="desktop-logo-img"
                    src="/logo-final.png"
                    alt="S2 PROJECT" 
                    initial={{ opacity: 0, x: -10, scale: 1 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ originX: 0, originY: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative h-full w-auto object-contain transition-all duration-300 pointer-events-auto"
                  />
                </Link>
              </div>

              {/* Rest of Navbar Content... */}
              {/* ... ensures the content is now inside the 1920px container ... */}

            {/* Mobile Hamburger Button - Left Side */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden flex items-center justify-center w-16 h-16 z-[70] relative -ml-2 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 w-6 items-center">
                <motion.span 
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0, 
                    y: isMenuOpen ? 8 : 0,
                    width: isMenuOpen ? "24px" : "24px",
                    backgroundColor: isMenuOpen ? "#ffffff" : isDark ? "#ffffff" : "#0f172a"
                  }}
                  className="h-0.5 w-full rounded-full"
                />
                <motion.span 
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? -10 : 0,
                    backgroundColor: isMenuOpen ? "#ffffff" : isDark ? "#ffffff" : "#0f172a"
                  }}
                  className="h-0.5 w-4 rounded-full"
                />
                <motion.span 
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0, 
                    y: isMenuOpen ? -8 : 0,
                    width: isMenuOpen ? "24px" : "24px",
                    backgroundColor: isMenuOpen ? "#ffffff" : isDark ? "#ffffff" : "#0f172a"
                  }}
                  className="h-0.5 w-full rounded-full"
                />
              </div>
            </button>
            {/* Mobile Home Button - Absolute Right Logo Link */}
            <div className="md:hidden absolute right-0 top-0 h-full flex items-center pr-2 z-[90]">
              <Link 
                href="/" 
                onClick={(e) => {
                  handleLogoClick(e);
                  setIsMenuOpen(false);
                }}
                className="relative z-[100] flex items-center justify-center p-2 pointer-events-auto cursor-pointer flex-shrink-0"
              >
                <motion.img 
                  src="/logo_top_bar.png"
                  alt="S2 PROJECT" 
                  initial={{ opacity: 0, scale: 1.7 }}
                  animate={{ opacity: 1, scale: 1.85 }}
                  style={{ originX: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="h-[clamp(64px,20vw,102px)] w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>
            
 


            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden md:flex items-center absolute right-8 lg:right-16 gap-[clamp(1.2rem,2.2vw,2.5rem)] z-[101]">
              <NavbarLink href="/" isDark={isDark}>Inicio</NavbarLink>
              <NavbarLink href="/servicios" isDark={isDark}>Servicios</NavbarLink>
              
              <NavbarLink href="/portafolio" isDark={isDark} onClick={handleRestrictedAccess}>Portafolio</NavbarLink>

              <NavbarLink href="/proceso" isDark={isDark}>Proceso</NavbarLink>
              <NavbarLink href="/nosotros" isDark={isDark}>Nosotros</NavbarLink>
              <NavbarLink href="/admin/dashboard" isDark={isDark}>Administración</NavbarLink>
            </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/navbar:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_rgba(57,101,66,0.1)_0%,_transparent_70%)]" />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[44] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Side Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-[45] w-[85%] max-w-[400px] md:hidden bg-primary flex flex-col items-start justify-start p-10 text-white overflow-y-auto pt-24"
            >
              {/* Brand Logo Home Link */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mb-8"
              >
                <Link 
                  href="/" 
                  onClick={(e) => {
                    handleLogoClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="inline-block group"
                >
                  <img 
                    src="/logo-final.png" 
                    alt="S2 PROJECT" 
                    className="h-20 w-auto object-contain"
                  />
                  <div className="h-0.5 w-full bg-white/20 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              </motion.div>

              {/* User Profile Section */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-start mb-10 w-full"
              >
                {session?.user ? (
                  <>
                    <div className="relative group">
                      <img 
                        src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name || 'User'}&background=3b512f&color=fff`} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full border-2 border-white/20 object-cover shadow-2xl transition-transform"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-primary rounded-full" />
                    </div>
                    <div className="text-left mt-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Perfil</p>
                      <p className="text-xl font-bold uppercase tracking-widest text-white mb-2">{session.user.name}</p>
                      <button 
                        onClick={() => signOut()}
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-primary transition-all duration-300"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-4 py-4">
                     <span className="material-symbols-outlined text-4xl opacity-20">account_circle</span>
                     <Link href="/admin/login" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-white/100 transition-colors p-2">Iniciar Sesión</Link>
                  </div>
                )}
              </motion.div>

              <Separator />

              {/* Menu Links */}
              <nav className="w-full flex flex-col gap-1 py-8">
                <MobileNavLink href="/" active={pathname === "/"} onClick={() => setIsMenuOpen(false)} index={0}>
                  Inicio
                </MobileNavLink>
                <MobileNavLink href="/servicios" active={pathname === "/servicios"} onClick={() => setIsMenuOpen(false)} index={1}>
                  Servicios
                </MobileNavLink>
                
                <div className="my-2" />
                
                <MobileNavLink href="/portafolio" active={pathname === "/portafolio"} onClick={handleRestrictedAccess} index={2}>
                  Portafolio
                </MobileNavLink>

                <div className="my-8 w-12 h-[1px] bg-white/10" />

                <MobileNavLink href="/nosotros" active={pathname === "/nosotros"} onClick={() => setIsMenuOpen(false)} index={4}>
                  Nosotros
                </MobileNavLink>
                
                <MobileNavLink href="/proceso" active={pathname === "/proceso"} onClick={() => setIsMenuOpen(false)} index={5}>
                  Proceso
                </MobileNavLink>

                <div className="my-4" />

                <MobileNavLink href="/admin/dashboard" active={pathname === "/admin/dashboard"} onClick={() => setIsMenuOpen(false)} index={6}>
                  Administración
                </MobileNavLink>
              </nav>

              <Separator />

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-auto flex flex-col items-start gap-6 pb-10"
              >
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61584523825008" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-primary transition-all duration-300">
                    <i className="fa-brands fa-facebook-f text-lg"></i>
                  </a>
                  <a href="https://www.instagram.com/s2project_marketing/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-primary transition-all duration-300">
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-primary transition-all duration-300">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-primary transition-all duration-300">
                    <i className="fa-regular fa-envelope text-lg"></i>
                  </a>
                </div>
                <div className="text-left opacity-30">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">S2 PROJECT © 2026</p>
                  <p className="text-[8px] uppercase tracking-widest font-bold">Inicia tu historia aquí</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Home Button (FAB) - Visible only on scroll */}
      <AnimatePresence>
        {(lastScrollY > 400 && !isMenuOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] md:hidden"
          >
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 px-6 py-3 bg-primary/90 backdrop-blur-xl text-white rounded-full shadow-[0_8px_32px_rgba(59,81,47,0.4)] border border-white/10 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Inicio</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <AccessProtectionModal isOpen={showAccessModal} onClose={() => setShowAccessModal(false)} />
    </>
  );
}

function AccessProtectionModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-primary/20 relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-slate-900 mb-4">
              Acceso <span className="text-primary">Restringido</span>
            </h3>
            <p className="text-slate-500 font-body mb-8 leading-relaxed text-sm">
              Nuestros portafolios de Fotografía, Reels y Arte Digital están protegidos por acuerdos de confidencialidad con nuestros clientes de alto perfil.
              <br/><br/>
              Para visualizar nuestra galería privada, por favor comunícate directamente con nuestro equipo o reserva una sesión estratégica gratuita.
            </p>

            <div className="space-y-3">
               <a 
                 href="https://api.whatsapp.com/send?phone=50660060026" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all font-bold text-sm tracking-wider"
               >
                 <i className="fa-brands fa-whatsapp text-lg"></i>
                 Contactar por WhatsApp
               </a>
               <a 
                 href="https://calendar.app.google/zadeELEGddkDxJ829" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-slate-900 text-white hover:bg-primary transition-all font-bold text-sm tracking-wider shadow-xl shadow-slate-200"
               >
                 <span className="material-symbols-outlined text-lg">calendar_month</span>
                 Agendar Cita en Calendario
               </a>
               <p className="text-center pt-4 text-[10px] uppercase font-black tracking-widest text-slate-400">
                 ¿Ya tienes acceso? <Link href="/admin/login" onClick={onClose} className="text-primary underline">Inicia Sesión</Link>
               </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavbarLink({ href, children, isDark, as = Link }) {
  const Component = as;
  const commonProps = {
    className: "relative group/link px-6 flex items-center transition-all z-[101] h-full self-stretch",
    children: (
      <>
        <span className={`relative z-10 transition-opacity text-xl font-bold tracking-tight font-display ${isDark ? 'text-white opacity-100' : 'text-[#1d2729] opacity-80 group-hover/link:opacity-100'}`}>
          {children}
          {/* Underline - Now relative to text span */}
          <span className={`absolute -bottom-1.5 left-0 right-0 h-0.5 transition-all duration-300 group-hover/link:opacity-100 opacity-0 ${isDark ? 'bg-white' : 'bg-primary'}`} />
        </span>
        <motion.span 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 w-16 h-16 rounded-full scale-0 opacity-0 group-hover/link:scale-110 group-hover/link:opacity-100 transition-all duration-300 ease-out ${isDark ? 'bg-white/10' : 'bg-primary/5'}`}
          aria-hidden="true"
        />
      </>
    )
  };

  return <Component href={href} {...commonProps} />;
}

function Separator({ className = "" }) {
  return (
    <div className={`w-full max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`} />
  );
}

function MobileNavLink({ href, children, onClick, active, index }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 + (index * 0.05) }}
    >
      <Link 
        href={href} 
        onClick={onClick}
        className={`group flex items-center justify-start py-5 transition-all relative text-white font-bold text-xl uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
      >
        <span className="relative">
          {children}
          {active && (
            <motion.div 
              layoutId="mobile-active-dot"
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"
            />
          )}
        </span>
      </Link>
    </motion.div>
  );
}
