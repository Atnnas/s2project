"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, memo } from "react";
import SplashCursor from "@/components/ui/SplashCursor";

const staticCategories = [
  {
    id: "reels",
    title: "REELS",
    href: "/reels",
    apiCat: "Reels",
    desc: "Narrativa dinámica y cinematografía de alto impacto.",
    aura: "rgba(57, 101, 66, 0.4)",
    img: "/fondo-reels.jpg"
  },
  {
    id: "artes",
    title: "ARTES",
    href: "/digital-arts",
    apiCat: "Arte Digital",
    desc: "Diseño estratégico y creatividad digital sin límites.",
    aura: "rgba(158, 181, 178, 0.4)",
    img: "/fondo-arts.jpg"
  }
];

// OPTIMIZED PARTICLE SYSTEM
const ParticleBackground = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    let particles = [];
    const colors = ['#396542', '#9eb5b2', '#f8f9fa'];

    const resize = () => {
      canvas.width = window.innerWidth / 4; // Lower res for performance
      canvas.height = window.innerHeight / 4;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size); // Faster than arc
      }
    }

    const init = () => {
      particles = Array.from({ length: 30 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i=0; i<particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize(); init(); animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[60] opacity-40 mix-blend-screen w-full h-full" />;
});

ParticleBackground.displayName = "ParticleBackground";

function CategoryCard({ cat, currentImg, isHovered, onHover, onLeave }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Optimized Springs - Lower stiffness for smoother, cheaper calc
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <Link
      href={cat.href}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={() => { x.set(0); y.set(0); onLeave(); }}
      className="relative h-1/2 md:h-full w-full md:w-1/2 overflow-hidden cursor-pointer block"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative w-full h-full group"
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        >
          <Image 
            src={currentImg} 
            alt={cat.title} 
            fill 
            className="object-cover brightness-[0.9] contrast-[1.12] saturate-[1.05]" 
            priority 
            unoptimized={true}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-20">
          <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="flex flex-col items-center">
            <motion.div 
              animate={{ scale: isHovered ? 2 : 1.3, opacity: isHovered ? 0.6 : 0.4 }}
              style={{ backgroundColor: cat.aura }}
              className="absolute inset-0 blur-[120px] rounded-full -z-10 transition-all duration-[2s]"
            />
            <span className="text-[11px] font-body uppercase tracking-[0.7em] text-white mb-8 drop-shadow-xl font-black">
              {cat.id === 'reels' ? 'Motion Authority' : 'Digital Mastery'}
            </span>
            <h2 className="text-6xl md:text-[clamp(5rem,11vw,14rem)] font-display font-black text-[#f8f9fa] leading-none tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,1)] group-hover:text-primary transition-all duration-700">
              {cat.title}
            </h2>
            <motion.p 
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
              className="mt-10 text-[#f8f9fa] font-body text-xs md:text-[14px] font-black uppercase tracking-[0.3em] max-w-sm text-center leading-relaxed hidden md:block drop-shadow-2xl"
            >
              {cat.desc}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function PortafolioPage() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="h-screen w-full bg-[#1d2729] overflow-hidden flex flex-col md:flex-row relative">
      <SplashCursor 
        RAINBOW_MODE={false} 
        COLOR="#396542" 
        SPLAT_RADIUS={0.3} 
        DENSITY_DISSIPATION={3.5}
        SIM_RESOLUTION={64} 
        DYE_RESOLUTION={256}
        PRESSURE_ITERATIONS={10}
      />
      <ParticleBackground />
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      {staticCategories.map((cat) => (
        <CategoryCard 
          key={cat.id}
          cat={cat}
          currentImg={cat.img}
          isHovered={hoveredId === cat.id}
          onHover={() => setHoveredId(cat.id)}
          onLeave={() => setHoveredId(null)}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 z-30 hidden md:block" />
    </div>
  );
}
