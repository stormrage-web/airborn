import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flightReducer from "./reducers/FlightSlice";

const rootReducer = combineReducers({
	flightReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
