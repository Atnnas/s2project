import { Fragment } from "react";

export const metadata = {
  title: "Portafolio | S2 Project",
  description: "Explora nuestro portafolio profesional de fotografía, reels y artes digitales.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-5xl font-display font-bold text-slate-900 mb-6">Nuestro Portafolio</h1>
      <p className="text-xl text-slate-500 max-w-2xl font-body mb-16">
        Proyectos de élite diseñados para elevar la identidad digital de marcas líderes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">photo_camera</span>
          <h2 className="text-2xl font-bold mb-3">Fotografía</h2>
          <p className="text-slate-500 mb-6">Sesiones premium con equipos full-frame y corrección de color cinemática.</p>
          <a href="/photography" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
            Ver Galería <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">movie</span>
          <h2 className="text-2xl font-bold mb-3">Reels</h2>
          <p className="text-slate-500 mb-6">Contenido vertical viral en 4K diseñado para la retención en redes sociales.</p>
          <a href="/reels" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
            Ver Reels <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="p-8 bg-white rounded-2xl border border-primary/10 shadow-sm transition-all hover:shadow-md">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">draw</span>
          <h2 className="text-2xl font-bold mb-3">Artes Digitales</h2>
          <p className="text-slate-500 mb-6">Desarrollo de branding y sistemas de diseño completos para empresas modernas.</p>
          <a href="/digital-arts" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
            Ver Diseños <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </main>
  );
}
