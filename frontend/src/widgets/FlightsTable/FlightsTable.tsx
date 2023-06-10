import React from "react";
import styles from "./FlightsTable.module.scss";
import FlightRow from "./FlightRow/FlightRow";
import {Flight} from "../../shared/mocks/flights";

interface FlightsTableProps {
    search: string;
    direction: string;
    flights: Flight[];
}

const FlightsTable = ({search, direction, flights}: FlightsTableProps) => {
    return (
        <table className={styles.wrapper}>
            <thead>
            <tr className={styles.tableHead}>
                <th>Время вылета</th>
                <th>Номер рейса</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {flights.filter((item, index) => {
                return index === 0 || flights[index].title !== flights[index - 1].title;
            }).filter((flight) => !search.length || flight.title.indexOf(search) != -1).filter((flight) => direction.length ? flight.direction.trim() === direction.trim() : true).map((row) => (
                <FlightRow
                    key={row.title + row.time}
                    id={row.title + row.time}
                    title={row.title}
                    time={row.time}
                />
            ))}
            </tbody>
        </table>
    );
};

export default FlightsTable;
