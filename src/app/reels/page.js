import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
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

export default async function ReelsPage() {
  let projects = [];
  try {
    await connectToDatabase();
    const dbProjects = await Project.find({
      category: { $in: ["Reels"] }
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
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <h1 className="text-6xl font-display font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Reels Dinámicos</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body">
            Contenido vertical de alto impacto diseñado para la retención y el engagement en redes sociales.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} category="Reels" />
        ) : (
          <div className="py-20 text-center text-slate-400">
            <p className="text-xl">No se han encontrado reels todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
