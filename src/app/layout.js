import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/Providers/AuthProvider";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const clashGrotesk = localFont({
  src: [
    {
      path: "../../public/TIPOGRAFIAS/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
});

const roundo = localFont({
  src: [
    {
      path: "../../public/TIPOGRAFIAS/Roundo_Complete/Fonts/WEB/fonts/Roundo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/Roundo_Complete/Fonts/WEB/fonts/Roundo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/Roundo_Complete/Fonts/WEB/fonts/Roundo-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/TIPOGRAFIAS/Roundo_Complete/Fonts/WEB/fonts/Roundo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roundo",
});

export const metadata = {
  metadataBase: new URL('https://s2-project.com'),
  title: {
    default: "S2 Project | Agencia de Marketing Digital y Producción Audiovisual",
    template: "%s | S2 Project"
  },
  description: "Agencia creativa de élite especializada en producción de Reels, fotografía comercial cinemática y estrategias de marketing digital de alto impacto.",
  keywords: ["marketing digital", "producción de reels", "fotografía comercial", "artes digitales", "branding", "estrategia de contenido", "S2 Project"],
  authors: [{ name: "S2 Project Team" }],
  creator: "S2 Project",
  publisher: "S2 Project",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://s2-project.com",
    siteName: "S2 Project",
    title: "S2 Project | Marketing Digital y Producción Audiovisual de Élite",
    description: "Elevamos la identidad de tu marca con contenido visual de alta fidelidad y estrategias digitales disruptivas.",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "S2 Project - Agencia Creativa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S2 Project | Marketing Digital",
    description: "Producción audiovisual y artes digitales de alto impacto.",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo3.png' }, { url: '/logo1.png', rel: 'icon' }],
    apple: '/logo3.png',
  },
  alternates: {
    canonical: 'https://s2-project.com',
  },
};

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import StructuredData from "@/components/SEO/StructuredData";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body
        className={`${inter.variable} ${clashGrotesk.variable} ${roundo.variable} bg-background-light font-body text-slate-900 antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <Navbar />
            <main className="flex-1 pt-24 md:pt-40">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
