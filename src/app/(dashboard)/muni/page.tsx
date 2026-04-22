"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { MuniTabs } from "@/components/muni-tabs";
import { erosionZones, riskColors, type ErosionZone } from "@/lib/erosion-data";
import {
  Trash2, Box, ShieldCheck, Cloud, Mountain, Fuel, Droplets, Wrench,
  RefreshCcw, TrendingUp, Info, FileText, Loader2, Sparkles,
  MapPin, Layers, AlertTriangle, ArrowRight, ArrowLeft
} from "lucide-react";

/* Dynamic import for Leaflet (no SSR) */
const ErosionMap = dynamic(() => import("@/components/erosion-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-secondary flex items-center justify-center rounded-2xl">
      <span className="text-sm font-mono text-text-tertiary animate-pulse">Chargement de la carte…</span>
    </div>
  ),
});

/* ── KPI Types & Data ── */
interface KpiItem {
  abbr: string; title: string; info: string; formula: string;
  significance: string; value: string; unit: string; trend: string;
  icon: React.ElementType; variant: "accent" | "muted" | "dark" | "tinted-blue" | "tinted-purple";
}

const kpis: KpiItem[] = [
  { abbr:"LDT", title:"Tonnage Détourné", info:"Poids total des déchets organiques interceptés.", formula:"Σ (Poids) − Rejet", significance:"Réduction de la charge.", value:"342", unit:"tonnes", trend:"+12.4%", icon:Trash2, variant:"accent" },
  { abbr:"PHHR", title:"Risques Sanitaires", info:"Réduction du temps de rue des peaux brutes.", formula:"(Nb. Abattoirs) × Gain H", significance:"Ville plus propre.", value:"−768", unit:"h·site", trend:"−62%", icon:ShieldCheck, variant:"dark" },
  { abbr:"CH₄", title:"Méthane Évité", info:"Émissions de méthane bloquées.", formula:"Masse (t) × 0.21", significance:"Rapports climatiques.", value:"72", unit:"t CO₂", trend:"+15.1%", icon:Cloud, variant:"tinted-blue" },
  { abbr:"LVR", title:"Espace Sauvé", info:"Volume économisé dans la décharge.", formula:"Tonnage / 0.05", significance:"Durée de vie prolongée.", value:"6.8k", unit:"m³", trend:"+18.2%", icon:Box, variant:"muted" },
  { abbr:"IRMC", title:"Injiraf Actif", info:"% des zones protégées.", formula:"(Couverts / Zone) × 100", significance:"Infrastructures sécurisées.", value:"34.7", unit:"%", trend:"+8.3%", icon:Mountain, variant:"tinted-purple" },
  { abbr:"EMCL", title:"Écos Logistique", info:"Carburant économisé par IA.", formula:"Dist. Évitée × Prix", significance:"Efficacité camions.", value:"4.2k", unit:"TND", trend:"+22.6%", icon:Fuel, variant:"muted" },
  { abbr:"PIS", title:"Eau Économisée", info:"Gains d'irrigation avec laine.", formula:"Conso − Traitées", significance:"Économie publique.", value:"128k", unit:"litres", trend:"+31.5%", icon:Droplets, variant:"muted" },
  { abbr:"MCA", title:"Prévention", info:"Coûts de réparation évités.", formula:"Coût/m² × Surface", significance:"Budget optimisé.", value:"18.7k", unit:"TND", trend:"+9.8%", icon:Wrench, variant:"muted" },
  { abbr:"LCI", title:"Circularité", info:"% déchets transformés localement.", formula:"(Récup / Généré) × 100", significance:"Économie circulaire.", value:"67.3", unit:"%", trend:"+5.2%", icon:RefreshCcw, variant:"muted" },
];

const cardStyles = {
  "accent": "bg-accent-green text-text-primary",
  "muted": "bg-accent-beige text-text-primary",
  "dark": "bg-[#0F0F0F] text-white",
  "tinted-blue": "bg-accent-blue text-text-primary",
  "tinted-purple": "bg-accent-purple text-text-primary",
};

