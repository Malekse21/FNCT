"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-6 flex justify-between items-center border-b border-border/40">
        <div className="font-bold text-xl tracking-tight">LATEXO V4</div>
        <nav className="flex gap-4">
          <Link href="/muni" className="text-sm font-medium hover:underline underline-offset-4">
            Tableau de Bord Muni
          </Link>
          <Link href="/app" className="text-sm font-medium hover:underline underline-offset-4">
            Tableau de Bord App
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            Système en Ligne
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter">
            Brutaliste. Minimaliste. Rapide.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez la prochaine génération de notre moteur de simulation. Contraste élevé, aucune distraction, conçu pour une concentration totale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button asChild size="lg" className="rounded-none h-12 px-8">
              <Link href="/muni">
                Entrer Muni <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none h-12 px-8">
              <Link href="/app">
                Entrer App
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
