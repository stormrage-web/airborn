import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateRange {
	left: string;
	right: string;
}

export interface TabParams {
	date?: string;
	class?: string;
	dateRange?: DateRange;
	type?: 0 | 1;
	profiles?: boolean[];
	deep?: number;
}

export interface Coordinates {
	x: string;
	y: number;
}

export interface TabThreeItem {
	title: string;
	data: Coordinates[];
}

interface Seasons {
	name: string;
	left: string;
	right: string;
}

export interface TabOneData {
	data: Coordinates[];
	seasons: Seasons;
}

export interface FlightState {
	flight: string;
	tabParams: TabParams;
	tabInfo: Coordinates[] | TabOneData | TabThreeItem[];
	isLoading: boolean;
}

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
