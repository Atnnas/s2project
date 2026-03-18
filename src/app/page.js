import ContactSection from "@/components/Contact/ContactSection";
import BookingSection from "@/components/Contact/BookingSection";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { serializeData } from "@/lib/serialize";

export async function generateMetadata() {
// ... existing metadata logic
  try {
    await connectToDatabase();
    const latestProject = await Project.findOne({}).sort({ createdAt: -1 });
    
    return {
      title: "S2 Project | Portafolio de Producción Audiovisual y Marketing",
      description: "Explora el portafolio de S2 Project: Fotografía comercial cinemática, producción de Reels de alto impacto y estrategias de marketing digital de élite.",
      openGraph: {
        title: "S2 Project | Portafolio Creativo",
        description: "Excelencia visual en fotografía, video y diseño digital para marcas de vanguardia.",
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
    <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center py-20 gap-20">
      <ContactSection />
      <BookingSection />
    </main>
  );
}
