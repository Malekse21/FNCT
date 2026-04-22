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
    <nav className="relative h-16 w-full flex items-center justify-between px-6 border-b-[1.5px] border-[#455A64] bg-[#F5F2ED] text-[#263238] shadow-sm">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* Left: Logo and Municipality Name */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 bg-[#455A64] rounded-[4px] flex items-center justify-center text-[#F5F2ED]">
          <Box className="w-6 h-6" />
        </div>
        <div className="font-bold font-serif text-xl tracking-tight text-[#5D4037]">
          Municipalité de Tunis
        </div>
      </div>

      {/* Middle: Date and Time */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm tracking-tight text-[#455A64] hidden md:block">
        {mounted ? format(time, "EEEE d MMMM yyyy | HH:mm:ss", { locale: fr }) : "Chargement de l'heure..."}
      </div>

      {/* Right: Status Indicator */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 border-[1.5px] border-[#6B8E23] text-[#6B8E23] rounded-[4px] bg-[#6B8E23]/10">
          <div className="w-2 h-2 rounded-full bg-[#6B8E23] animate-pulse" />
          SYSTÈME VÉRIFIÉ
        </div>
      </div>
    </nav>
  );
}
