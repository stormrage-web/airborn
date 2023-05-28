import React, { useEffect, useState } from "react";
import styles from "./TaskTwo.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Brush,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import ToggleSwitch from "../../../widgets/ToggleSwitch/ToggleSwitch";
import axios from "axios";

interface TaskTwoProps {
	classes: Option[];
	flight: string;
}

const TaskTwo = ({classes, flight}: TaskTwoProps) => {
	const [seasons, setSeasons] = useState<any[]>([]);
	const [data, setData] = useState([]);
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const [isSeasonTypeActive, setIsSeasonTypeActive] = useState(true);
	const selectedValue =
		classes.find((item) => item.value === selectedClass) || null;

	const handleTypeChange = (x: boolean) => setIsSeasonTypeActive(x);

	useEffect(() => {
		axios
			.get(
				"http://91.227.18.29:5000/flight_task_2?flight_id_param=1125&flight_date_param=04.03.2019&booking_class_param=J&plot_type_param=dynamic",
			)
			.then((response) => {
				setData(response.data?.data);
				const responseSeasons = response.data?.seasons;
				const iteratedSeasons = [];
				for (const key of Object.keys(responseSeasons)) {
					iteratedSeasons.push({
						name: key,
						startIndex: responseSeasons[key]?.left,
						endIndex: responseSeasons[key]?.right,
					});
				}
				setSeasons(iteratedSeasons);
			});
	}, []);

	return (
		<div>
			<div className={styles.filters}>
				<div>
					<p className={styles.filters__selectTitle}>
						Класс бронирования
					</p>
					<CustomSelect
						selected={selectedValue}
						options={classes}
						onChange={(e) => setSelectedClass(e)}
					/>
				</div>
				<div>
					<p className={styles.filters__selectTitle}>Вид графика</p>
					<ToggleSwitch
						leftLabel={"Сезонность\xa0спроса"}
						rightLabel={"Изменение\xa0бронирования"}
						leftActive={isSeasonTypeActive}
						onChange={handleTypeChange}
					/>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<XAxis dataKey="x" stroke="#4082F4" />
					<YAxis dataKey="y" />
					{seasons.map((season) => (
						<ReferenceArea
							key={season.name}
							x1={season.startIndex}
							x2={season.endIndex}
							y1={0}
							y2={45}
							fill={Math.floor(Math.random()*16777215).toString(16)}
							fillOpacity={0.8}
							label={season.name}
						/>
					))}
					<Tooltip />
					<Area
						type="monotone"
						dataKey="y"
						stroke="#4082F4"
						fill="#4082F4"
						fillOpacity={0.5}
						activeDot={{ r: 8 }}
					/>
					<Brush dataKey="date" height={40} stroke="#4082F4">
						<AreaChart data={data}>
							<Area
								type="monotone"
								dataKey="y"
								fill="#CADFF5"
								fillOpacity={1}
								strokeOpacity={0}
								activeDot={{ r: 8 }}
							/>
						</AreaChart>
					</Brush>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TaskTwo;
