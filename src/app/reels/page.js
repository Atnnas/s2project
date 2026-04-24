import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function generateMetadata() {
  await connectToDatabase();
  const latestProject = await Project.findOne({ category: 'Reels' }).sort({ createdAt: -1 });
  
  return {
    title: "Reels Dinámicos | S2 Project",
    description: "Narrativa cinematográfica vertical 9:16 para alcance global.",
    openGraph: {
      title: "Reels Dinámicos | S2 Project",
      description: "Explora nuestro portfolio de Reels dinámicos.",
      images: [latestProject?.imageUrl || "/og-image.jpg"],
    },
  };
}
export const revalidate = 3600;

import { serializeData } from "@/lib/serialize";
import { CircularGallery } from "@/components/ui/CircularGallery";
import MaintenanceState from "@/components/ui/MaintenanceState";

export default async function ReelsPage() {
  let projects = [];
  try {
    await connectToDatabase();
    const dbProjects = await Project.find({
      category: { $in: ["Reels", "Reel"] }
    }).sort({ createdAt: -1 }).lean();
    
    projects = serializeData(dbProjects);
  } catch (e) {
    console.error("Failed to load reels", e);
  }

  // Map to gallery items - now including extra fields for the modal
  const galleryItems = projects.map(p => ({
    title: p.title,
    url: p.imageUrl,
    description: p.description,
    videoUrl: p.gallery?.find(m => m.type === 'video')?.url || null
  }));

  return (
    <>
    <div className="flex-1 flex flex-col bg-white relative overflow-x-hidden min-h-[calc(100vh-var(--navbar-height))] w-full">
      {/* Spacer for fixed navbar */}
      <div className="shrink-0 h-[var(--navbar-height)]" />
      <div className="flex-1 w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-24 pt-8 pb-20 flex flex-col items-center">

        <header className="mb-8 text-center shrink-0">
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] mb-4">Reels Dinámicos</h1>
          <p className="text-[clamp(1.1rem,1.2vw,1.35rem)] text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
            Contenido vertical de alto impacto diseñado para la retención y el engagement en redes sociales.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} category="Reels" />
        ) : (
          <MaintenanceState 
            category="Reels" 
            icon="movie_filter" 
            message="Nuestra galería de contenido vertical está en producción técnica." 
          />
        )}
      </div>
    </div>
    </>
  );
}
