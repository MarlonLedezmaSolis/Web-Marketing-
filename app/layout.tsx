import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdsIA CR – Anuncios con IA para tu negocio en Costa Rica",
  description:
    "Genera anuncios irresistibles para Instagram y Facebook en segundos. Sin agencias, sin complicaciones.",
  keywords: ["marketing digital", "anuncios", "Costa Rica", "inteligencia artificial", "Facebook Ads", "Instagram"],
  openGraph: {
    title: "AdsIA CR – Anuncios con IA para tu negocio",
    description: "Atrae más clientes a tu local en Costa Rica sin contratar una agencia.",
    type: "website",
    locale: "es_CR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
