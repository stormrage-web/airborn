import React, { useEffect, useState } from "react";
import styles from "./TaskThree.module.scss";
import { CustomSelect } from "../../../widgets/CustomSelect/CustomSelect";
import {
	Area,
	AreaChart,
	Brush,
	Line,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Option } from "../../../widgets/CustomSelect/CustomOption/CustomOption";
import { graph2 } from "../../../shared/mocks/graph2";
import CustomCheckbox from "../../../widgets/CustomCheckbox/CustomCheckbox";
import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { TabThreeItem } from "../../../store/reducers/FlightSlice";

const data = graph2;

interface TaskThreeProps {
	classes: Option[];
	flight: string;
}

const TaskThree = ({ classes, flight }: TaskThreeProps) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer,
	);
	const [graph, setGraph] = useState<any[]>([]);

	useEffect(() => {
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					class: classes[0].title,
					date: undefined,
					type: undefined,
					profiles: [false, false, false, false],
				},
			},
		});
	}, []);

	useEffect(() => {
		const result: any[] = [];
		(tabInfo as TabThreeItem[]).forEach((profile) => {
			profile.data.forEach((item) => {
				const obj = { x: item.x };
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				obj[profile.title] = item.y;
				result.push(obj);
			});
		});
		setGraph(result);
	}, [tabInfo]);

	const handleChangeClass = (x: string) => {
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					profiles: tabParams.profiles,
					class: x,
				},
			},
		});
	};

	const handleChangeProfile = (n: number) => (x: boolean) => {
		const profiles = [...(tabParams.profiles || [])];
		profiles[n] = x;
		console.log(profiles);
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					profiles: profiles,
					class: tabParams.class,
				},
			},
		});
	};

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
				<div>
					<p className={styles.filters__selectTitle}>
						Профили спроса
					</p>
					<div className={styles.filters__checkboxesWrapper}>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[0]}
							setActive={handleChangeProfile(0)}
							color={"#E38048"}
						>
							Отдых
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[1]}
							setActive={handleChangeProfile(1)}
							color={"#4082F4"}
						>
							Бизнес/командировки
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[2]}
							setActive={handleChangeProfile(2)}
							color={"#E3485B"}
						>
							Спонтанное
						</CustomCheckbox>
						<CustomCheckbox
							active={(tabParams?.profiles || [])[3]}
							setActive={handleChangeProfile(3)}
							color={"#33B15E"}
						>
							Заранее&nbsp;запланированное
						</CustomCheckbox>
					</div>
				</div>
			</div>
			{!(tabInfo as TabThreeItem[]).length ? (
				<div className={styles.noData}>
					Нет данных для рейса с заданными параметрами
				</div>
			) : (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={graph}>
						<XAxis dataKey="date" stroke="#4082F4" />
						<YAxis dataKey="value" />
						<ReferenceArea
							x1={"07.06.2018"}
							x2={"24.07.2018"}
							y1={0}
							y2={45}
							fill="#000"
							fillOpacity={0.3}
							label="zone 1"
						/>
						<ReferenceArea
							x1={"24.07.2018"}
							x2={"24.09.2018"}
							y1={0}
							y2={30}
							fill="#421"
							fillOpacity={0.3}
							label="zone 2"
						/>
						<Tooltip />
						{graph.map((item) => (
							<Line
								key={item.title}
								type="monotone"
								dataKey={item.title}
								stroke="#4082F4"
								activeDot={{ r: 5 }}
							/>
						))}

						<Brush dataKey="date" height={40} stroke="#4082F4">
							<AreaChart data={data}>
								<Area
									type="monotone"
									dataKey="value"
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

export default TaskThree;
