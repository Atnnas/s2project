'use client';

import { useState, useEffect, useRef, useCallback, useId } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

import { AnimatePresence, motion } from "framer-motion";

export function CircularGallery({ items = [], category = "FOTOGRAFÍA" }) {
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dotMargin, setDotMargin] = useState(50); // Default for mobile
  const autoplayTimer = useRef(null);
  const uniqueId = useId();
  const galleryPrefix = uniqueId.replace(/:/g, "");

  // Responsive adjustment for dots
  useEffect(() => {
    const handleResize = () => {
      setDotMargin(window.innerWidth < 768 ? 50 : 25);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClick = (index) => {
    if (!disabled) {
      if (opened === index && inPlace === index) {
        setIsModalOpen(true);
      } else {
        setOpened(index);
      }
    }
  };

  const onInPlace = (index) => setInPlace(index);

  const next = useCallback(() => {
    if (items.length === 0) return;
    setOpened((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    if (items.length === 0) return;
    setOpened((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Disable clicks during transitions
  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  // Autoplay control
  useEffect(() => {
    if (items.length === 0 || isModalOpen) return;
    autoplayTimer.current = setInterval(next, 5000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [opened, next, items.length, isModalOpen]);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full flex items-center justify-center py-10 overflow-visible group">
      {/* Outer Glow Effect */}
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative h-[85vmin] w-[85vmin] max-h-[700px] max-w-[700px] overflow-hidden rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 bg-slate-900/40 backdrop-blur-sm">
        {/* Layer 1: Images */}
        {items.map((image, i) => (
          <div
            key={image.url + i}
            className={`absolute left-0 top-0 h-full w-full transition-all duration-700 ${opened === i && inPlace === i ? 'cursor-zoom-in' : ''}`}
            style={{ 
              zIndex: inPlace === i ? 10 : (opened === i ? 20 : 5),
              opacity: (opened === i || inPlace === i || i < 10) ? 1 : 0
            }}
            onClick={() => onClick(i)}
          >
            <GalleryItem
              total={items.length}
              id={i}
              galleryPrefix={galleryPrefix}
              url={image.url}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
              bottomMargin={dotMargin}
            />
          </div>
        ))}
        
        {/* Layer 2: Overlay Navigation (Clean dots) */}
        <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
          <Tabs items={items} onSelect={onClick} activeIndex={opened} galleryPrefix={galleryPrefix} bottomMargin={dotMargin} />
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-16 sm:bottom-20 left-0 w-full z-[110] px-10 text-center pointer-events-none transition-all duration-500">
           <h3 className="text-white text-2xl sm:text-3xl font-display font-bold mb-1 opacity-90 drop-shadow-lg">
             {items[opened]?.title}
           </h3>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-0 sm:w-[calc(100%+120px)] pointer-events-none">
        <button
          className="pointer-events-auto h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 active:scale-95 disabled:opacity-20 translate-x-1 sm:-translate-x-1/2"
          onClick={prev}
          disabled={disabled}
        >
          <span className="material-symbols-outlined text-white text-3xl">chevron_left</span>
        </button>

        <button
          className="pointer-events-auto h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:bg-primary/20 hover:border-primary/40 active:scale-95 disabled:opacity-20 -translate-x-1 sm:translate-x-1/2"
          onClick={next}
          disabled={disabled}
        >
          <span className="material-symbols-outlined text-white text-3xl">chevron_right</span>
        </button>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MediaModal 
            project={items[opened]} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MediaModal({ project, onClose }) {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&rel=0';
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('/').pop().split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`;
    }
    if (url.includes('youtube.com/shorts/')) {
      return url.replace('shorts/', 'embed/') + '?autoplay=1&mute=1&rel=0';
    }
    return url;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-6 right-6 z-[210] h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary transition-colors"
        onClick={onClose}
      >
        <span className="material-symbols-outlined">close</span>
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative z-[205] w-full max-w-6xl h-full flex flex-col md:flex-row bg-[#0a0a0a] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* Media Side */}
        <div className="flex-[1.5] bg-black relative flex items-center justify-center group/media overflow-hidden">
          {project.videoUrl ? (
            <iframe
              src={getEmbedUrl(project.videoUrl)}
              className="w-full h-full aspect-video md:aspect-auto"
              allow="autoplay; fullscreen"
              title={project.title}
            />
          ) : (
            <img 
              src={project.url} 
              alt={project.title} 
              className="w-full h-full object-contain"
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Info Side */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-b from-[#111] to-black border-l border-white/5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">S2 PROJECT SHOWCASE</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {project.title}
            </h2>
            <div className="h-1 w-16 bg-primary mb-8 rounded-full" />
            
            <div className="space-y-6 text-slate-400 font-body text-lg leading-relaxed max-h-[40vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
              {project.description || "Explora la excelencia visual de este proyecto creado por S2 Project. Cada detalle ha sido cuidadosamente diseñado para transmitir una narrativa única y cinematográfica."}
            </div>

            <div className="mt-12 flex gap-4">
              <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                Contactar Ahora
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryItem({ url, open, inPlace, id, onInPlace, total, galleryPrefix, bottomMargin = 50 }) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef(null);

  const gap = 14; 
  const circleRadius = 5;
  const width = 400;
  const height = 400;
  const scale = 800;
  const bigSize = circleRadius * scale;

  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - bottomMargin,
    r: circleRadius,
  });
  
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  });

  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 10 });
  const getPosEnd = () => ({ cx: width / 2 - bigSize, cy: height / 2, r: bigSize });
  const getPosStart = () => ({ cx: width / 2 + bigSize, cy: height / 2, r: bigSize });

  useEffect(() => {
    if (!clip.current || !gsap) return;

    const flipDuration = 0.6;
    const upDuration = 0.4;
    const bounceDuration = 1.4;

    if (firstLoad) {
      if (open) {
        gsap.set(clip.current, getPosEnd());
        onInPlace(id);
      } else {
        gsap.set(clip.current, getPosSmall());
      }
      setLoaded(false);
      return;
    }

    if (open) {
      gsap.timeline()
        .set(clip.current, { ...getPosSmall() })
        .to(clip.current, {
          ...getPosCenter(),
          duration: upDuration,
          ease: "expo.out",
        })
        .to(clip.current, {
          ...getPosEnd(),
          duration: flipDuration,
          ease: "power4.in",
          onComplete: () => onInPlace(id),
        });
    } else {
      gsap.timeline({ overwrite: true })
        .set(clip.current, { ...getPosStart() })
        .to(clip.current, {
          ...getPosCenter(),
          delay: flipDuration + upDuration,
          duration: flipDuration,
          ease: "power4.out",
        })
        .to(clip.current, {
          motionPath: {
            path: [getPosSmallAbove(), getPosSmall()],
            curviness: 1.5,
          },
          duration: bounceDuration,
          ease: "bounce.out",
        });
    }
  }, [open, total, id, firstLoad]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <clipPath id={`${galleryPrefix}_${id}_circleClip`}>
          <circle cx="0" cy="0" r={circleRadius} ref={clip} />
        </clipPath>
        <clipPath id={`${galleryPrefix}_${id}_squareClip`}>
          <rect width={width} height={height} rx="40" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${galleryPrefix}_${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image width={width} height={height} href={url} preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  );
}

function Tabs({ items, onSelect, activeIndex, galleryPrefix, bottomMargin = 50 }) {
  const gap = 14;
  const circleRadius = 5;
  const width = 400;
  const height = 400;

  const getPosX = (i) => width / 2 - (items.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap);
  const getPosY = () => height - bottomMargin;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {items.map((_, i) => (
        <g key={i} className="pointer-events-auto group/tab">
          {/* Outer stroke (Always there) */}
          <circle
            onClick={() => onSelect(i)}
            className={`cursor-pointer transition-all duration-500 fill-transparent stroke-white/20 hover:stroke-primary/80 ${activeIndex === i ? "stroke-primary scale-125" : ""}`}
            strokeWidth="1"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 4}
          />
          {/* Active core indicator */}
          {activeIndex === i && (
            <circle
              className="pointer-events-none fill-primary animate-pulse"
              cx={getPosX(i)}
              cy={getPosY()}
              r={circleRadius - 2}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
