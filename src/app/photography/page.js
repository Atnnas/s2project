import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function generateMetadata() {
  await connectToDatabase();
  const latestProject = await Project.findOne({ 
    category: { $in: ["Fotografía", "Photography"] } 
  }).sort({ createdAt: -1 });
  
  return {
    title: "Fotografía | S2 Project",
    description: "Galería de fotografía comercial y editorial de alta gama.",
    openGraph: {
      title: "Galería de Fotografía | S2 Project",
      description: "Descubre nuestra fotografía editorial y comercial de alta gama.",
      images: [latestProject?.imageUrl || "/og-image.jpg"],
    },
  };
}
export const revalidate = 3600;

import { serializeData } from "@/lib/serialize";
import { CircularGallery } from "@/components/ui/CircularGallery";
import MaintenanceState from "@/components/ui/MaintenanceState";

export default async function PhotographyPage() {
  let projects = [];
  try {
    await connectToDatabase();
    // Fetch specifically Photography (supporting both languages just in case)
    const dbProjects = await Project.find({
      category: { $in: ["Fotografía", "Photography"] }
    }).sort({ createdAt: -1 }).lean();

    projects = serializeData(dbProjects);
  } catch (e) {
    console.error("Failed to load photography projects", e);
  }

  // Map to gallery items
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
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] mb-4">Fotografía</h1>
          <p className="text-[clamp(1.1rem,1.2vw,1.35rem)] text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
            Capturado con equipos de gama alta full-frame y graduación de color de precisión.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} category="Fotografía" />
        ) : (
          <MaintenanceState 
            category="Fotografía" 
            icon="photo_camera" 
            message="Nuestra galería de fotografía comercial y artística está en proceso de revelado." 
          />
        )}
      </div>
    </div>
    </>
  );
}
