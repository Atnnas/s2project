import HeroSection from "@/components/ui/HeroSection";
import StrategicServices from "@/components/ui/StrategicServices";
import ResultsSection from "@/components/ui/ResultsSection";
import ContactSection from "@/components/Contact/ContactSection";
import BookingSection from "@/components/Contact/BookingSection";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function generateMetadata() {
  try {
    await connectToDatabase();
    const latestProject = await Project.findOne({}).sort({ createdAt: -1 });
    
    return {
      title: "S2 Project | Arquitectos de Legados Digitales",
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
    <main className="flex flex-col w-full">
      <HeroSection />
      <StrategicServices />
      <ResultsSection />
      
      <div id="contacto" className="bg-background-light py-40">
        <ContactSection />
      </div>
      
      <BookingSection />
    </main>
  );
}
