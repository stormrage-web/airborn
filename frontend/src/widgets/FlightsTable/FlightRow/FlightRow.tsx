import React from "react";
import styles from "./FlightRow.module.scss";
import { NavLink } from "react-router-dom";

interface FlightRowProps {
	id: string;
	time: string;
	title: string;
}

const FlightRow = ({ time, title, id }: FlightRowProps) => {
	return (
		<tr className={styles.wrapper}>
			<td>{time}</td>
			<td>{title}</td>
			<td className={styles.buttonCell}><NavLink to={"/flight/" + id} className={styles.buttonCell__input}>Посмотреть</NavLink></td>
		</tr>
	);
};

export default FlightRow;
