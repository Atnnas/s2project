'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Siempre mantenemos la visibilidad de la cabecera en true para que el logo esté presente
      setIsVisible(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll); // También check al redimensionar
    
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

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-10 z-[60]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <AnimatePresence>
        {(isVisible || isHovered || isMenuOpen) && (
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`flex items-center justify-between whitespace-nowrap px-6 md:px-40 py-3 md:py-2 fixed top-0 w-full z-50 transition-all duration-300 ${
              isMenuOpen 
                ? 'bg-primary border-b border-white/10 shadow-none' 
                : 'bg-[#396542]/10 backdrop-blur-2xl border-b border-[#396542]/20 shadow-[0_8px_32px_rgba(57,101,66,0.15)]'
            } group/navbar`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
              style={{ scaleX }}
            />

            {/* Logo - Desktop/Tablet (Left Aligned) */}
            <div className="hidden md:flex items-center justify-start py-2">
              <Link href="/" className="group flex items-center gap-4">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={lastScrollY > 50 ? 'logo-horizontal' : 'logo-vertical'}
                    src={lastScrollY > 50 ? "/logo2.png" : "/logo1.png"} 
                    alt="S2 PROJECT" 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`${lastScrollY > 50 ? 'h-12' : 'h-28'} w-auto object-contain transition-all duration-300 group-hover:scale-105`}
                  />
                </AnimatePresence>
              </Link>
            </div>

            {/* Mobile Hamburger Button - Left Side */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-16 h-16 text-slate-900 z-[70] relative -ml-2"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1.5 w-6 items-center">
                <motion.span 
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0, 
                    y: isMenuOpen ? 8 : 0,
                    width: isMenuOpen ? "24px" : "24px",
                    backgroundColor: isMenuOpen ? "#ffffff" : "currentColor"
                  }}
                  className="h-0.5 bg-current rounded-full"
                />
                <motion.span 
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? -10 : 0,
                    backgroundColor: isMenuOpen ? "#ffffff" : "currentColor"
                  }}
                  className="h-0.5 w-4 bg-current rounded-full"
                />
                <motion.span 
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0, 
                    y: isMenuOpen ? -8 : 0,
                    width: isMenuOpen ? "24px" : "24px",
                    backgroundColor: isMenuOpen ? "#ffffff" : "currentColor"
                  }}
                  className="h-0.5 bg-current rounded-full"
                />
              </div>
            </button>

            {/* Mobile Home Button - Absolute Right Logo Link */}
            <div className="md:hidden absolute right-0 top-0 h-full flex items-center pr-2">
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="relative z-[70] flex items-center justify-center p-2"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={lastScrollY > 50 ? 'logo-horizontal-mobile' : 'logo-vertical-mobile'}
                    src={lastScrollY > 50 ? "/logo2.png" : "/logo1.png"} 
                    alt="S2 PROJECT" 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`${lastScrollY > 50 ? 'h-10' : 'h-28'} w-auto object-contain transition-all duration-300 ${isMenuOpen ? 'brightness-0 invert' : ''}`}
                  />
                </AnimatePresence>
              </Link>
            </div>
            


            <div className="flex flex-1 justify-end gap-10 items-center">
              {/* Desktop Nav - Unchanged md:flex */}
              <nav className="hidden md:flex items-center gap-12 text-[#1d2729]">
                <NavbarLink href="/">Inicio</NavbarLink>
                <NavbarLink href="/servicios">Servicios</NavbarLink>
                
                {/* Portafolio con Dropdown - Solo visible si hay sesión */}
                {session && (
                  <div 
                    className="relative group/dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="cursor-pointer">
                      <NavbarLink as="div">
                        <span className="flex items-center gap-1">
                          Portafolio
                          <motion.span 
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            className="material-symbols-outlined text-sm leading-none"
                          >
                            expand_more
                          </motion.span>
                        </span>
                      </NavbarLink>
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full right-0 mt-4 w-56 bg-white/90 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-2xl overflow-hidden py-3 z-[100]"
                        >
                          <Link
                            href="/portfolio"
                            className="flex items-center px-6 py-3 text-primary font-display font-black uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-colors border-b border-primary/5"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Ver Todo el Portafolio
                          </Link>
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center px-6 py-3 text-slate-700 hover:bg-primary/5 transition-colors font-display font-semibold group/item text-sm"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <span className="flex-1">{item.label}</span>
                              <span className="material-symbols-outlined text-sm opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">
                                arrow_forward
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <NavbarLink href="/proceso">Proceso</NavbarLink>
                <NavbarLink href="/nosotros">Nosotros</NavbarLink>
                <NavbarLink href="/admin/dashboard">Administración</NavbarLink>
              </nav>
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
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block group"
                >
                  <img 
                    src="/logo1.png" 
                    alt="S2 PROJECT" 
                    className="h-16 w-auto object-contain brightness-0 invert"
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
                
                {session && (
                  <>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-6 px-1">Portafolio</p>
                    <div className="flex flex-col gap-1 items-start">
                      <MobileNavLink href="/portfolio" active={pathname === "/portfolio"} onClick={() => setIsMenuOpen(false)} index={1}>
                        Ver Todo
                      </MobileNavLink>
                      {dropdownItems.map((item, idx) => (
                        <MobileNavLink 
                          key={item.href} 
                          href={item.href} 
                          active={pathname === item.href}
                          onClick={() => setIsMenuOpen(false)} 
                          index={idx + 2}
                        >
                          {item.label}
                        </MobileNavLink>
                      ))}
                    </div>
                  </>
                )}

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
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-primary transition-all duration-300">
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
    </>
  );
}

function NavbarLink({ href, children, as = Link }) {
  const Component = as;
  const commonProps = {
    className: "relative group/link py-3 px-4 block transition-all",
    children: (
      <>
        <span className="relative z-10 opacity-80 group-hover/link:opacity-100 transition-opacity text-lg font-semibold tracking-wide font-display">
          {children}
        </span>
        <motion.span 
          className="absolute inset-0 -z-0 bg-primary/5 rounded-full scale-0 opacity-0 group-hover/link:scale-110 group-hover/link:opacity-100 transition-all duration-300 ease-out"
          aria-hidden="true"
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
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
