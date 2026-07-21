import type { Metadata } from "next";
import "./globals.css";
import { RouteTransitionIndicator } from "@/components/navigation/RouteTransitionIndicator";

export const metadata: Metadata = {
  title: "Mission Réussite | Apprendre devient une aventure",
  description:
    "Des aventures pédagogiques personnalisées pour chaque enfant et un suivi simple pour toute la famille.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body><RouteTransitionIndicator />{children}</body>
    </html>
  );
}
