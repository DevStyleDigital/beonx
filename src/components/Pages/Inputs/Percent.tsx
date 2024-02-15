"use client";
import colors from "@root/colors.json";
import { Input } from "components/Input";
import { InputSkeleton } from "components/InputSkeleton";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export const InputPercent = ({
	id,
	inputName,
	onValueChange,
	defaultValue,
	disabled,
}: {
	id: string;
	inputName: string;
	onValueChange: (v: string) => void;
	defaultValue?: string;
	disabled?: boolean;
}) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return (
		<Input.Root
			className="w-full flex flex-col h-full justify-between"
			borderColor={colors.primary}
			disabled={disabled}
			id={id}
		>
			<Input.Label className="block h-max">{inputName}</Input.Label>
			{mounted ? (
				<NumericFormat
					decimalSeparator={","}
					decimalScale={2}
					className="input-default"
					placeholder="Type here (20%)..."
					required
					name={id}
					isAllowed={({ floatValue }) =>
						(floatValue || 0) < 101 && (floatValue || 0) >= 0
					}
					suffix="%"
					defaultValue={defaultValue}
					onBlur={({ target: { value } }) => {
						onValueChange(value);
					}}
				/>
			) : (
				<InputSkeleton />
			)}
		</Input.Root>
	);
};
