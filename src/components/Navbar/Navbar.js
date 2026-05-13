'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

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
    ...(isAdmin ? [{ href: '/admin/dashboard', label: 'Admin' }] : []),
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

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-accent-pastel/20 text-primary-dark"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
