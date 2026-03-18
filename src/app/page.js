import ContactSection from "@/components/Contact/ContactSection";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { serializeData } from "@/lib/serialize";

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
  return (
    <main className="flex-1 min-h-[60vh] flex items-center justify-center">
      <ContactSection />
    </main>
  );
}
