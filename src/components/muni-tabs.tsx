"use client";

import { motion } from "framer-motion";

interface MuniTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  { label: "Indicateurs Clés", id: "kpi" },
  { label: "Érosion", id: "erosion" },
  { label: "Rapports", id: "rapports" },
];

export function MuniTabs({ activeTab, onTabChange }: MuniTabsProps) {
  return (
    <div className="sticky top-0 z-50 w-full bg-bg-primary h-16 flex items-center justify-center border-b border-border shadow-sm">
      <div className="flex gap-1">
        {tabs.map((tab, i) => {
          const isActive = activeTab === i;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(i)}
              className="relative px-5 py-2 text-[14px] font-medium font-body transition-colors rounded-full overflow-hidden"
              style={{
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              }}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="muni-nav-pill"
                  className="absolute inset-0 bg-[#F0EEE8] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-[#F0EEE8] rounded-full z-0 opacity-0 hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
