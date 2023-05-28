import { useAppDispatch } from "./redux";
import { fetchFlight, setParams } from "../store/reducers/ActionCreators";
import { FlightState, TabParams } from "../store/reducers/FlightSlice";

export const useTabsLogic = () => {
	const dispatch = useAppDispatch();

	const setParamsHandler = ({flight, params}: {flight?: string, params?: TabParams}) => dispatch(setParams({flight, params}));
	const fetchFlightHandler = ({ tab, data }: { tab: number; data: Partial<FlightState> }) => dispatch(fetchFlight({tab, data}));

	return {setParamsHandler, fetchFlightHandler};
};
