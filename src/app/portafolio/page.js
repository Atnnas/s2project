"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { id: "fotografia", label: "Fotografía", icon: "photo_camera", category: "Fotografía", href: "/photography", desc: "Capturando la esencia de cada momento." },
  { id: "reels", label: "Reels", icon: "movie", category: "Reels", href: "/reels", desc: "Narrativa dinamica de alto impacto." },
  { id: "artes", label: "Artes Digitales", icon: "draw", category: "Arte Digital", href: "/digital-arts", desc: "Creatividad sin limites tecnicos." },
];

export default function PortafolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const interactionTimeoutRef = useRef(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        const json = await response.json();
        if (json.success) {
          setProjects(json.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    handleInteraction();
  };

  const filteredProjects = projects.filter(p => p.category === tabs[activeTab].category);

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-x-hidden min-h-screen w-full">
      {/* Hero Header Standardized */}
      <section className="relative w-full pt-[clamp(160px,18vh,220px)] pb-12 px-6 shrink-0 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 pt-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-primary/40"></span>
            <span className="text-[10px] font-black uppercase tracking-[1em] text-primary">S2 PROJECT</span>
            <span className="h-[1px] w-8 bg-primary/40"></span>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD GRID — Standardized Geometry from Home */}
      <section className="w-full relative pb-20 bg-white flex-1 flex flex-col justify-center">
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative px-[clamp(1.5rem,6vw,6rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Column 1: Interactive Menu (Sticky to avoid double scroll) */}
          <div className="hidden lg:flex lg:col-span-3 space-y-2 z-20 flex-col h-fit sticky top-[160px]">
             {tabs.map((tab, index) => {
               const isActive = activeTab === index;
               return (
                 <button 
                   key={tab.id} 
                   onClick={() => handleTabClick(index)}
                   className={`text-left p-6 flex items-center gap-6 border-l-4 transition-all duration-300 group min-w-0 relative ${isActive ? 'bg-white shadow-2xl border-primary scale-[1.02] z-10' : 'bg-transparent border-transparent hover:bg-slate-100/50'}`}
                 >
                   <div className={`w-12 h-12 flex flex-shrink-0 items-center justify-center font-black text-xl transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                     <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                   </div>
                   <div className="flex-1 overflow-hidden">
                     <h3 className={`font-display font-black uppercase text-xs md:text-sm tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                       {tab.label}
                     </h3>
                     {isActive && (
                       <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-[10px] text-slate-400 font-body uppercase tracking-wider mt-1 block">
                         {tab.desc}
                       </motion.p>
                     )}
                   </div>
                 </button>
               );
             })}
          </div>

          {/* Mobile Tab Scroller (Standardized) */}
          <div className="lg:hidden w-full flex items-center justify-between pb-6 gap-2 z-20">
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    className={`flex-shrink-0 px-6 py-3 border-l-2 font-display font-black uppercase tracking-widest text-[10px] transition-all ${
                      activeTab === index 
                        ? "bg-slate-900 text-white border-primary" 
                        : "bg-white text-slate-500 border-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
             </div>
          </div>

          {/* Column 2: Active Card Viewport (Grows with content to avoid double scroll) */}
          <div className="lg:col-span-9 w-full min-h-[600px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="w-full h-full p-8 md:p-12 rounded-none bg-white border border-slate-100 shadow-xl"
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {loading ? (
                     [1, 2, 3, 4, 5, 6].map(n => <div key={n} className="aspect-square bg-slate-100 animate-pulse" />)
                   ) : (
                     filteredProjects.map((project) => (
                       <Link key={project._id} href={tabs[activeTab].href}>
                         <motion.div whileHover={{ y: -5 }} className="group relative aspect-[4/5] overflow-hidden bg-slate-900 shadow-lg">
                           <Image src={project.imageUrl || "/placeholder.jpg"} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                           <div className="absolute inset-0 p-6 flex flex-col justify-end">
                             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                               {project.category}
                             </span>
                             <h4 className="text-xl font-display font-black uppercase text-white leading-tight">{project.title}</h4>
                             <p className="text-[10px] text-white/50 font-body uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.client}</p>
                           </div>
                         </motion.div>
                       </Link>
                     ))
                   )}
                   {filteredProjects.length === 0 && !loading && (
                     <div className="col-span-full py-24 text-center opacity-30">
                        <span className="material-symbols-outlined text-5xl mb-4">folder_open</span>
                        <p className="text-xs font-black uppercase tracking-widest">Sin Proyectos en esta categoría</p>
                     </div>
                   )}
                 </div>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
