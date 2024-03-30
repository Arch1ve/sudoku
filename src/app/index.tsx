import { Checkbox, FormControlLabel, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSettingsStore } from "../shared/store";
import {
	NumberCellWrapper,
	NumberCellWrapperProps,
} from "../shared/number-cell";
import { useCellsDataStore } from "./store";
import { CellsData } from "./store/types";

const checkNumericInput = (value: string) => {
	const regex = new RegExp("^[1-9]$");
	return regex.test(value);
};

const testIsValuesValid = values => {};

// TODO: оптимизировать поиск в матрице
const findSameNumbersLocations = (
	rowIndex: number,
	cellIndex: number,
	values: CellsData["values"],
): Record<number, (string | number)[]> => {
	const targetNumber = values[rowIndex][cellIndex].value;
	if (targetNumber === null) {
		return {};
	}

	const sameNumbersLocations: Record<number, (string | number)[]> = {};

	values.forEach((row, currentRowIndex) => {
		row.forEach((el, currentCellIndex) => {
			if (targetNumber === el.value) {
				sameNumbersLocations[currentRowIndex] = [
					...(sameNumbersLocations[currentRowIndex] || []),
					currentCellIndex,
				];
			}
		});
	});

	return sameNumbersLocations;
};

type CellLocationType = [rowIndex: number, cellIndex: number];

function App() {
	const showErrors = useSettingsStore(state => state.showErrors);
	const showSameNumbers = useSettingsStore(state => state.showSameNumbers);
	const showRowsAndColumns = useSettingsStore(
		state => state.showRowsAndColumns,
	);
	const changeShowErrors = useSettingsStore(state => state.changeShowErrors);
	const changeShowSameNumbers = useSettingsStore(
		state => state.changeShowSameNumbers,
	);
	const changeShowRowsAndColumns = useSettingsStore(
		state => state.changeShowRowsAndColumns,
	);

	const cellsValues = useCellsDataStore(state => state.values);
	const changeCellValue = useCellsDataStore(state => state.changeValues);

	const [currentCellLocation, setCurrentCellLocation] =
		useState<CellLocationType>([0, 0]);
	const [sameNumbersLocations, setSameNumbersLocations] = useState<
		Record<number, (string | number)[]>
	>({});

	useEffect(() => {
		const handleKeyEvent = (evt: KeyboardEvent) => {
			if (checkNumericInput(evt.key)) {
				changeCellValue(currentCellLocation, evt.key);
				showSameNumbers &&
					setSameNumbersLocations(
						findSameNumbersLocations(
							currentCellLocation[0],
							currentCellLocation[1],
							cellsValues,
						),
					);
			}
			if (evt.key === "Backspace" || evt.key === "Delete") {
				changeCellValue(currentCellLocation, null);
			}
		};
		document.addEventListener("keydown", handleKeyEvent);
		return () => {
			document.removeEventListener("keydown", handleKeyEvent);
		};
	}, [currentCellLocation, changeCellValue, cellsValues, showSameNumbers]);

	const AppContainer = styled("div")({
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	});

	const Container = styled("div")({
		width: "auto",
		display: "grid",
		alignSelf: "flex-start",
		gridTemplateColumns: "repeat(9, 50px)",
		gridTemplateRows: "repeat(9, 50px)",
	});

	const onCellClick = (rowIndex: number, cellIndex: number) => () => {
		setCurrentCellLocation([rowIndex, cellIndex]);
		showSameNumbers &&
			setSameNumbersLocations(
				findSameNumbersLocations(rowIndex, cellIndex, cellsValues),
			);
	};

	return (
		<AppContainer>
			<FormControlLabel
				control={
					<Checkbox
						onChange={evt => {
							changeShowErrors(evt.target.checked);
						}}
						checked={showErrors}
						name="showErrors"
					/>
				}
				label="Show errors"
			/>
			<FormControlLabel
				control={
					<Checkbox
						onChange={evt => {
							changeShowSameNumbers(evt.target.checked);
						}}
						checked={showSameNumbers}
						name="showSameNumbers"
					/>
				}
				label="Show same numbers"
			/>
			<FormControlLabel
				control={
					<Checkbox
						onChange={evt => {
							changeShowRowsAndColumns(evt.target.checked);
						}}
						checked={showRowsAndColumns}
						name="showRowsAndColumns"
					/>
				}
				label="Show rows and columns"
			/>
			<Container>
				{cellsValues?.map((row, rowIndex) =>
					row.map((cell, cellIndex) => {
						const additionalProps: Partial<NumberCellWrapperProps> = {};

						if (
							showSameNumbers &&
							Object.entries(sameNumbersLocations).length > 0
						) {
							if (rowIndex in sameNumbersLocations)
								additionalProps.cellHighlight = !!sameNumbersLocations[
									rowIndex
								].find(el => el === cellIndex);
						} else if (
							currentCellLocation[0] == rowIndex &&
							currentCellLocation[1] == cellIndex
						) {
							additionalProps.cellHighlight = true;
						}

						if (
							showRowsAndColumns &&
							(currentCellLocation[0] == rowIndex ||
								currentCellLocation[1] == cellIndex)
						) {
							additionalProps.rowHighlight = true;
						}

						additionalProps.rowHighlight &&
							console.log(additionalProps.rowHighlight);

						return (
							<NumberCellWrapper
								numberData={cell}
								rowIndex={rowIndex}
								cellIndex={cellIndex}
								onCellClick={onCellClick(rowIndex, cellIndex)}
								key={`${rowIndex}${cellIndex}`}
								{...additionalProps}
							/>
						);
					}),
				)}
			</Container>
		</AppContainer>
	);
}

export default App;
