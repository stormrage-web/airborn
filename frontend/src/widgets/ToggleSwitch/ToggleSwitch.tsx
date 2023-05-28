import React from "react";
import styles from "./ToggleSwitch.module.scss";

interface ToggleSwitchProps {
	leftLabel: string;
	rightLabel: string;
	leftActive: boolean;
	onChange: (x: boolean) => void;
}

const ToggleSwitch = ({
	leftActive,
	leftLabel,
	rightLabel,
	onChange,
}: ToggleSwitchProps) => {
	return (
		<div className={styles.wrapper}>
			<input
				type="radio"
				id="pricing-toggle-monthly"
				name="pricing"
				value="monthly"
				checked={leftActive}
				onClick={() => onChange(true)}
			/>
			<label className={styles.label} htmlFor="pricing-toggle-monthly">
				{leftLabel}
			</label>

			<input
				type="radio"
				id="pricing-toggle-annually"
				name="pricing"
				value="annually"
				checked={!leftActive}
				onClick={() => onChange(false)}
			/>
			<label className={styles.label} htmlFor="pricing-toggle-annually">
				{rightLabel}
			</label>
		</div>
	);
};

export default ToggleSwitch;
