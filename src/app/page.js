import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { serializeData } from "@/lib/serialize";
import Image from "next/image";
import { CircularGallery } from "@/components/ui/CircularGallery";

export async function generateMetadata() {
// ... existing metadata logic
  await connectToDatabase();
  const latestProject = await Project.findOne({}).sort({ createdAt: -1 });
  
  return {
    title: "S2 Project | Portfolio Showcase",
    description: "Cinematic photography, dynamic reels, and strategic digital arts.",
    openGraph: {
      title: "S2 Project Portfolio",
      description: "Visual excellence in photography, video, and digital design.",
      images: [latestProject?.imageUrl || "/og-image.jpg"],
    },
  };
}

export const revalidate = 3600;

export default async function Home() {
  let projects = [];
  let isDbConnected = false;

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const dbProjects = await Project.find({}).lean();
      if (dbProjects && dbProjects.length > 0) {
        projects = serializeData(dbProjects);
      }
      isDbConnected = true;
    }
  } catch (e) {
    console.log("DB connection failed, using static data or empty.");
  }

  // Categories mapping
  const mapProjectToGallery = (p) => ({
    title: p.title,
    url: p.imageUrl,
    description: p.description,
    videoUrl: p.gallery?.find(m => m.type === 'video')?.url || null
  });

  const photographyItems = projects
    .filter(p => p.category === 'Fotografía' || p.category === 'Photography')
    .map(mapProjectToGallery);

  const reelsItems = projects
    .filter(p => p.category === 'Reels')
    .map(mapProjectToGallery);

  const digitalArtsItems = projects
    .filter(p => p.category === 'Arte Digital' || p.category === 'Digital Arts' || p.category === 'Artes Digitales')
    .map(mapProjectToGallery);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {!isDbConnected && process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm font-semibold sticky top-20 z-40 shadow">
            ⚠️ La conexión a MongoDB no está activa. Usando datos internos.
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 pb-20 space-y-32">
          {/* Photography Section */}
          <section id="servicios" className="flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                Fotografía <span className="text-primary/30 font-normal text-2xl ml-2">/ 01</span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-20" />
            </div>
            {photographyItems.length > 0 ? (
              <CircularGallery items={photographyItems} category="Fotografía" />
            ) : (
              <p className="text-slate-400 py-10">Proyectos de fotografía próximamente.</p>
            )}
          </section>

          {/* Reels Section */}
          <section className="flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                Reels Dinámicos <span className="text-primary/30 font-normal text-2xl ml-2">/ 02</span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-20" />
            </div>
            {reelsItems.length > 0 ? (
              <CircularGallery items={reelsItems} category="Reels" />
            ) : (
              <p className="text-slate-400 py-10">Contenido de reels próximamente.</p>
            )}
          </section>

          {/* Digital Arts Section */}
          <section className="flex flex-col items-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                Artes Digitales <span className="text-primary/30 font-normal text-2xl ml-2">/ 03</span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-20" />
            </div>
            {digitalArtsItems.length > 0 ? (
              <CircularGallery items={digitalArtsItems} category="Artes Digitales" />
            ) : (
              <p className="text-slate-400 py-10">Artes digitales próximamente.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
