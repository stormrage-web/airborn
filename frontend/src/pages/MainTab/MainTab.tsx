import React, { useState } from "react";
import styles from "./MainTab.module.scss";
import { CustomSelect } from "../../widgets/CustomSelect/CustomSelect";
import { Option } from "../../widgets/CustomSelect/CustomOption/CustomOption";
import { CustomInput } from "../../widgets/CustomInput/CustomInput";
import FlightsTable from "../../widgets/FlightsTable/FlightsTable";
import { Flight } from "../../shared/mocks/flights";

const optionsList: Option[] = [
	{
		value: "0",
		title: "AER  - SVO ",
	},
	{
		value: "1",
		title: "SVO  - ASF ",
	},
	{
		value: "3",
		title: "SVO  - AER ",
	},
	{
		value: "4",
		title: "ASF  - SVO ",
	},
];

interface MainTabProps {
	flights: Flight[];
}

const MainTab = ({flights}: MainTabProps) => {
	const [selectValue, setSelectedValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const handleValueSelect = (value: string) => setSelectedValue(value);

	const selectedValue =
		optionsList.find((item) => item.value === selectValue) || null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<CustomSelect
					selected={selectedValue}
					options={optionsList}
					onChange={handleValueSelect}
					placeholder="Не выбрано"
				/>
				<CustomInput value={searchValue} onChange={setSearchValue} placeholder="Поиск по рейсу"/>
			</div>
			<FlightsTable search={searchValue} direction={selectedValue?.title || ""} flights={flights}/>
		</div>
	);
};

export default MainTab;
