import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://portfolio-karla.vercel.app"
  ),

  title: {
    default:
      "Karla Vanessa Rubio Segura | Software Engineer",
    template:
      "%s | Karla Vanessa Rubio Segura",
  },

  description:
    "Portafolio profesional de Karla Vanessa Rubio Segura, Ingeniera en Desarrollo y Gestión de Software y Full Stack Developer.",

  keywords: [
    "Karla Vanessa Rubio Segura",
    "Software Engineer",
    "Full Stack Developer",
    "Desarrolladora Web",
    "Ingeniera de Software",
    "Desarrollo de Software",
    "Frontend Developer",
    "Backend Developer",
    "Guadalajara",
    "México",
  ],

  authors: [
    {
      name: "Karla Vanessa Rubio Segura",
    },
  ],

  creator:
    "Karla Vanessa Rubio Segura",

  openGraph: {
    title:
      "Karla Vanessa Rubio Segura | Software Engineer",

    description:
      "Ingeniera en Desarrollo y Gestión de Software. Desarrollo de sistemas, plataformas y soluciones digitales.",

    type: "website",

    locale: "es_MX",

    siteName:
      "Karla Vanessa Rubio Segura",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Karla Vanessa Rubio Segura | Software Engineer",

    description:
      "Portafolio profesional de desarrollo de software.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}