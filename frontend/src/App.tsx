import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import MainTab from "./pages/MainTab/MainTab";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FlightTab from "./pages/FlightTab/FlightTab";
import FlightsWrapper from "./widgets/FlightsWrapper/FlightsWrapper";
import { Flight, flightsMock } from "./shared/mocks/flights";
import axios from "axios";

const App = () => {
	const [flights, setFlights] = useState<Flight[]>(flightsMock);

	useEffect(() => {
		axios.get<Flight[]>("http://91.227.18.29:5000/all_flights_data").then((response) => {
			setFlights(response.data);
		});
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.tabsBlock}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainTab flights={flights} />} />
						<Route path="/flight/" element={<FlightsWrapper />}>
							{flights.map((flight, index) => (
								<Route
									key={flight.title + flight.time}
									path={flight.title + flight.time + "/*"}
									element={<FlightTab flight={flight.title} direction={flight.direction} classes={flight.classes} />}
								/>
							))}
						</Route>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
