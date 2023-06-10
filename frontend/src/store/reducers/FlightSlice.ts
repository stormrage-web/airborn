import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightState } from "../../models/flights.interface";

const initialState: FlightState = {
	flight: "",
	tabParams: {
		date: "01.01.2018",
		class: "",
		type: 0,
		dateRange: {
			left: "",
			right: "",
		},
		profiles: [false, false, false, false],
	},
	tabInfo: [],
	isLoading: false,
};

export const flightSlice = createSlice({
	name: "flight",
	initialState,
	reducers: {
		flightFetching(state) {
			state.isLoading = true;
		},
		flightFetchingSuccess(state, action: PayloadAction<Partial<FlightState>>) {
			console.log(action.payload);
			state.flight = action.payload.flight || initialState.flight;
			state.tabInfo = action.payload.tabInfo || initialState.tabInfo;
			state.tabParams = action.payload.tabParams || initialState.tabParams;
			state.isLoading = false;
		}
	},
});

export default flightSlice.reducer;
