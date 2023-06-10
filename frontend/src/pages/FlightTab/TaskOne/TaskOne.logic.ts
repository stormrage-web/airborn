import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { useState } from "react";

const formatDate = (x: string) => {
	const arr = x.split(".");
	return arr[2] + "-" + arr[1] + "-" + arr[0];
};

const formatDateToString = (x: Date | null) => {
	if (x) {
		const arr = x.toISOString().split("-");
		return arr[2].slice(0, 2) + "." + arr[1] + "." + arr[0];
	}

	return null;
};


export const useTaskOneLogic = ({ flight }: { flight: string }) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer
	);

	const [isSeasonTypeActive, setIsSeasonTypeActive] = useState(true);
	const handleTypeChange = (x: boolean) => setIsSeasonTypeActive(x);

	const handleChangeDate = (x: Date | null) => {
		fetchFlightHandler({
			tab: 1,
			data: {
				flight: flight,
				tabParams: {
					...tabParams,
					date: formatDateToString(x) || undefined
				}
			}
		});
	};

	const handleChangeClass = (x: string) => {
		fetchFlightHandler({
			tab: 1,
			data: {
				flight: flight,
				tabParams: {
					...tabParams,
					class: x
				}
			}
		});
	};

	return {
		handleChangeClass,
		handleChangeDate,
		fetchFlightHandler,
		tabInfo,
		tabParams,
		isSeasonTypeActive,
		handleTypeChange,
		formatDate
	};
};