import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ReactComponent as ArrowDown } from "../../shared/images/arrow-down.svg";
import styles from "./CustomSelect.module.scss";
import { Option, CustomOption } from "./CustomOption/CustomOption";

type CustomSelectProps = {
	selected: Option | null;
	options: Option[];
	placeholder?: string;
	onChange?: (selected: Option["value"]) => void;
	onClose?: () => void;
};

export const CustomSelect = (props: CustomSelectProps) => {
	const { options, placeholder, selected, onChange, onClose } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isOpen, onClose]);

	const handleOptionClick = (value: Option["value"]) => {
		setIsOpen(false);
		onChange?.(value);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div
			className={styles.selectWrapper}
			ref={rootRef}
			data-is-active={isOpen}
		>
			<div className={styles.arrow}>
				<ArrowDown />
			</div>
			<div
				className={styles.placeholder}
				onClick={handlePlaceHolderClick}
				role="button"
				tabIndex={0}
			>
				{selected?.title || placeholder}
			</div>
			{isOpen && (
				<ul className={styles.select}>
					{options.map((option) => (
						<CustomOption
							key={option.value}
							option={option}
							onClick={handleOptionClick}
						/>
					))}
				</ul>
			)}
		</div>
	);
};
