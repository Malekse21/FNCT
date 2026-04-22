"use client";

import { motion } from "framer-motion";
import { Activity, Database, Users } from "lucide-react";

export default function MuniDashboard() {
  return (
    <main className="flex-1 p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Muni Dashboard</h1>
          <p className="text-muted-foreground mt-2">Municipal oversight and metrics.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Total Users", value: "1,245", icon: Users },
            { title: "Active Reports", value: "89", icon: Activity },
            { title: "Data Nodes", value: "4", icon: Database },
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

        <div className="border border-border/50 p-6 bg-card min-h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 bg-muted/20">
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
