export const metadata = {
  title: "Nosotros | S2 Project",
  description: "Conoce a S2 Project, la agencia creativa detrás de las marcas de élite.",
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
