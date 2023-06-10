import React, { useEffect } from "react";
import styles from "./TaskFour.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Brush,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import { useTaskFourLogic } from "./TaskFour.logic";
import CustomDatepicker from "../../../widgets/CustomDatepicker/CustomDatepicker";

interface TaskThreeProps {
	classes: Option[];
	flight: string;
}

const TaskFour = ({ classes, flight }: TaskThreeProps) => {
	const {
		tabParams,
		handleChangeClass,
		graph,
		fetchFlightHandler,
		handleChangeDate,
		formatDate
	} = useTaskFourLogic({ flight });

	useEffect(() => {
		fetchFlightHandler({
			tab: 4,
			data: {
				flight: flight,
				tabParams: {
					class: classes[0].title,
					start_date: "01.01.2018",
					prediction_depth: 1,
				},
			},
		});
	}, []);

	return (
		<div>
			<div className={styles.filters}>
				<div>
					<p className={styles.filters__selectTitle}>
						Дата бронирования
					</p>
					<CustomDatepicker
						date={
							new Date(formatDate(tabParams.date || "04.03.2019"))
						}
						setDate={handleChangeDate}
					/>
				</div>
				<div>
					<p className={styles.filters__selectTitle}>
						Класс бронирования
					</p>
					<CustomSelect
						selected={
							classes.find(
								(item) => item.title === tabParams.class,
							) || null
						}
						options={classes}
						onChange={(e) =>
							handleChangeClass(
								classes.find((item) => item.value === e)
									?.title || "",
							)
						}
					/>
				</div>
			</div>
			{!(graph || []).length ? (
				<div className={styles.noData}>
					Нет данных для рейса с заданными параметрами
				</div>
			) : (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={graph}>
						<XAxis dataKey="date" stroke="#4082F4" />
						<YAxis dataKey="prediction" />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="prediction"
							stroke="#4082F4"
							activeDot={{ r: 5 }}
							dot={{ r: 0 }}
							isAnimationActive={false}
						/>
						<Brush dataKey="date" height={40} stroke="#4082F4">
							<AreaChart data={graph}>
								<Area
									type="monotone"
									dataKey="отдых"
									fill="#CADFF5"
									fillOpacity={1}
									strokeOpacity={0}
								/>
							</AreaChart>
						</Brush>
					</LineChart>
				</ResponsiveContainer>
			)}
		</div>
	);
};

export default TaskFour;
