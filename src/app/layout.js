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
  title: "S2 Project - Portfolio Showcase",
  description: "Premium Quality • Professional Hardware • Software Precision",
  icons: {
    icon: [{ url: '/logo3.png' }, { url: '/logo1.png', rel: 'icon' }],
    apple: '/logo3.png',
  },
};

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
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
