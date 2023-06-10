import { AppDispatch } from "../store";
import axios from "axios";
import { flightSlice } from "./FlightSlice";
import {
	Coordinates,
	FlightState,
	TabOneData,
	TabParams,
} from "../../models/flights.interface";

export const mainEndPoint = "http://51.250.91.130:5000/";

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
				const start_date = data.tabParams?.start_date
					? "&start_date=" + data.tabParams?.start_date
					: "";
				const prediction_depth = data.tabParams?.prediction_depth
					? "&prediction_depth=" + data.tabParams?.prediction_depth
					: "";
				const profiles_param = data.tabParams?.profiles?.length
					? "&profile_types=" + data.tabParams.profiles
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
							return profile
								? profileName
								: "";
						}).filter((item) => item?.length).join(",")
					: "";
				const plot_type_param =
				tab === 2
					? "&plot_type_param=season_spros"
					: data.tabParams?.type === 0
						? "&plot_type_param=dynamic"
						: "";
				const response = await axios.get<Coordinates[] | TabOneData | any>(
					mainEndPoint +
					"flight_task_" +
					tab +
					flight_id_param +
					flight_date_param +
					booking_class_param +
					plot_type_param +
					start_date +
					prediction_depth +
					profiles_param,
				);
				if (tab == 2) {
					const responseSeasons = response.data.seasons;
					const iteratedSeasons = [];
					for (const key of Object.keys(responseSeasons)) {
						iteratedSeasons.push({
							name: key,
							left: responseSeasons[key]?.left,
							right: responseSeasons[key]?.right,
						});
					}
					dispatch(
						flightSlice.actions.flightFetchingSuccess({
							flight: data.flight,
							tabInfo: { ...response.data, seasons: iteratedSeasons },
							tabParams: data.tabParams,
						}),
					);
				} else
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
