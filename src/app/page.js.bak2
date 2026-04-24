import HeroSection from "@/components/ui/HeroSection";
import HomeInteractiveBoard from "@/components/ui/HomeInteractiveBoard";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function generateMetadata() {
  try {
    await connectToDatabase();
    const latestProject = await Project.findOne({}).sort({ createdAt: -1 });
    
    return {
      title: "S2 Project | Agencia Boutique de Marketing Digital",
      description: "Elevamos tu marca al nivel de las leyendas. Estrategia integral de redes sociales, producción de alta fidelidad y crecimiento medible.",
      openGraph: {
        title: "S2 Project | Estrategia y Legado Digital",
        description: "Transformamos audiencias en comunidades leales mediante gestión integral 360°.",
        images: [latestProject?.imageUrl || "/og-main.jpg"],
      },
      alternates: {
        canonical: 'https://s2-project.com',
      },
    };
  } catch (e) {
    return { title: "S2 Project" };
  }
}

export const revalidate = 3600;

export default async function Home() {
  return (
    <main className="flex flex-col w-full bg-background-light">
      <HeroSection />
      <HomeInteractiveBoard />
    </main>
  );
}
