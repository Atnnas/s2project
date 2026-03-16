import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
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
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <h1 className="text-6xl font-display font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Fotografía</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body">
            Capturado con equipos de gama alta full-frame y graduación de color de precisión.
          </p>
        </header>

        {projects.length > 0 ? (
          <CircularGallery items={galleryItems} />
        ) : (
          <div className="py-20 text-center text-slate-400">
            <p className="text-xl">No se han encontrado proyectos en esta categoría todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
