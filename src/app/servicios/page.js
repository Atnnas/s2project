import { Fragment } from "react";

export const metadata = {
  title: "Servicios | S2 Project",
  description: "Nuestros servicios profesionales de fotografía, reels y artes digitales.",
};

export default function ServiciosPage() {
  return (
    <>
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 min-h-screen">
        <h1 className="text-5xl font-display font-bold text-slate-900 mb-6">Nuestros Servicios</h1>
        <p className="text-xl text-slate-500 max-w-2xl font-body mb-16">
          Soluciones creativas de élite diseñadas para elevar la identidad digital de tu marca.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">photo_camera</span>
            <h2 className="text-2xl font-bold mb-3">Fotografía Comercial</h2>
            <p className="text-slate-500">Sesiones premium con equipos full-frame y corrección de color cinemática.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">movie</span>
            <h2 className="text-2xl font-bold mb-3">Producción de Reels</h2>
            <p className="text-slate-500">Contenido vertical viral en 4K 60FPS diseñado específicamente para la retención en redes sociales.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">draw</span>
            <h2 className="text-2xl font-bold mb-3">Identidad Visual</h2>
            <p className="text-slate-500">Desarrollo de branding y sistemas de diseño completos para empresas modernas.</p>
          </div>
        </div>
      </main>
    </>
  );
}
