export const metadata = {
  title: "Sobre Nosotros | La Agencia Detrás de tu Éxito Digital",
  description: "Conoce a S2 Project, el equipo de expertos en marketing y producción audiovisual dedicados a transformar la presencia digital de marcas premium.",
  keywords: ["equipo s2 project", "agencia creativa costa rica", "expertos en marketing digital", "producción audiovisual profesional"],
};

export default function NosotrosPage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 pb-32 min-h-screen">
        <h1 className="text-5xl font-display font-bold text-slate-900 mb-10">Sobre S2 Project</h1>
        
        <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-justify">
          <p>
            En <strong>S2 Project</strong> ayudamos a empresas y profesionales a elevar su imagen digital y convertir su presencia en resultados reales. Creemos que una imagen bien construida no solo se ve bien, sino que comunica, conecta y genera confianza.
          </p>
          <p>
            Somos un equipo joven con mentalidad estratégica, que combina creatividad, responsabilidad y una visión fresca del marketing digital. Trabajamos con tecnología de alto nivel, utilizando software y hardware profesional de última generación para garantizar contenidos de calidad premium, alineados a los objetivos de cada cliente.
          </p>
          <p>
            Nos diferenciamos por un enfoque personalizado y cercano: entendemos cada proyecto como único y diseñamos soluciones a la medida, desde branding y contenido visual hasta estrategias digitales orientadas a crecimiento y posicionamiento. En S2 Project no ofrecemos fórmulas genéricas, sino profesionalismo, innovación y resultados, respaldados por un compromiso real con la excelencia.
          </p>
        </div>
      </main>
    </>
  );
}
