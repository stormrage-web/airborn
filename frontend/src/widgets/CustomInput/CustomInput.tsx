import React, { ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";

type CustomSelectProps = {
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
};

export const CustomInput = ({value, placeholder, onChange}: CustomSelectProps) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

	return (
		<input type="text" onChange={handleOnChange} placeholder={placeholder} value={value} className={styles.input}/>
	);
};
