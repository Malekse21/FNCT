import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 border-b border-border/40 flex items-center px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <Link 
          href="/" 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'Accueil
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <div className="text-sm font-medium tracking-tight">Statut du Système : <span className="text-green-500">Opérationnel</span></div>
        </div>
      </header>
      <div className="flex-1 flex flex-col relative z-0">
        {children}
      </div>
    </div>
  );
}