/* ── KPI Card ── */
function KpiCard({ kpi, index }: { kpi: KpiItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = kpi.icon;
  const isDark = kpi.variant === "dark";
  const pillBg = isDark ? "bg-white/10" : "bg-black/5";
  const iconBg = isDark ? "bg-white/10" : "bg-white/50";

  return (
    <motion.div 
      initial={{ opacity:0, y:20 }} 
      animate={{ opacity:1, y:0 }} 
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group w-full h-[440px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative ${cardStyles[kpi.variant]}`}
    >
      {/* Background bleed effect placeholder */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isDark ? 'bg-gradient-to-t from-white/5 to-transparent' : 'bg-gradient-to-t from-black/5 to-transparent'}`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className={`px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-[0.08em] ${pillBg}`}>
            {kpi.abbr}
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="text-xl font-display font-bold tracking-tight mb-2 leading-tight">
            {kpi.title}
          </h3>
          <p className={`text-[13px] leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-text-secondary'}`}>
            {kpi.info}
          </p>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-baseline gap-1.5">
              <span className="text-6xl font-display font-black tracking-tighter leading-none">
                {kpi.value}
              </span>
              <span className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-text-tertiary'}`}>
                {kpi.unit}
              </span>
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${pillBg}`}>
              <TrendingUp className="w-3 h-3" /> {kpi.trend}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Tab 1: KPIs ── */
function TabKpi() {
  return (
    <div className="space-y-8 pt-6">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary block mb-2">
            MÉTRIQUES PRINCIPALES
          </span>
          <h2 className="text-4xl font-display font-black tracking-tighter text-text-primary">
            Performances
          </h2>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-8">
        {kpis.map((k, i) => <KpiCard key={k.abbr} kpi={k} index={i} />)}
      </div>
    </div>
  );
}

/* ── Tab 2: Érosion ── */
function TabErosion() {
  const [selectedZone, setSelectedZone] = useState<ErosionZone | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectZone = useCallback((zone: ErosionZone | null) => {
    setSelectedZone(zone);
    setAnalysis(null);
  }, []);

  const runAnalysis = async (zone?: ErosionZone) => {
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch("/api/erosion-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zone ? { zone } : { allZones: erosionZones }),
      });
      const data = await res.json();
      setAnalysis(data.analysis || data.error || "Aucune réponse.");
    } catch { setAnalysis("Erreur de connexion au serveur."); }
    finally { setLoading(false); }
  };

  const critiques = erosionZones.filter(z => z.risk === "critique").length;
  const eleves = erosionZones.filter(z => z.risk === "élevé").length;

  return (
    <div className="space-y-10 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary block mb-2">
            SIG & SURVEILLANCE
          </span>
          <h2 className="text-4xl font-display font-black tracking-tighter text-text-primary">
            Zones à Risque
          </h2>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[12px] font-medium px-4 py-2 rounded-full bg-red-50 text-red-700">
            <AlertTriangle className="w-3.5 h-3.5" /> {critiques} Critiques
          </div>
          <div className="flex items-center gap-2 text-[12px] font-medium px-4 py-2 rounded-full bg-orange-50 text-orange-700">
            {eleves} Élevés
          </div>
          <button onClick={() => runAnalysis()} disabled={loading}
            className="flex items-center gap-2 text-[13px] font-bold px-6 py-2.5 bg-text-primary text-white rounded-full hover:bg-[#333] hover:-translate-y-px transition-all shadow-sm disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Analyse Globale IA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ minHeight: 600 }}>
        {/* Map */}
        <div className="lg:col-span-2 h-[600px] rounded-2xl overflow-hidden shadow-sm border border-border">
          <ErosionMap zones={erosionZones} onSelectZone={handleSelectZone} selectedZoneId={selectedZone?.id ?? null} />
        </div>

        {/* Side panel */}
        <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2" style={{ scrollbarWidth: 'thin' }}>
          
          {/* Selected zone details */}
          {selectedZone ? (
            <motion.div initial={{ opacity:0, scale: 0.98 }} animate={{ opacity:1, scale: 1 }}
              className="bg-bg-secondary rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] mb-3" style={{ backgroundColor: riskColors[selectedZone.risk] + '20', color: riskColors[selectedZone.risk] }}>
                    {selectedZone.risk} — {selectedZone.riskScore}/100
                  </span>
                  <h3 className="text-xl font-display font-bold leading-tight text-text-primary">{selectedZone.name}</h3>
                </div>
              </div>
              <p className="text-[13px] text-text-secondary leading-relaxed">{selectedZone.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Surface", `${(selectedZone.area_m2/10000).toFixed(1)} ha`],
                  ["Sol", selectedZone.soilType],
                  ["Pente", selectedZone.slope],
                  ["Protégée", selectedZone.protected ? `${selectedZone.protectedPct}%` : "Non"],
                ].map(([l, v]) => (
                  <div key={l} className="bg-white rounded-xl p-3 shadow-sm border border-border/50">
                    <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider block mb-1">{l}</span>
                    <span className="text-[13px] font-bold text-text-primary">{v}</span>
                  </div>
                ))}
              </div>
              
              <button onClick={() => runAnalysis(selectedZone)} disabled={loading}
                className="w-full flex items-center justify-center gap-2 text-[13px] font-bold px-6 py-3 bg-white border-1.5 border-border-strong text-text-primary rounded-full hover:bg-bg-tertiary hover:border-text-tertiary transition-colors disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Analyser cette zone
              </button>
            </motion.div>
          ) : (
            <div className="bg-bg-secondary/50 border border-dashed border-border-strong rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <MapPin className="w-5 h-5 text-text-tertiary" />
              </div>
              <p className="text-[13px] font-medium text-text-secondary">Sélectionnez une zone sur la carte pour voir les détails</p>
            </div>
          )}

          {/* Zone list */}
          <div className="bg-bg-secondary rounded-2xl p-6 shadow-sm">
            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.08em] mb-4">Toutes les Zones</h3>
            <div className="space-y-1">
              {erosionZones.sort((a,b) => b.riskScore - a.riskScore).map(z => (
                <button key={z.id} onClick={() => handleSelectZone(z)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${selectedZone?.id === z.id ? "bg-white shadow-sm border border-border/50" : "hover:bg-black/5 border border-transparent"}`}>
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: riskColors[z.risk] }} />
                  <span className={`text-[13px] font-medium truncate flex-1 ${selectedZone?.id === z.id ? 'text-text-primary' : 'text-text-secondary'}`}>{z.name}</span>
                  <span className="text-[11px] font-bold text-text-tertiary bg-black/5 px-2 py-0.5 rounded-full">{z.riskScore}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis panel */}
      <AnimatePresence>{(analysis || loading) && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }}
          className="bg-accent-beige rounded-2xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold tracking-tight text-text-primary">Analyse IA — Groq</h3>
          </div>
          {loading ? (
            <div className="flex items-center gap-3 py-10 justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-text-tertiary" />
              <span className="text-[14px] font-medium text-text-secondary">Génération de la stratégie…</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-[14px] text-text-secondary leading-relaxed whitespace-pre-wrap">
              {analysis}
            </div>
          )}
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

