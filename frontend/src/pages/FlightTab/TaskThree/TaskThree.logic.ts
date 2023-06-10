import { useTabsLogic } from "../../../hooks/useFlight.logic";
import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { TabThreeItem } from "../../../models/flights.interface";

export const useTaskThreeLogic = ({ flight }: { flight: string }) => {
	const { fetchFlightHandler } = useTabsLogic();
	const { tabInfo, tabParams } = useAppSelector(
		(state) => state.flightReducer
	);
	const [graph, setGraph] = useState<any[]>();
	const [maxTitle, setMaxTitle] = useState({ title: "отдых", value: 0 });

	useEffect(() => {
		const result: any[] = [];
		((tabInfo as TabThreeItem[])?.length
			? (tabInfo as TabThreeItem[]) || []
			: []
		).forEach((profile) => {
			(profile.data || []).forEach((item) => {
				const buf = result.findIndex(
					(resultItem) => resultItem.x === item.x
				);
				if (buf !== -1) {
					result[buf][profile.title] = item.y;
					if (item.y >= maxTitle.value) {
						setMaxTitle({ title: profile.title, value: item.y });
					}
				} else {
					const obj = { x: item.x };
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					obj[profile.title] = item.y;
					if (item.y >= maxTitle.value) {
						setMaxTitle({ title: profile.title, value: item.y });
					}
					result.push(obj);
				}
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
					class: x
				}
			}
		});
	};

	const handleChangeProfile = (n: number) => (x: boolean) => {
		const profiles = [...(tabParams.profiles || [])];
		profiles[n] = x;
		fetchFlightHandler({
			tab: 3,
			data: {
				flight: flight,
				tabParams: {
					profiles: profiles,
					class: tabParams.class
				}
			}
		});
	};

	return { handleChangeClass, handleChangeProfile, graph, maxTitle, tabParams, fetchFlightHandler };
};
