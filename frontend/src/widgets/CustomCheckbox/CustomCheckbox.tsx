import React  from "react";
import styles from "./CustomCheckbox.module.scss";

const CustomCheckbox: React.FC<{ children: string, color?: string, active: boolean, setActive: (x: boolean) => void }> = ({ children, color, active, setActive }) => {

	return (
		<div onClick={() => setActive(!active)} className={styles.wrapper}>
			<input
				checked={active}
				type="checkbox"
				className={styles.customCheckbox}
			/>
			<label className={styles.label} style={{color}}>{children}</label>
		</div>
	);
};

export default CustomCheckbox;
