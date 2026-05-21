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

/* ── Separador de sección ── */
function Divider() {
  return <div className="w-full h-px bg-[#1d2729]/8 my-14" />;
}

/* ── Bloque de sección ── */
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
export default function PrivacidadPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#cadedd] relative overflow-x-hidden w-full min-h-screen">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[55vw] h-[55vh] bg-primary/4 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vh] bg-[#9eb5b2]/20 rounded-full blur-[100px]" />
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
              Privacidad
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
              Política de<br />
              <span className="text-primary">Privacidad</span>
            </h1>

            <Body>
              En S2 Project tratamos con seriedad la información personal que las personas comparten con nosotros.
              Esta Política explica de forma clara qué datos recolectamos a través de nuestro sitio web, para qué los
              utilizamos, con quién los compartimos y cómo puede usted ejercer sus derechos sobre ellos.
            </Body>

            <Body>
              Este documento se redacta de conformidad con la Ley de Protección de la Persona frente al tratamiento de
              sus datos personales, Ley número 8968, su Reglamento Decreto Ejecutivo 37554-JP, y demás normativa
              costarricense aplicable.
            </Body>

            <div className="flex flex-wrap gap-2 mt-1">
              {["Ley 8968", "Decreto 37554-JP", "Normativa costarricense"].map((t) => (
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

        {/* Línea separadora de inicio */}
        <motion.div {...fadeUp(0.1)} className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent mb-14" />

        {/* 1 */}
        <Section n={1} title="Responsable del tratamiento" delay={0.05}>
          <Body>
            El responsable del tratamiento de los datos personales recolectados a través de este sitio es:
          </Body>
          <DataCard items={[
            { label: "Razón social", value: "3-102-951758 Sociedad de Responsabilidad Limitada" },
            { label: "Nombre comercial", value: "S2 Project" },
            { label: "Cédula jurídica", value: "3-102-951758" },
            { label: "Domicilio", value: "Ciudad Quesada, San Carlos, Alajuela, Costa Rica" },
            { label: "Correo de privacidad", value: "info@s2-project.com", href: "mailto:info@s2-project.com" },
          ]} />
        </Section>

        <Divider />

        {/* 2 */}
        <Section n={2} title="Datos personales que recolectamos" delay={0.05}>
          <Body>
            Recolectamos únicamente los datos necesarios para los fines descritos en esta Política. En particular,
            podemos tratar las siguientes categorías de datos:
          </Body>

          <div className="flex flex-col gap-5 mt-1">
            {[
              {
                label: "Datos de identificación y contacto",
                text: "Que usted nos proporciona voluntariamente a través del formulario de contacto, correo electrónico u otros canales: nombre, correo electrónico, número de teléfono, empresa u organización, cargo, y el contenido del mensaje que decida compartirnos.",
              },
              {
                label: "Datos de navegación",
                text: "Recolectados de forma automática mediante cookies y tecnologías similares: dirección IP, tipo y versión del navegador, sistema operativo, páginas visitadas, tiempo de permanencia, sitio de procedencia, ubicación aproximada inferida y patrones generales de uso.",
              },
              {
                label: "Datos derivados de la relación comercial",
                text: "Cuando se concreta una contratación: información fiscal, datos de facturación, comunicaciones, contenidos de las propuestas y documentos asociados al servicio.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-[0.65em]" />
                <div>
                  <span className="font-display font-black text-[12px] uppercase tracking-widest text-[#1d2729] block mb-1">
                    {item.label}
                  </span>
                  <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Notice>
            No solicitamos ni tratamos categorías especiales de datos personales sensibles, en los términos del
            artículo 9 de la Ley 8968, a través de este sitio.
          </Notice>
        </Section>

        <Divider />

        {/* 3 */}
        <Section n={3} title="Cómo recolectamos sus datos" delay={0.05}>
          <Body>
            La información se obtiene a través de tres vías principales:
          </Body>
          <ol className="flex flex-col gap-4 mt-1">
            {[
              "Cuando usted la proporciona voluntariamente al completar formularios, escribirnos directamente o contactarnos por cualquiera de nuestros canales.",
              "De forma automática durante su navegación, mediante cookies y herramientas analíticas integradas en el sitio.",
              "En el marco de la relación comercial, cuando una contratación ha sido formalizada.",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black font-display text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed pt-0.5">{item}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Divider />

        {/* 4 */}
        <Section n={4} title="Finalidades del tratamiento" delay={0.05}>
          <Body>
            Sus datos personales son tratados únicamente para las siguientes finalidades:
          </Body>
          <div className="flex flex-col gap-4 mt-1">
            {[
              { label: "Atención de consultas", text: "Atender consultas, solicitudes de información y requerimientos enviados a través del sitio o de nuestros canales de contacto." },
              { label: "Propuestas comerciales", text: "Elaborar y remitir propuestas comerciales cuando exista una solicitud expresa o un interés manifiesto por parte del usuario." },
              { label: "Gestión contractual", text: "Gestionar la relación contractual con clientes activos, incluyendo facturación, comunicaciones de servicio y entrega de los trabajos contratados." },
              { label: "Mejora del sitio", text: "Analizar de forma agregada el uso del sitio con el fin de mejorar su funcionamiento, contenido y experiencia de navegación." },
              { label: "Cumplimiento legal", text: "Cumplir con obligaciones legales, contables y tributarias aplicables en Costa Rica." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-[0.65em]" />
                <div>
                  <span className="font-display font-black text-[12px] uppercase tracking-widest text-[#1d2729] block mb-1">{item.label}</span>
                  <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 5 */}
        <Section n={5} title="Base legal del tratamiento" delay={0.05}>
          <Body>
            El tratamiento de sus datos se fundamenta principalmente en el consentimiento informado que usted otorga
            al enviar voluntariamente un formulario, escribirnos o aceptar el uso de cookies. Adicionalmente, cuando
            exista una relación contractual, el tratamiento se justifica en la ejecución del contrato y en el
            cumplimiento de las obligaciones legales que de él se derivan.
          </Body>
        </Section>

        <Divider />

        {/* 6 */}
        <Section n={6} title="Comunicaciones comerciales y marketing" delay={0.05}>
          <Body>
            Actualmente S2 Project no opera listas de suscripción ni envía comunicaciones masivas de marketing por
            correo electrónico. En caso de que en el futuro decidamos hacerlo, dichas comunicaciones se enviarán
            exclusivamente a personas que hayan otorgado su consentimiento expreso y previo. En todo caso, cada
            comunicación incluirá un mecanismo sencillo para darse de baja en cualquier momento.
          </Body>
        </Section>

        <Divider />

        {/* 7 */}
        <Section n={7} title="Uso de cookies" delay={0.05}>
          <Body>
            Este sitio utiliza cookies, que son pequeños archivos de información que se almacenan en su dispositivo
            durante la navegación. Las cookies nos permiten que el sitio funcione correctamente, recordar preferencias
            básicas y comprender de forma agregada cómo las personas interactúan con nuestro contenido.
          </Body>
          <Body>
            Las cookies utilizadas pueden clasificarse, en líneas generales, en dos grupos:
          </Body>
          <div className="flex flex-col gap-4">
            {[
              { label: "Cookies técnicas o estrictamente necesarias", text: "Esenciales para el correcto funcionamiento del sitio." },
              { label: "Cookies analíticas", text: "Destinadas a entender de forma anónima y agregada cómo se utiliza el sitio." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-[0.65em]" />
                <div>
                  <span className="font-display font-black text-[12px] uppercase tracking-widest text-[#1d2729] block mb-1">{item.label}</span>
                  <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Body>
            Usted puede configurar su navegador para aceptar, rechazar o eliminar las cookies en cualquier momento.
            Tenga en cuenta que la desactivación de ciertas cookies puede afectar la funcionalidad del sitio.
          </Body>
        </Section>

        <Divider />

        {/* 8 */}
        <Section n={8} title="Con quién compartimos sus datos" delay={0.05}>
          <Notice>
            No vendemos, alquilamos ni comercializamos sus datos personales bajo ninguna circunstancia.
          </Notice>
          <Body>Sus datos podrán ser tratados únicamente por:</Body>
          <ol className="flex flex-col gap-4">
            {[
              "Personal autorizado de S2 Project, sujeto a deberes de confidencialidad.",
              "Proveedores tecnológicos que prestan servicios necesarios para el funcionamiento del sitio y de nuestras operaciones, tales como hosting, servicios de correo electrónico, herramientas de gestión y plataformas de productividad. Estos proveedores acceden a los datos exclusivamente en el marco de los servicios contratados.",
              "Autoridades públicas competentes cuando exista una obligación legal de comunicar la información.",
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black font-display text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed pt-0.5">{item}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Divider />

        {/* 9 */}
        <Section n={9} title="Transferencias internacionales de datos" delay={0.05}>
          <Body>
            La infraestructura técnica que soporta el sitio web y algunas de las herramientas que utilizamos para
            nuestras operaciones se encuentran alojadas en servidores ubicados fuera de Costa Rica, principalmente en
            Estados Unidos. Esto implica que, en el curso normal de operación, sus datos pueden ser procesados y
            almacenados en jurisdicciones extranjeras.
          </Body>
          <Body>
            Seleccionamos proveedores que cuenten con estándares razonables de seguridad y protección de datos, y
            exigimos compromisos contractuales que aseguren un tratamiento responsable de la información.
          </Body>
        </Section>

        <Divider />

        {/* 10 */}
        <Section n={10} title="Plazos de conservación" delay={0.05}>
          <Body>
            Conservamos sus datos personales por el tiempo necesario para cumplir con las finalidades para las que
            fueron recolectados y, posteriormente, durante los plazos exigidos por la normativa aplicable. En particular:
          </Body>
          <div className="flex flex-col gap-4">
            {[
              { label: "Datos de contacto sin relación comercial", text: "Se conservan mientras subsista el interés mutuo de comunicación o hasta que el titular solicite su eliminación." },
              { label: "Datos de clientes activos", text: "Se conservan durante toda la vigencia de la relación comercial y, posteriormente, durante los plazos exigidos por la legislación comercial, fiscal y contable costarricense." },
              { label: "Datos de navegación vinculados a cookies", text: "Se conservan durante los períodos específicos de cada cookie, según la configuración técnica de cada herramienta." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-[0.65em]" />
                <div>
                  <span className="font-display font-black text-[12px] uppercase tracking-widest text-[#1d2729] block mb-1">{item.label}</span>
                  <p className="font-body text-sm text-[#1d2729]/68 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* 11 */}
        <Section n={11} title="Sus derechos como titular de los datos" delay={0.05}>
          <Body>
            La Ley 8968 reconoce a toda persona los siguientes derechos sobre sus datos personales, conocidos como
            derechos ARCO:
          </Body>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { letter: "A", right: "Acceso", text: "Conocer qué datos suyos tenemos y cómo los tratamos." },
              { letter: "R", right: "Rectificación", text: "Solicitar la corrección de datos inexactos o incompletos." },
              { letter: "C", right: "Cancelación o supresión", text: "Pedir la eliminación de sus datos cuando ya no sean necesarios o cuando usted retire su consentimiento." },
              { letter: "O", right: "Oposición", text: "Oponerse al tratamiento de sus datos en los casos previstos por la ley." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-display font-black text-sm text-[#fdf9e1]">{item.letter}</span>
                </div>
                <div>
                  <span className="font-display font-black text-[11px] uppercase tracking-widest text-[#1d2729] block mb-0.5">{item.right}</span>
                  <p className="text-[#1d2729]/65 font-body text-xs leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Body>
            Para ejercer cualquiera de estos derechos, puede escribirnos a{" "}
            <a href="mailto:info@s2-project.com" className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors">
              info@s2-project.com
            </a>{" "}
            indicando el derecho que desea ejercer y acompañando una identificación que permita acreditar su titularidad.
            Atenderemos su solicitud dentro de los plazos establecidos por la legislación vigente.
          </Body>

          <Notice>
            Si considera que sus derechos no han sido debidamente atendidos, puede presentar una denuncia ante la
            Agencia de Protección de Datos de los Habitantes, PRODHAB, en su condición de autoridad de control en
            Costa Rica.
          </Notice>
        </Section>

        <Divider />

        {/* 12 */}
        <Section n={12} title="Seguridad de la información" delay={0.05}>
          <Body>
            Aplicamos medidas técnicas y organizativas razonables para proteger sus datos personales frente a pérdida,
            acceso no autorizado, alteración o divulgación indebida. No obstante, ningún sistema en línea es
            completamente seguro, por lo que no podemos garantizar de forma absoluta la inviolabilidad de la
            información transmitida o almacenada digitalmente. En caso de detectar un incidente de seguridad relevante,
            actuaremos con diligencia y comunicaremos a los titulares y a las autoridades según corresponda.
          </Body>
        </Section>

        <Divider />

        {/* 13 */}
        <Section n={13} title="Personas menores de edad" delay={0.05}>
          <Body>
            Nuestros servicios y este sitio web están dirigidos exclusivamente a personas mayores de edad y a
            representantes legales de organizaciones. No recolectamos de forma consciente datos personales de personas
            menores de edad. Si una persona menor de edad nos ha proporcionado información personal sin autorización de
            su representante legal, agradeceremos contactarnos para proceder a su eliminación inmediata.
          </Body>
        </Section>

        <Divider />

        {/* 14 */}
        <Section n={14} title="Cambios a esta Política" delay={0.05}>
          <Body>
            Podemos actualizar esta Política de Privacidad cuando sea necesario reflejar cambios en nuestras prácticas,
            en la tecnología que utilizamos o en la normativa aplicable. La versión vigente será siempre la publicada
            en el sitio, con indicación de su fecha de actualización. Cuando los cambios sean sustanciales, procuraremos
            comunicarlos por un medio adicional razonable.
          </Body>
        </Section>

        <Divider />

        {/* 15 */}
        <Section n={15} title="Contacto" delay={0.05}>
          <Body>
            Si tiene preguntas sobre esta Política de Privacidad, sobre el tratamiento que damos a sus datos o sobre
            cómo ejercer sus derechos, puede escribirnos a:
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
            href="/terminos"
            className="group inline-flex items-center gap-2 text-[10px] font-black font-display uppercase tracking-[0.3em] text-primary/50 hover:text-primary transition-colors"
          >
            Ver Términos de Uso
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
