import colors from "@root/colors.json";
import { Input } from "components/Input";
import { maskToCurrency } from "utils/format-to-currency";

export const InputCurrency = ({
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
	return (
		<Input.Root
			className="w-full flex flex-col h-full justify-between"
			borderColor={colors.primary}
			disabled={disabled}
			id={id}
		>
			<Input.Label className="block h-max">{inputName}</Input.Label>
			<Input.Input
				placeholder="Type here ($ 220,20)..."
				required
				name={id}
				defaultValue={defaultValue}
				beforeMaskedStateChange={maskToCurrency}
				mask="$ 9999999"
				maskChar=""
				onBlur={({ target: { value } }) => onValueChange(value)}
			/>
		</Input.Root>
	);
};
