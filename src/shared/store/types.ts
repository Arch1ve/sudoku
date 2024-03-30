export type Settings = {
	showErrors: boolean;
	showSameNumbers: boolean;
	showRowsAndColumns: boolean;
};

export type SettingsAction = {
	changeShowErrors: (showErrors: Settings["showErrors"]) => void;
	changeShowSameNumbers: (showSameNumbers: Settings["showSameNumbers"]) => void;
	changeShowRowsAndColumns: (
		showRowsAndColumns: Settings["showRowsAndColumns"],
	) => void;
};
