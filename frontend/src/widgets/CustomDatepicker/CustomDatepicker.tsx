import React from "react";
import styles from "./CustomDatepicker.module.scss";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

interface CustomDatepickerProps extends Partial<ReactDatePickerProps> {
	date: Date | null;
	setDate: (x: Date | null) => void;
}

const CustomDatepicker = ({
	date,
	setDate,
	...props
}: CustomDatepickerProps) => {
	const ReactDatePickerInput = React.forwardRef<
		HTMLInputElement,
		React.DetailedHTMLProps<
			React.InputHTMLAttributes<HTMLInputElement>,
			HTMLInputElement
		>
	>((props, ref) => <input ref={ref} {...props} />);

	ReactDatePickerInput.displayName = "ReactDatePickerInput";

	return (
		<DatePicker
			{...props}
			selected={date}
			customInput={
				<ReactDatePickerInput className={styles.input} />
			}
			onChange={(date: Date | null) => setDate(date)}
			includeDates={[new Date()]}
			wrapperClassName={styles.item}
		/>
	);
};

export default CustomDatepicker;