/* ── Tab 3: Rapports ── */
function TabRapports() {
  return (
    <div className="bg-bg-secondary min-h-[500px] flex flex-col items-center justify-center rounded-2xl p-10 mt-6 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-6">
        <FileText className="w-6 h-6 text-text-tertiary" />
      </div>
      <h2 className="text-2xl font-display font-bold tracking-tight text-text-primary mb-3">Rapports Municipaux</h2>
      <p className="text-[14px] text-text-secondary text-center max-w-md leading-relaxed">
        Génération automatique de rapports de durabilité, incluant les KPIs et les stratégies d'intervention IA.
      </p>
      <button className="mt-8 px-6 py-3 bg-white border-1.5 border-border-strong text-[14px] font-bold text-text-primary rounded-full shadow-sm hover:bg-bg-tertiary transition-colors">
        Nouveau Rapport
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function MuniDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <MuniTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 px-4 md:px-8 py-10 overflow-hidden">
        <motion.div 
          initial={{ opacity:0, y:10 }} 
          animate={{ opacity:1, y:0 }} 
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
          className="max-w-[1400px] mx-auto space-y-12"
        >
          {/* Page Hero Header */}
          <div className="max-w-3xl">
            <h1 className="text-[64px] leading-[0.96] font-display font-black tracking-tightest text-text-primary mb-4">
              Tableau de Bord
            </h1>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Supervision environnementale, gestion de l'érosion et métriques d'impact pour la municipalité de Tunis.
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity:0, y: 15 }} 
              animate={{ opacity:1, y: 0 }} 
              exit={{ opacity:0, y: -15 }} 
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {activeTab === 0 && <TabKpi />}
              {activeTab === 1 && <TabErosion />}
              {activeTab === 2 && <TabRapports />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
