import React, { MouseEventHandler } from "react";
import styles from "./CustomOption.module.scss";

export type Option = {
	title: string;
	value: string;
};

type OptionProps = {
	option: Option;
	onClick: (value: Option["value"]) => void;
};

export const CustomOption = (props: OptionProps) => {
	const {
		option: { value, title },
		onClick,
	} = props;

	const handleClick =
		(
			clickedValue: Option["value"],
		): MouseEventHandler<HTMLLIElement> =>
			() => {
				onClick(clickedValue);
			};

	return (
		<li
			className={styles.option}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
		>
			{title}
		</li>
	);
};
