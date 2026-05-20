'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/api/home-banners')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const heroBanners = data.data.filter(b => b.type === 'hero');
          setBanners(heroBanners);
        }
      })
      .catch(err => console.error("Error fetching banners:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading) return <div className="w-full h-[85vh] bg-[#fdf9e1] animate-pulse" />;
  if (banners.length === 0) return <div className="w-full h-[140px] md:h-[180px] bg-white" />;

  const currentBanner = banners[current];
  const activeImageUrl = (isMobile && currentBanner?.mobileImageUrl) 
    ? currentBanner.mobileImageUrl 
    : currentBanner?.imageUrl;

  return (
    <section data-navbar-theme="dark" className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#fdf9e1]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner._id}
          initial={{ opacity: 0, filter: 'blur(15px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#fdf9e1]">
            {/* Background Blur layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center blur-3xl scale-110"
              style={{ backgroundImage: `url(${activeImageUrl})` }}
            />
            
            {/* Overlays behind the foreground main image to tint the background blur only */}
            <div className="absolute inset-0 bg-[#9eb5b2]/60" />
            <div className="absolute inset-0 bg-[#9eb5b2]/20" />
            
            {/* Foreground Main Image - Complete Reveal */}
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.01, opacity: 1 }}
              transition={{ duration: 10, ease: [0.33, 1, 0.68, 1] }}
              className="relative w-full h-full bg-no-repeat bg-cover"
              style={{ 
                backgroundImage: `url(${activeImageUrl})`,
                backgroundPosition: (!isMobile || !currentBanner.mobileImageUrl) 
                  ? (currentBanner.focalPoint === 'top' ? 'center top' : currentBanner.focalPoint === 'bottom' ? 'center bottom' : 'center center') 
                  : 'center center'
              }}
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center pt-[80px] px-[clamp(1.5rem,6vw,6rem)]">
            <div className="max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-block text-primary font-black uppercase tracking-[0.4em] text-[11px] sm:text-[13px] mb-6 bg-primary/10 px-6 py-2.5 rounded-full border border-primary/20 backdrop-blur-md"
              >
                {currentBanner.topText || 'S2 Project • Boutique Agency'}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,9vw,6.5rem)] font-display font-black uppercase text-white leading-[0.85] tracking-tighter mb-8"
                style={{ textShadow: '0 4px 16px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)' }}
              >
                {currentBanner.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i !== currentBanner.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-xl md:text-2xl text-slate-100 font-body max-w-2xl leading-relaxed font-medium"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                {currentBanner.subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 right-[clamp(1.5rem,6vw,6rem)] z-30 flex gap-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative w-12 h-1 overflow-hidden bg-white/20 transition-all hover:h-2"
          >
            <div 
              className={`absolute top-0 left-0 h-full bg-primary transition-all duration-[6000ms] ease-linear ${i === current ? 'w-full' : 'w-0'}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
