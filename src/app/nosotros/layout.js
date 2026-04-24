export const metadata = {
  title: "Nosotros | S2 Project | Agencia Boutique",
  description: "Somos S2 Project, una agencia boutique con un enfoque fresco del marketing digital. La nueva generacion de agencias.",
  keywords: ["agencia boutique", "marketing digital Costa Rica", "branding premium", "estrategia digital", "producción audiovisual", "S2 Project nosotros"],
  openGraph: {
    title: "Sobre Nosotros | S2 Project",
    description: "Somos S2 Project, una agencia boutique con un enfoque fresco del marketing digital. La nueva generacion de agencias.",
  },
};

export default function NosotrosLayout({ children }) {
  return <div className="bg-white">{children}</div>;
}
