'use client';

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { motion } from 'framer-motion';
import ProjectForm from "@/components/Admin/ProjectForm";

export default function ReelsUploadPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-6 py-32 min-h-screen w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-primary/5 p-8 md:p-12 rounded-3xl border border-primary/10 shadow-2xl"
        >
          <header className="mb-10 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">movie_filter</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">Nuevo Reel</h1>
            <p className="text-slate-500 font-body">Gestiona tu contenido dinámico de YouTube e Instagram.</p>
          </header>

          <ProjectForm mode="reels" defaultCategory="Reels" />
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
