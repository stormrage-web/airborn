import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { TabOneData } from "../../../models/flights.interface";

export const useTaskTwoLogic = ({ flight }: { flight: string }) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer
	);
	const mx = (tabInfo as TabOneData).data?.length ? Math.max(...(tabInfo as TabOneData).data.map(item => item.y)) : 0;

	const handleChangeClass = (x: string) => {
		fetchFlightHandler({
			tab: 2,
			data: {
				flight: flight,
				tabParams: {
					type: tabParams.type,
					class: x
				}
			}
		});
	};

	const handleChangeType = (x: boolean) => {
		fetchFlightHandler({
			tab: 2,
			data: {
				flight: flight,
				tabParams: {
					class: tabParams.class,
					type: x ? 0 : 1
				}
			}
		});
	};

	return { handleChangeClass, handleChangeType, mx, fetchFlightHandler, tabParams, tabInfo };
};