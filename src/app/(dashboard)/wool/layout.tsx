import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary selection:bg-accent-green selection:text-text-primary">
      <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-bg-primary z-50 shadow-sm">
        <Link 
          href="/" 
          className="flex items-center text-sm font-medium font-body text-text-secondary hover:text-text-primary hover:bg-[#F0EEE8] px-4 py-2 rounded-full transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'Accueil
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.08em] px-3 py-1.5 rounded-full bg-accent-green/20 text-[#3d4d00] uppercase">
            <div className="w-2 h-2 rounded-full bg-[#5c7a00] animate-pulse" />
            Opérationnel
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col relative z-0">
        {children}
      </div>
    </div>
  );
}
