export type CellsData ={values: Array<Array<{"value": string | number | null, "editable": boolean}>>
}

type CellLocationType = [rowIndex: number, cellIndex: number]


export type CellsDataAction = {
  changeValues: (cellLocation: CellLocationType, value: string | number | null) => void
}