import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // User preferences
  theme: 'light' | 'dark' | 'system';
  language: string;

  // App state
  isLoading: boolean;
  lastVisit: Date | null;

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setLoading: (loading: boolean) => void;
  updateLastVisit: () => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      theme: 'system',
      language: 'en',
      isLoading: false,
      lastVisit: null,

      // Actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setLoading: (loading) => set({ isLoading: loading }),
      updateLastVisit: () => set({ lastVisit: new Date() }),
      resetApp: () =>
        set({
          theme: 'system',
          language: 'en',
          isLoading: false,
          lastVisit: null,
        }),
    }),
    {
      name: 'app-storage', // unique name for localStorage key
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        lastVisit: state.lastVisit,
      }), // only persist these fields
    },
  ),
);
