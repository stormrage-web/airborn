import { AppDispatch } from "../store";
import axios from "axios";
import {
	Coordinates,
	flightSlice,
	FlightState,
	TabOneData,
	TabParams,
} from "./FlightSlice";

export const mainEndPoint = "http://91.227.18.29:5000/";

export const fetchFlight =
	({ tab, data }: { tab: number; data: Partial<FlightState> }) =>
		async (dispatch: AppDispatch) => {
			try {
				dispatch(flightSlice.actions.flightFetching);
				const flight_id_param = "?flight_id_param=" + data.flight;
				const flight_date_param = data.tabParams?.date
					? "&flight_date_param=" + data.tabParams?.date
					: "";
				const booking_class_param = data.tabParams?.class
					? "&booking_class_param=" + data.tabParams?.class
					: "";
				const profiles_param = data.tabParams?.profiles?.length
					? data.tabParams.profiles
						.map((profile, index) => {
							let profileName = "";
							switch (index) {
							case 0:
								profileName = "Отдых";
								break;
							case 1:
								profileName = "Бизнес/командировки";
								break;
							case 2:
								profileName = "Спонтанное";
								break;
							case 3:
								profileName = "Заранее запланированное";
								break;
							}
							return "&profile_types=" + profileName;
						})
						.join("")
					: "";
				const plot_type_param =
					data.tabParams?.type === 0
						? "&plot_type_param=dynamic"
						: data.tabParams?.type === 1
							? "&plot_type_param=season_spros"
							: "";
				const response = await axios.get<Coordinates[] | TabOneData>(
					mainEndPoint +
						"flight_task_" +
						tab +
						flight_id_param +
						flight_date_param +
						booking_class_param +
						plot_type_param +
						profiles_param,
				);
				// if (tab == 2) {
				// 	const responseSeasons = (response.data as TabOneData).seasons || {};
				// 	const iteratedSeasons = [];
				// 	for (const key of Object.keys(responseSeasons)) {
				// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// 	// @ts-ignore
				// 		iteratedSeasons.push({
				// 			name: key,
				// 			left: responseSeasons[key]?.left,
				// 			right: responseSeasons[key]?.right,
				// 		});
				// 	}

				// 	dispatch(
				// 		flightSlice.actions.flightFetchingSuccess({
				// 			flight: data.flight,
				// 			tabInfo: response.data,
				// 			tabParams: data.tabParams,
				// 		}),
				// 	);
				// } else
				dispatch(
					flightSlice.actions.flightFetchingSuccess({
						flight: data.flight,
						tabInfo: response.data,
						tabParams: data.tabParams,
					}),
				);
			} catch (e) {
				console.log(e);
			}
		};

export const setParams =
	({ flight, params }: { flight?: string; params?: TabParams }) =>
		async (dispatch: AppDispatch) => {
			dispatch(
				flightSlice.actions.flightFetchingSuccess({
					flight: flight,
					tabParams: { ...params },
				}),
			);
		};
