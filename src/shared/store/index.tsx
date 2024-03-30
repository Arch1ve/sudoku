import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Settings, SettingsAction } from "./types";

export const useSettingsStore = create(
	persist<Settings & SettingsAction>(
		(set, get) => ({
			showErrors: get()?.showErrors || true,
			showSameNumbers: get()?.showSameNumbers || true,
			showRowsAndColumns: get()?.showRowsAndColumns || true,
			changeShowErrors: showErrors => set(() => ({ showErrors })),
			changeShowSameNumbers: showSameNumbers =>
				set(() => ({ showSameNumbers })),
			changeShowRowsAndColumns: showRowsAndColumns =>
				set(() => ({ showRowsAndColumns })),
		}),
		{
			name: "settings-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
