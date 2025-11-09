// src/data/settings.ts

import { create } from 'zustand'; // FIX: Changed from default to named import
import { persist } from 'zustand/middleware';

type ReadingMode = 'narrated' | 'selfRead';

interface SettingsState {
  readingMode: ReadingMode;
  toggleReadingMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      readingMode: 'selfRead',
      // FIX: Added explicit type for the 'state' parameter
      toggleReadingMode: () =>
        set((state: SettingsState) => ({
          readingMode:
            state.readingMode === 'narrated' ? 'selfRead' : 'narrated',
        })),
    }),
    {
      name: 'gia-t-books-settings',
    }
  )
);