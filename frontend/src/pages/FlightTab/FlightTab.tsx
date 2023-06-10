import React  from "react";
import styles from "./FlightTab.module.scss";
import cx from "classnames";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import TaskOne from "./TaskOne/TaskOne";
import TaskTwo from "./TaskTwo/TaskTwo";
import TaskThree from "./TaskThree/TaskThree";
import TaskFour from "./TaskFour/TaskFour";

interface FlightTabProps {
	flight: string;
	direction: string;
	classes: string[];
}

const FlightTab = ({classes, direction, flight}: FlightTabProps) => {
	const tabStyles = ({ isActive }: { isActive: boolean }) =>
		isActive
			? cx(styles.navigation__tab, styles.navigation__tab_active)
			: styles.navigation__tab;

	const classOptions = classes.map((classItem, index) => ({
		value: index.toString(),
		title: classItem,
	}));


	return (
		<div className={styles.tabWrapper}>
			<NavLink to="/" className={styles.breadcrumbs}>{"< Главная"}</NavLink>
			<nav className={styles.navigation}>
				<NavLink to="task-1" className={tabStyles}>
					Динамика бронирования
				</NavLink>
				<NavLink to="task-2" className={tabStyles}>
					Сезоны
				</NavLink>
				<NavLink to="task-3" className={tabStyles}>
					Профиль спроса
				</NavLink>
				<NavLink to="task-4" className={tabStyles}>
					Прогнозирование
				</NavLink>
			</nav>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2 className={styles.header__title}>{flight}</h2>
					<h2 className={styles.header__destination}>
						{direction}
					</h2>
				</div>
				<Routes>
					<Route path="/task-1" element={<TaskOne flight={flight}/>}/>
					<Route path="/task-2" element={<TaskTwo classes={classOptions} flight={flight}/>}/>
					<Route path="/task-3" element={<TaskThree classes={classOptions} flight={flight}/>}/>
					<Route path="/task-4" element={<TaskFour classes={classOptions} flight={flight}/>} />
					<Route path="*" element={<Navigate to="task-1"/>}/>
				</Routes>
				{/*<div className={styles.dates}>*/}
				{/*	<CustomDatepicker*/}
				{/*		date={startDate}*/}
				{/*		setDate={setStartDate}*/}
				{/*		maxDate={endDate}*/}
				{/*	/>*/}
				{/*	<CustomDatepicker*/}
				{/*		date={endDate}*/}
				{/*		setDate={setEndDate}*/}
				{/*		minDate={startDate}*/}
				{/*	/>*/}
				{/*</div>*/}
			</div>
		</div>
	);
};

export default FlightTab;
