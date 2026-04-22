"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, ShieldAlert } from "lucide-react";

export default function AppDashboard() {
  return (
    <main className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord App</h1>
          <p className="text-muted-foreground mt-2">Contrôles de base de l'application et gestion des simulations.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Charge Système", value: "24%", icon: Zap },
            { title: "Simulations Actives", value: "3", icon: Terminal },
            { title: "Événements de Sécurité", value: "0", icon: ShieldAlert },
          ].map((stat, i) => (
            <div key={i} className="border border-border/50 p-6 flex flex-col justify-between bg-card">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border/50 p-6 bg-card min-h-[300px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Statut LLM Groq</h2>
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/50 bg-muted/20">
              <div className="w-3 h-3 rounded-full bg-green-500 mb-2 animate-pulse" />
              <p className="text-sm text-muted-foreground">Connecté et Prêt</p>
            </div>
          </div>
          <div className="border border-border/50 p-6 bg-card min-h-[300px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Actions Rapides</h2>
            <div className="flex-1 flex flex-col gap-3 justify-center">
              <button className="bg-foreground text-background px-4 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
                Démarrer une Nouvelle Simulation
              </button>
              <button className="bg-transparent border border-border px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Voir les Journaux
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
