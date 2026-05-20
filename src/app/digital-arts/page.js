import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { serializeData } from "@/lib/serialize";
import { PremiumGalleryGrid } from "@/components/ui/PremiumGalleryGrid";
import MaintenanceState from "@/components/ui/MaintenanceState";
import Link from "next/link";

export async function generateMetadata() {
  await connectToDatabase();
  const latestProject = await Project.findOne({ 
    category: { $in: ["Arte Digital", "Digital Arts", "Artes Digitales"] } 
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

export const revalidate = 10;

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

  const galleryItems = projects.map(p => ({
    title: p.title,
    url: p.imageUrl,
    description: p.description,
    videoUrl: p.gallery?.find(m => m.type === 'video')?.url || null
  }));

  return (
    <div className="min-h-screen w-full bg-[#cadedd] flex flex-col items-center pt-[clamp(12rem,18vh,14rem)] pb-24 overflow-x-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:40px_40px] pointer-events-none" />
      
      <header className="w-full max-w-7xl mx-auto mb-8 z-10 px-6 text-left">
        <Link href="/portafolio" className="text-primary font-black uppercase tracking-[0.4em] text-[8px] inline-flex items-center gap-2 hover:gap-4 transition-all duration-300">
          <span className="material-symbols-outlined text-[10px]">arrow_back</span> Portafolio
        </Link>
      </header>

      <div className="w-full relative">
        {projects.length > 0 ? (
          <PremiumGalleryGrid items={galleryItems} />
        ) : (
          <div className="py-20">
            <MaintenanceState 
              category="Artes Digitales" 
              icon="polyline" 
              message="Nuestra galería de branding e identidad visual está siendo curada." 
            />
          </div>
        )}
      </div>
    </div>
  );
}
