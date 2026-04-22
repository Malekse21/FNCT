"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Box } from "lucide-react";

export function MuniNavbar() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="relative h-16 w-full flex items-center justify-between px-6 bg-bg-primary text-text-primary border-b border-border z-40">
      {/* Left: Logo and Municipality Name */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center text-text-primary shadow-sm">
          <Box className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="font-bold font-display text-[22px] tracking-tight">
          Municipalité de Tunis
        </div>
      </div>

      {/* Middle: Date and Time */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[13px] text-text-secondary hidden md:block tracking-tight">
        {mounted ? format(time, "EEEE d MMMM yyyy | HH:mm:ss", { locale: fr }) : "Chargement de l'heure..."}
      </div>

      {/* Right: Status Indicator */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] px-3 py-1.5 rounded-full bg-accent-green/20 text-[#3d4d00] uppercase">
          <div className="w-2 h-2 rounded-full bg-[#5c7a00] animate-pulse" />
          Système vérifié
        </div>
      </div>
    </nav>
  );
}
