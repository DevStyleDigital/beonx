import colors from "@root/colors.json";
import { Select } from "components/Select";

export const SelectBoolean = ({
	onValueChange,
	defaultValue,
	inputName,
	disabled,
}: {
	onValueChange: (v: string) => void;
	defaultValue?: string;
	inputName: string;
	disabled?: boolean;
}) => {
	const inputNameComp = (
		<span className="text-lg text-left text-primary">{inputName}</span>
	);

	return (
		<Select.Root
			color={colors.primary}
			onValueChange={onValueChange}
			defaultValue={defaultValue}
			disabled={disabled}
			inputName={inputNameComp}
			required
		>
			<Select.Trigger placeholder="Select..." className="h-full">
				{inputNameComp}
			</Select.Trigger>
			<Select.Portal>
				<Select.Option value="true">Yes</Select.Option>
				<Select.Option value="false">No</Select.Option>
			</Select.Portal>
		</Select.Root>
	);
};
