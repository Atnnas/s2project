"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── Primitivos tipográficos ── */
function SectionNumber({ n }) {
  return (
    <span className="font-display font-black text-[11px] uppercase tracking-[0.35em] text-primary/40">
      {String(n).padStart(2, "0")}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-display font-black uppercase tracking-tight text-[#1d2729] leading-tight mt-1">
      {children}
    </h2>
  );
}

function Body({ children, className = "" }) {
  return (
    <p className={`font-body text-[#1d2729]/72 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function Notice({ children }) {
  return (
    <div className="flex gap-3 items-start bg-primary/8 border border-primary/20 rounded-2xl px-5 py-4">
      <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0">info</span>
      <p className="text-primary font-body text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function DataCard({ items }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-5 py-3.5 ${
            i < items.length - 1 ? "border-b border-black/5" : ""
          }`}
        >
          <span className="text-[10px] font-black font-display uppercase tracking-widest text-primary/55 sm:w-44 flex-shrink-0">
            {item.label}
          </span>
          {item.href ? (
            <a href={item.href} className="font-body text-sm text-[#1d2729] hover:text-primary transition-colors underline underline-offset-2 decoration-primary/30 hover:decoration-primary">
              {item.value}
            </a>
          ) : (
            <span className="font-body text-sm text-[#1d2729]">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-[#1d2729]/8 my-14" />;
}

function Section({ n, title, children, delay = 0 }) {
  return (
    <motion.div {...fadeUp(delay)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-0.5">
        <SectionNumber n={n} />
        <SectionTitle>{title}</SectionTitle>
      </div>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function TerminosPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#cadedd] relative overflow-x-hidden w-full min-h-screen">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[55vw] h-[55vh] bg-primary/4 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[35vw] h-[35vh] bg-[#9eb5b2]/20 rounded-full blur-[100px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 w-full pt-[clamp(7rem,14vh,10rem)] pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-10">
            <Link href="/" className="text-[10px] font-black font-display uppercase tracking-[0.3em] text-[#1d2729]/35 hover:text-primary transition-colors">
              S2 Project
            </Link>
            <span className="text-[#1d2729]/20 text-xs">›</span>
            <span className="text-[10px] font-black font-display uppercase tracking-[0.3em] text-primary/60">
              Términos de Uso
            </span>
          </motion.div>

          {/* Title */}
          <motion.div {...fadeUp(0.05)} className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black font-display uppercase tracking-[0.4em] text-primary">
                Vigente desde mayo 2026
              </span>
            </div>

            <h1 className="font-display font-black uppercase tracking-tighter text-[#1d2729]">
              Términos<br />
              <span className="text-primary">de Uso</span>
            </h1>

            <Body>
              Estos Términos de Uso regulan el acceso y la navegación del sitio web ubicado en s2-project.com y
              subdominios asociados, en adelante el Sitio. Al ingresar al Sitio, el usuario manifiesta haber leído,
              comprendido y aceptado íntegramente las condiciones aquí descritas. Si no estuviera de acuerdo con
              alguna parte de estos términos, debería abstenerse de continuar utilizándolo.
            </Body>

            <div className="flex flex-wrap gap-2 mt-1">
              {["Legislación costarricense", "Registro Nacional de Costa Rica", "Tribunales de Costa Rica"].map((t) => (
                <span key={t} className="text-[9px] font-black font-display uppercase tracking-widest text-[#1d2729]/35 px-3 py-1.5 rounded-full border border-[#1d2729]/10 bg-white/30">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DOCUMENT BODY ── */}
      <article className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24">

        <motion.div {...fadeUp(0.1)} className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent mb-14" />

        {/* 1 */}
        <Section n={1} title="Quiénes somos" delay={0.05}>
          <Body>
            El Sitio es operado por 3-102-951758 Sociedad de Responsabilidad Limitada, cédula jurídica 3-102-951758,
            sociedad debidamente constituida e inscrita en el Registro Nacional de Costa Rica, con domicilio social en
            Ciudad Quesada, San Carlos, provincia de Alajuela, Costa Rica. La sociedad opera bajo el nombre comercial
            S2 Project, agencia de marketing digital especializada en branding, contenido, estrategia y producción
            audiovisual.
          </Body>
          <DataCard items={[
            { label: "Razón social", value: "3-102-951758 Sociedad de Responsabilidad Limitada" },
            { label: "Nombre comercial", value: "S2 Project" },
            { label: "Cédula jurídica", value: "3-102-951758" },
            { label: "Domicilio", value: "Ciudad Quesada, San Carlos, Alajuela, Costa Rica" },
            { label: "Correo de contacto", value: "info@s2-project.com", href: "mailto:info@s2-project.com" },
          ]} />
        </Section>

        <Divider />

        {/* 2 */}
        <Section n={2} title="Objeto del Sitio" delay={0.05}>
          <Body>
            El Sitio funciona como canal informativo y de contacto comercial de S2 Project. A través de él,
            presentamos nuestros servicios, casos de trabajo, identidad de marca y vías para iniciar conversaciones
            con potenciales clientes. La información publicada tiene carácter orientativo y no constituye una oferta
            vinculante de servicios.
          </Body>
          <Notice>
            Cualquier contratación de servicios profesionales con S2 Project se formaliza únicamente mediante propuesta
            específica aceptada por escrito y contrato suscrito entre las partes, documentos en los cuales se establecen
            alcance, plazos, condiciones económicas y demás elementos esenciales del acuerdo.
          </Notice>
        </Section>

        <Divider />

        {/* 3 */}
        <Section n={3} title="Uso permitido del Sitio" delay={0.05}>
          <Body>
            El usuario se compromete a utilizar el Sitio de forma diligente, conforme a la ley, la moral, el orden
            público y los presentes Términos. Queda expresamente prohibido:
          </Body>
          <div className="flex flex-col gap-3">
            {[
              "Utilizar el Sitio con fines ilícitos, fraudulentos o lesivos para terceros.",
              "Intentar acceder a áreas restringidas, vulnerar medidas de seguridad o interferir con el funcionamiento normal del Sitio.",
              "Extraer o reproducir contenido del Sitio mediante procedimientos automatizados, minería de datos o herramientas similares sin autorización previa por escrito.",
              "Introducir o difundir código malicioso, virus o cualquier elemento que pueda afectar al Sitio o a sus usuarios.",
              "Suplantar la identidad de S2 Project, de sus colaboradores o de cualquier tercero.",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1d2729]/8 flex items-center justify-center mt-0.5">
                  <span className="material-symbols-outlined text-[#1d2729]/35 text-sm">block</span>
                </div>
                <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 4 */}
        <Section n={4} title="Propiedad intelectual" delay={0.05}>
          <Body>
            Todo el contenido publicado en el Sitio, incluyendo de forma enunciativa y no limitativa los textos,
            fotografías, ilustraciones, gráficos, videos, piezas de diseño, marcas, logotipos, nombres comerciales,
            tipografías seleccionadas, paleta de colores e identidad visual, son propiedad de S2 Project o de sus
            respectivos titulares y se encuentran protegidos por la legislación costarricense e internacional de
            propiedad intelectual.
          </Body>
          <Body>
            Los trabajos realizados para clientes que se muestran como referencia en el Sitio se publican con su
            consentimiento o dentro del alcance contractual acordado. La autoría sobre dichas piezas, así como la
            titularidad de las marcas representadas, pertenece a sus respectivos propietarios.
          </Body>
          <Notice>
            Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otro uso del
            contenido del Sitio sin autorización previa y por escrito de S2 Project. El acceso al Sitio no otorga al
            usuario ningún derecho de explotación sobre los contenidos publicados.
          </Notice>
        </Section>

        <Divider />

        {/* 5 */}
        <Section n={5} title="Enlaces a sitios de terceros" delay={0.05}>
          <Body>
            El Sitio puede contener enlaces a páginas web, plataformas o servicios operados por terceros. S2 Project
            no controla ni asume responsabilidad alguna sobre el contenido, las prácticas de privacidad o el
            funcionamiento de dichos sitios externos. La inclusión de un enlace no implica respaldo, asociación o
            recomendación de los servicios allí ofrecidos.
          </Body>
        </Section>

        <Divider />

        {/* 6 */}
        <Section n={6} title="Disponibilidad y limitación de responsabilidad" delay={0.05}>
          <Body>
            S2 Project realiza esfuerzos razonables para mantener el Sitio operativo y actualizado, pero no garantiza
            disponibilidad ininterrumpida, ausencia total de errores o que el contenido esté libre de imprecisiones.
            El Sitio se ofrece tal cual y según disponibilidad.
          </Body>
          <Notice>
            En la máxima medida permitida por la ley aplicable, S2 Project no será responsable por daños directos,
            indirectos, incidentales o consecuentes derivados del acceso o uso del Sitio, ni por la imposibilidad de
            acceder al mismo, ni por las decisiones que el usuario adopte con base en la información allí publicada.
          </Notice>
        </Section>

        <Divider />

        {/* 7 */}
        <Section n={7} title="Tratamiento de datos personales" delay={0.05}>
          <Body>
            El tratamiento de la información personal que el usuario nos proporciona a través del Sitio, así como el
            uso de cookies, se rige por nuestra Política de Privacidad, documento que complementa estos Términos y se
            considera parte integrante de los mismos.
          </Body>
          <Link
            href="/privacidad"
            className="group inline-flex items-center gap-4 bg-white/50 backdrop-blur-sm border border-white/70 hover:border-primary/30 rounded-2xl px-5 py-4 transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(57,101,66,0.15)] w-fit"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-base">policy</span>
            </div>
            <span className="font-display font-black text-[11px] uppercase tracking-widest text-[#1d2729] group-hover:text-primary transition-colors duration-300">
              Consultar Política de Privacidad
            </span>
            <span className="material-symbols-outlined text-[#1d2729]/20 group-hover:text-primary/50 text-base ml-1 transition-all duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </Section>

        <Divider />

        {/* 8 */}
        <Section n={8} title="Modificaciones a los Términos" delay={0.05}>
          <Body>
            S2 Project se reserva el derecho de modificar estos Términos de Uso en cualquier momento. Las
            modificaciones entrarán en vigor desde el momento de su publicación en el Sitio. Recomendamos al usuario
            revisar periódicamente esta sección. El uso continuado del Sitio tras la publicación de cambios implica
            la aceptación de los términos vigentes.
          </Body>
        </Section>

        <Divider />

        {/* 9 */}
        <Section n={9} title="Legislación aplicable y jurisdicción" delay={0.05}>
          <Body>
            Estos Términos se rigen e interpretan conforme a las leyes de la República de Costa Rica. Cualquier
            controversia derivada del acceso o uso del Sitio será sometida a los Tribunales competentes de Costa Rica,
            renunciando expresamente el usuario a cualquier otro fuero que pudiera corresponderle.
          </Body>
        </Section>

        <Divider />

        {/* 10 */}
        <Section n={10} title="Contacto" delay={0.05}>
          <Body>
            Cualquier duda, comentario o solicitud relacionada con estos Términos puede dirigirla a:
          </Body>
          <DataCard items={[
            { label: "Empresa", value: "S2 Project — 3-102-951758 Sociedad de Responsabilidad Limitada" },
            { label: "Cédula jurídica", value: "3-102-951758" },
            { label: "Dirección", value: "Ciudad Quesada, San Carlos, Alajuela, Costa Rica" },
            { label: "Correo", value: "info@s2-project.com", href: "mailto:info@s2-project.com" },
          ]} />
        </Section>

        {/* ── Pie de página del documento ── */}
        <motion.div {...fadeUp(0.05)} className="mt-16 pt-8 border-t border-[#1d2729]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[10px] font-black font-display uppercase tracking-[0.35em] text-[#1d2729]/30">
            Última actualización: mayo 2026
          </span>
          <Link
            href="/privacidad"
            className="group inline-flex items-center gap-2 text-[10px] font-black font-display uppercase tracking-[0.3em] text-primary/50 hover:text-primary transition-colors"
          >
            Ver Política de Privacidad
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
