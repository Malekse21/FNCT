"use client";

import { motion } from "framer-motion";
import { Activity, Database, Users } from "lucide-react";

export default function MuniDashboard() {
  return (
    <main className="flex-1 p-8 text-[#263238]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight text-[#5D4037]">Muni Dashboard</h1>
          <p className="text-[#455A64] mt-2 font-mono text-sm">Municipal oversight and metrics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Total Users", value: "1,245", icon: Users },
            { title: "Active Reports", value: "89", icon: Activity },
            { title: "Data Nodes", value: "4", icon: Database },
          ].map((stat, i) => (
            <div key={i} className="border-[1.5px] border-[#455A64] p-6 flex flex-col justify-between bg-[#EDE8E0] rounded-[4px]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-[#455A64]">{stat.title}</span>
                <stat.icon className="h-4 w-4 text-[#455A64]" />
              </div>
              <span className="text-3xl font-bold font-mono tracking-tight text-[#5D4037]">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="border-[1.5px] border-[#455A64] p-6 bg-[#EDE8E0] min-h-[400px] flex flex-col rounded-[4px]">
          <h2 className="text-lg font-semibold font-serif mb-4 text-[#5D4037]">Recent Activity</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#455A64]/50 bg-[#F5F2ED]/50 rounded-[4px]">
            <p className="text-sm font-mono text-[#455A64]">No recent activity to display.</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
