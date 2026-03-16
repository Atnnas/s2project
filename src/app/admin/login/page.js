'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center min-h-screen px-6 py-32 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-primary/10 shadow-2xl text-center"
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-primary">lock_person</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Acceso Admin</h1>
            <p className="text-slate-500 font-body">Solo David Artavia tiene permiso de acceso.</p>
          </div>

          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-4 bg-white border border-slate-200 py-4 px-6 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
            Ingresar con Google
          </button>

          <p className="mt-8 text-xs text-slate-400 font-body leading-relaxed">
            Este sitio utiliza autenticación segura. Intentos de acceso no autorizados son bloqueados por correo electrónico.
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
