import { styled } from "@mui/material";
import { CSSProperties } from "react";

type NumberCellProps = {
	rowIndex: number;
	cellIndex: number;
	rowHighlight?: boolean;
	cellHighlight?: boolean;
	editable: boolean;
};

export const NumberCell = styled("div")<NumberCellProps>(({
	rowIndex,
	cellIndex,
	rowHighlight,
	cellHighlight,
	editable,
}) => {
	const additionalStyles: CSSProperties = {};
	if (cellIndex % 3 === 0 && cellIndex !== 9) {
		additionalStyles.borderRight = "2px solid black";
	}
	if (rowIndex % 3 === 0 && rowIndex !== 9) {
		additionalStyles.borderBottom = "2px solid black";
	}
	if (rowIndex === 9) {
		additionalStyles.borderBottom = "2px solid black";
	}
	if (rowIndex === 9) {
		additionalStyles.borderBottom = "2px solid black";
	}
	if (rowIndex === 1) {
		additionalStyles.borderTop = "2px solid black";
	}
	if (cellIndex === 9) {
		additionalStyles.borderRight = "2px solid black";
	}
	if (cellIndex === 1) {
		additionalStyles.borderLeft = "2px solid black";
	}
	if (rowHighlight) {
		additionalStyles.backgroundColor = "#e6f6ff";
	}
	if (cellHighlight) {
		additionalStyles.backgroundColor = "#b2def7";
	}
	if (editable) {
		additionalStyles.color = "#1471f5";
	}

	return {
		border: "2px solid #e4e4e4",
		borderLeft: "none",
		borderTop: "none",
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "2.5rem",
		"&:hover": {
			backgroundColor: "#b2def7",
		},
		...additionalStyles,
	};
});
