import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Latexo V4",
  description: "B&W Brutalist Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(inter.variable, plexMono.variable, sourceSerif.variable)}>
      <body className="font-sans antialiased">
        <NextTopLoader color="#000000" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}

