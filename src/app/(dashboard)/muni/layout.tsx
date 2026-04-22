import { MuniNavbar } from "@/components/muni-navbar";

export default function MuniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED] text-[#263238] selection:bg-[#6B8E23] selection:text-[#F5F2ED]">
      <MuniNavbar />
      <div className="flex-1 flex flex-col relative z-0">
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
