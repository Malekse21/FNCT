import { create } from 'zustand';

interface AppState {
  credits: number;
  selectedReportId: string | null;
  setCredits: (credits: number) => void;
  setSelectedReportId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  credits: 0,
  selectedReportId: null,
  setCredits: (credits) => set({ credits }),
  setSelectedReportId: (id) => set({ selectedReportId: id }),
}));
