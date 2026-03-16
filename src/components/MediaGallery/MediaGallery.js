'use client';

import { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function GalleryContent({ projects }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Fixed: searchTerm and selectedTag are no longer needed for UI but keeping state to avoid breaking other logic if any
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Todos');
  const scrollRef = useRef(null);

  const scrollContainer = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Share Engine: Initial project from URL
  useEffect(() => {
    const projectId = searchParams.get('p');
    if (projectId) {
      const project = projects.find(p => p._id === projectId || p._id.toString() === projectId);
      if (project) {
        setSelectedProject(project);
        setActiveIndex(0);
      }
    }
  }, [searchParams, projects]);

  // Handle URL updates when project opens/closes
  const openProject = (project) => {
    setSelectedProject(project);
    setActiveIndex(0);
    const params = new URLSearchParams(searchParams);
    params.set('p', project._id.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeProject = () => {
    setSelectedProject(null);
    const params = new URLSearchParams(searchParams);
    params.delete('p');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getYoutubeThumbnail = (url) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
          return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const getInstagramThumbnail = (url) => {
    if (!url) return null;
    try {
      if (url.includes('instagram.com')) {
        const regExp = /(?:reels?|p|tv)\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regExp);
        if (match && match[1]) {
          return `https://www.instagram.com/p/${match[1]}/media/?size=l`;
        }
        return 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg';
      }
      return null;
    } catch {
      return null;
    }
  };

  const isYoutubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isInstagramUrl = (url) => {
    if (!url) return false;
    return url.includes('instagram.com');
  };

  const getMediaThumbnail = (url) => {
    return getYoutubeThumbnail(url) || getInstagramThumbnail(url);
  };

  const getEmbedUrl = (url) => {
    if (isYoutubeUrl(url)) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
          return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&rel=0&playsinline=1&enablejsapi=1`;
      }
    }
    if (isInstagramUrl(url)) {
      const cleanUrl = url.split('?')[0];
      const separator = cleanUrl.endsWith('/') ? '' : '/';
      return `${cleanUrl}${separator}embed/`;
    }
    return url;
  };

  const nextAsset = () => {
    if (!selectedProject?.gallery) return;
    setActiveIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevAsset = () => {
    if (!selectedProject?.gallery) return;
    setActiveIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  // Extract unique tags/clients for filters
  const allTags = useMemo(() => {
    const tags = new Set(['Todos']);
    projects.forEach(p => {
      if (p.client && p.client !== 'S2 Project') tags.add(p.client);
      if (p.metadata?.industry) tags.add(p.metadata.industry);
      if (p.metadata?.tags && Array.isArray(p.metadata.tags)) {
        p.metadata.tags.forEach(t => tags.add(t));
      }
    });
    return Array.from(tags).slice(0, 10);
  }, [projects]);

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (p.client && p.client.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === 'Todos' || 
                         p.client === selectedTag || 
                         p.metadata?.industry === selectedTag ||
                         (p.metadata?.tags && p.metadata.tags.includes(selectedTag));
      return matchesSearch && matchesTag;
    });
  }, [projects, searchTerm, selectedTag]);

  return (
    <div className="relative group/gallery">
      {/* Navigation arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none z-10">
        <button 
          onClick={() => scrollContainer('left')}
          className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-primary/10 flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 -translate-x-4 group-hover/gallery:translate-x-0 transition-all hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-slate-600">chevron_left</span>
        </button>

        <button 
          onClick={() => scrollContainer('right')}
          className="pointer-events-auto w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-primary/10 flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 translate-x-4 group-hover/gallery:translate-x-0 transition-all hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-slate-600">chevron_right</span>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => {
            const firstVideo = project.gallery?.find(m => m.type === 'video');
            const videoThumbFromGallery = firstVideo ? getMediaThumbnail(firstVideo.url) : null;
            const videoThumbFromPrimary = getMediaThumbnail(project.imageUrl);
            const displayUrl = videoThumbFromPrimary || project.imageUrl || videoThumbFromGallery || '';

            const aspectClass = 
              project.category === 'Reels' ? 'w-[280px] aspect-[9/16]' :
              project.category === 'Fotografía' ? 'w-[320px] aspect-[4/5]' :
              'w-[400px] aspect-video';

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project._id.toString()} 
                onClick={() => openProject(project)}
                className={`flex-shrink-0 snap-start group relative ${aspectClass} rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-lg hover:shadow-primary/20 transition-all`}
              >
                {displayUrl ? (
                  <Image 
                    src={displayUrl} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-300">image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-full border border-white/30 scale-90 group-hover:scale-100 transition-transform">
                    <span className="material-symbols-outlined text-white text-4xl">
                      {project.gallery?.some(m => m.type === 'video') ? 'play_arrow' : 'visibility'}
                    </span>
                  </div>
                </div>
                {project.gallery?.length > 1 && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-white font-bold">
                    {project.gallery.length} ASSETS
                  </div>
                )}
                <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <p className="text-white text-lg font-display font-medium leading-tight mb-1">{project.title}</p>
                  {project.client && (
                    <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{project.client}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeProject}
          >
            {/* Controls */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 flex items-center gap-2"
              onClick={closeProject}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Cerrar</span>
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            {selectedProject.gallery?.length > 1 && (
              <div className="contents">
                <button 
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                  onClick={(e) => { e.stopPropagation(); prevAsset(); }}
                >
                  <span className="material-symbols-outlined text-5xl">chevron_left</span>
                </button>
                <button 
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                  onClick={(e) => { e.stopPropagation(); nextAsset(); }}
                >
                  <span className="material-symbols-outlined text-5xl">chevron_right</span>
                </button>
              </div>
            )}

            <motion.div 
              key={`${selectedProject._id}-${activeIndex}`}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl h-full flex items-center justify-center py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/5 flex items-center justify-center">
                {selectedProject.gallery?.length > 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                     {selectedProject.gallery[activeIndex].type === 'video' ? (
                      <iframe 
                        src={getEmbedUrl(selectedProject.gallery[activeIndex].url) || null}
                        className={`w-full ${
                          isInstagramUrl(selectedProject.gallery[activeIndex].url) || 
                          selectedProject.category === 'Reels' || 
                          selectedProject.gallery[activeIndex].url.includes('/shorts/') 
                            ? 'aspect-[9/16] h-full max-h-[75vh]' 
                            : 'aspect-video'
                        } border-0 rounded-xl shadow-2xl`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                          src={selectedProject.gallery[activeIndex].url || null} 
                          className="object-contain" 
                          alt={selectedProject.title} 
                          fill
                          sizes="100vw"
                          priority={activeIndex === 0}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image 
                      src={selectedProject.imageUrl || null} 
                      className="object-contain" 
                      alt={selectedProject.title} 
                      fill
                      sizes="100vw"
                      priority
                    />
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center w-full px-10">
                <h2 className="text-white text-3xl font-display font-bold mb-2">{selectedProject.title}</h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-[10px] uppercase font-bold tracking-widest rounded-full">{selectedProject.category}</span>
                  {selectedProject.client && (
                    <span className="text-white/60 text-sm font-medium">{selectedProject.client}</span>
                  )}
                  {selectedProject.metadata?.equipment && (
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-xs text-orange-400">photo_camera</span>
                      <span className="text-white/80 text-[10px] font-bold">{selectedProject.metadata.equipment}</span>
                    </div>
                  )}
                  {selectedProject.metadata?.tools && (
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-xs text-purple-400">architecture</span>
                      <span className="text-white/80 text-[10px] font-bold">{selectedProject.metadata.tools}</span>
                    </div>
                  )}
                </div>
                {selectedProject.description && (
                  <p className="mt-4 text-white/70 text-sm max-w-xl mx-auto leading-relaxed">
                    {selectedProject.description}
                  </p>
                )}
                {selectedProject.gallery?.length > 1 && (
                  <div className="mt-6 flex gap-2">
                    {selectedProject.gallery.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-primary' : 'w-4 bg-white/20'}`}></div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MediaGallery({ projects }) {
  return (
    <Suspense fallback={<div className="p-20 text-center text-slate-400 font-display uppercase tracking-widest text-xs">Cargando Galería...</div>}>
      <GalleryContent projects={projects} />
    </Suspense>
  );
}
