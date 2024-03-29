import { create } from "zustand";
import { Settings, SettingsAction } from "./types";
import { persist, createJSONStorage } from 'zustand/middleware'


export const useSettingsStore = create(persist<Settings & SettingsAction>((set, get) => ({
  showErrors: get()?.showErrors || true,
  showSameNumbers: get()?.showSameNumbers || true,
  showRowsAndColumns: get()?.showRowsAndColumns || true,
  changeShowErrors: (showErrors) => set(() => ({ showErrors: showErrors })),
  changeShowSameNumbers: (showSameNumbers) => set(() => ({ showSameNumbers: showSameNumbers })),
  changeShowRowsAndColumns: (showRowsAndColumns) => set(() => ({ showRowsAndColumns: showRowsAndColumns })),
}), {
  name: 'settings-storage',
  storage: createJSONStorage(() => localStorage),
},))