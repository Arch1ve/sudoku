import { FC } from "react";
import { NumberCell } from "./styles";

type NumberData = {
	value: string | number | null;
	editable: boolean;
};

export type NumberCellWrapperProps = {
	numberData: NumberData;
	rowIndex: number;
	cellIndex: number;
	rowHighlight?: boolean;
	cellHighlight?: boolean;
	onCellClick: VoidFunction;
};

export const NumberCellWrapper: FC<NumberCellWrapperProps> = ({
	numberData,
	rowIndex,
	cellIndex,
	onCellClick,
	cellHighlight,
	rowHighlight,
}) => (
	<NumberCell
		rowIndex={rowIndex + 1}
		cellIndex={cellIndex + 1}
		onClick={onCellClick}
		cellHighlight={cellHighlight}
		rowHighlight={rowHighlight}
	>
		{numberData.value}
	</NumberCell>
);
