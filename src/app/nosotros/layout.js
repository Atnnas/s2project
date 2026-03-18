import { metadata as SEO } from "./page";

export const metadata = {
  ...SEO,
  title: "Sobre Nosotros | La Agencia Detrás de tu Éxito Digital",
};

export default function NosotrosLayout({ children }) {
  return <>{children}</>;
}
