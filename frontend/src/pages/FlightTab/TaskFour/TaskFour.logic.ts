import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { TabFourData } from "../../../models/flights.interface";

interface graphItem {
	date: string;
	prediction: number;
}

const formatDate = (x: string) => {
	const arr = x.split(".");
	return arr[2] + "-" + arr[1] + "-" + arr[0];
};

const formatDateToString = (x: Date | null) => {
	if (x) {
		const arr = x.toISOString().split("-");
		console.log(arr[2].slice(0, 2) + "." + arr[1] + "." + arr[0]);
		return arr[2].slice(0, 2) + "." + arr[1] + "." + arr[0];
	}

	return null;
};

export const useTaskFourLogic = ({ flight }: { flight: string }) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer
	);
	const [graph, setGraph] = useState<graphItem[]>();

	useEffect(() => {
		const result: graphItem[] = [];
		for (let i = 0; i < (tabInfo as TabFourData)?.dates?.length; i++) {
			result.push({date: (tabInfo as TabFourData)?.dates[i], prediction: (tabInfo as TabFourData)?.predictions[i]});
		}
		setGraph(result);
	}, [tabInfo]);

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
			tab: 4,
			data: {
				flight: flight,
				tabParams: {
					start_date: tabParams.start_date,
					prediction_depth: tabParams.prediction_depth,
					class: x
				}
			}
		});
	};



	return { handleChangeClass, graph, tabParams, fetchFlightHandler, formatDate, handleChangeDate };
};
