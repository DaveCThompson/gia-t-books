// src/data/stores/settings.store.ts

import { create } from 'zustand';
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
      toggleReadingMode: () =>
        set((state) => ({
          readingMode:
            state.readingMode === 'narrated' ? 'selfRead' : 'narrated',
        })),
    }),
    {
      name: 'gia-t-books-settings',
    }
  )
);