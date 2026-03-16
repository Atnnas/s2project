import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
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
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <h1 className="text-6xl font-display font-bold text-slate-900 mb-4 tracking-tight">Artes Digitales</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body">
            Branding estratégico e identidades visuales para empresas con visión de futuro.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} category="Artes Digitales" />
        ) : (
          <div className="py-20 text-center text-slate-400">
            <p className="text-xl">No se han encontrado proyectos de artes digitales todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
