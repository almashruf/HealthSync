// stores/ui-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  // Sidebar
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  expandedGroups: string[];

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarMobileOpen: (open: boolean) => void;
  toggleGroup: (groupTitle: string) => void;
  setExpandedGroups: (groups: string[]) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      sidebarMobileOpen: false,
      expandedGroups: [],

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),

      toggleGroup: (groupTitle) =>
        set((state) => {
          const isExpanded = state.expandedGroups.includes(groupTitle);
          return {
            expandedGroups: isExpanded
              ? state.expandedGroups.filter((g) => g !== groupTitle)
              : [...state.expandedGroups, groupTitle],
          };
        }),

      setExpandedGroups: (groups) => set({ expandedGroups: groups }),
    }),
    {
      name: "healthsync-ui",
      // Only persist sidebar collapsed state and expanded groups, not mobile open
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        expandedGroups: state.expandedGroups,
      }),
    },
  ),
);
