import { SelectTag as Select } from "components/Select";
import { SelectOption } from "components/Select/SelectTag";

export const SelectTag = ({
	onValueChange,
	defaultValue,
	options,
	inputName,
	id,
	disabled,
}: {
	id: string;
	onValueChange: (v: SelectOption[]) => void;
	defaultValue?: SelectOption[];
	inputName: string;
	options?: SelectOption[];
	disabled?: boolean;
}) => {
	return (
		<div className="w-full flex">
			<Select
				onValueChange={onValueChange}
				defaultValue={defaultValue}
				id={id}
				options={options}
				disabled={disabled}
				required
			>
				<span className="text-lg text-primary">{inputName}</span>
			</Select>
		</div>
	);
};
