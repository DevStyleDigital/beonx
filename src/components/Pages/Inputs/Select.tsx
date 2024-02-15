import colors from "@root/colors.json";
import { Select as SelectDefault } from "components/Select";

export const Select = ({
	onValueChange,
	defaultValue,
	inputName,
	options,
	disabled,
}: {
	onValueChange: (v: string) => void;
	defaultValue?: string;
	inputName: string;
	options?: { label: string; value: string }[];
	disabled?: boolean;
}) => {
	const inputNameComp = (
		<span className="text-lg text-left text-primary">{inputName}</span>
	);

	return (
		<SelectDefault.Root
			color={colors.primary}
			onValueChange={onValueChange}
			defaultValue={defaultValue}
			disabled={disabled}
			inputName={inputNameComp}
			required
		>
			<SelectDefault.Trigger placeholder="Select...">
				{inputNameComp}
			</SelectDefault.Trigger>
			<SelectDefault.Portal>
				{options?.map((option) => (
					<SelectDefault.Option value={option.value} key={option.value}>
						{option.label}
					</SelectDefault.Option>
				))}
			</SelectDefault.Portal>
		</SelectDefault.Root>
	);
};
