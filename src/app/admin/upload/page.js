'use client';

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProjectForm from "@/components/Admin/ProjectForm";

export default function AdminUploadPage({ embedded = false, project = null, onSuccess = null, defaultCategory = null }) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  if (sessionStatus === "unauthenticated" && !embedded) {
    router.push("/admin/login");
  }

  return (
    <>
      {!embedded && <Navbar />}
      <main className={`${embedded ? '' : 'flex-1 max-w-2xl mx-auto px-6 py-32 min-h-screen w-full'}`}>
        <motion.div 
          initial={embedded ? {} : { opacity: 0, y: 20 }}
          animate={embedded ? {} : { opacity: 1, y: 0 }}
          className={`${embedded ? '' : 'bg-white p-8 md:p-12 rounded-3xl border border-primary/10 shadow-2xl'}`}
        >
          {!embedded && (
            <header className="mb-10 text-center">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
              <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Editor General</h1>
              <p className="text-slate-500 font-body">{project ? 'Editar proyecto existente.' : 'Gestión multiformato de la agencia.'}</p>
            </header>
          )}

          <ProjectForm 
            embedded={embedded} 
            project={project} 
            onSuccess={onSuccess} 
            defaultCategory={defaultCategory}
            mode="all"
          />
        </motion.div>
      </main>
      {!embedded && <Footer />}
    </>
  );
}
