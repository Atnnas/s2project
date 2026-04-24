import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function generateMetadata() {
  await connectToDatabase();
  const latestProject = await Project.findOne({ 
    category: { $in: ["Arte Digital", "Digital Arts"] } 
  }).sort({ createdAt: -1 });
  
  return {
    title: "Artes Digitales | S2 Project",
    description: "Branding, sistemas de identidad y activos digitales creados con precisión.",
    openGraph: {
      title: "Artes Digitales | S2 Project",
      description: "Identidad visual y branding estratégico para marcas innovadoras.",
      images: [latestProject?.imageUrl || "/og-image.jpg"],
    },
  };
}
export const revalidate = 3600;

import { serializeData } from "@/lib/serialize";
import { CircularGallery } from "@/components/ui/CircularGallery";
import MaintenanceState from "@/components/ui/MaintenanceState";

export default async function DigitalArtsPage() {
  let projects = [];
  try {
    await connectToDatabase();
    const dbProjects = await Project.find({
      category: { $in: ["Arte Digital", "Digital Arts", "Artes Digitales"] }
    }).sort({ createdAt: -1 }).lean();

    projects = serializeData(dbProjects);
  } catch (e) {
    console.error("Failed to load digital arts", e);
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
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black uppercase tracking-tighter text-slate-900 leading-[0.85] mb-4">Artes Digitales</h1>
          <p className="text-[clamp(1.1rem,1.2vw,1.35rem)] text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
            Branding estratégico e identidades visuales para empresas con visión de futuro.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} category="Artes Digitales" />
        ) : (
          <MaintenanceState 
            category="Artes Digitales" 
            icon="polyline" 
            message="Nuestra galería de branding e identidad visual está siendo curada." 
          />
        )}
      </div>
    </div>
    </>
  );
}
