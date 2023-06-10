import React, { useEffect } from "react";
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
	YAxis
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import ToggleSwitch from "../../../widgets/ToggleSwitch/ToggleSwitch";
import { TabOneData } from "../../../models/flights.interface";
import { useTaskTwoLogic } from "./TaskTwo.logic";

interface TaskTwoProps {
  classes: Option[];
  flight: string;
}

const TaskTwo = ({ classes, flight }: TaskTwoProps) => {
	const {
		fetchFlightHandler,
		handleChangeType,
		handleChangeClass,
		mx,
		tabParams,
		tabInfo
	} = useTaskTwoLogic({ flight });

	useEffect(() => {
		fetchFlightHandler({
			tab: 2,
			data: {
				flight: flight,
				tabParams: { class: classes[0].title, type: 0 }
			}
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
						selected={
							classes.find(
								(item) => item.title === tabParams.class
							) || null
						}
						options={classes}
						onChange={(e) =>
							handleChangeClass(
								classes.find((item) => item.value === e)
									?.title || ""
							)
						}
					/>
				</div>
				<div>
					<p className={styles.filters__selectTitle}>Вид графика</p>
					<ToggleSwitch
						leftLabel={"Сезонность\xa0спроса"}
						rightLabel={"Изменение\xa0бронирования"}
						leftActive={tabParams.type === 0}
						onChange={handleChangeType}
					/>
				</div>
			</div>
			{!(tabInfo as TabOneData)?.seasons?.length ? (
				<div className={styles.noData}>
          Нет данных для рейса с заданными параметрами
				</div>
			) : (
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={(tabInfo as TabOneData).data}>
						<XAxis dataKey="x" stroke="#4082F4" />
						<YAxis dataKey="y" />
						{((tabInfo as TabOneData)?.seasons || []).map((season) => (
							<>
								<ReferenceArea
									key={season.name}
									x1={season.left}
									x2={season.right}
									y1={0}
									y2={(Math.random() * (1.1 - 0.3) + 0.3) * mx}
									fill={"#" + Math.floor(
										Math.random() * 16777215
									).toString(16)}
									fillOpacity={0.3}
									label={season.name}
								/>
                asd
							</>
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
							<AreaChart data={(tabInfo as TabOneData).data}>
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
			)}
		</div>
	);
};

export default TaskTwo;
