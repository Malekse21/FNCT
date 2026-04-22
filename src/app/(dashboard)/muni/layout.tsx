import { MuniNavbar } from "@/components/muni-navbar";

export default function MuniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary selection:bg-accent-green selection:text-text-primary">
      <MuniNavbar />
      <div className="flex-1 flex flex-col relative z-0">
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
