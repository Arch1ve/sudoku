import { create } from "zustand";
import { CellsData, CellsDataAction } from "./types";
import { createJSONStorage, persist } from "zustand/middleware";

const mockData = [
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
	[{"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}, {"value": null, "editable": false}],
]

export const useCellsDataStore = create(persist<CellsData & CellsDataAction>((set, get) => ({
  values: get()?.values || mockData,
  changeValues: (cellLocation, value) => set((state) => {
		
		const clonedValues = structuredClone(state.values)
		clonedValues[cellLocation[0]][cellLocation[1]] = {value, editable: true}

		return ({ values: clonedValues })}),
}), {
  name: 'cellsData-storage', 
  storage: createJSONStorage(() => localStorage), 
},))