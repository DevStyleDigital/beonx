import colors from '@root/colors.json';
import { Input } from 'components/Input';

export const InputNumber = ({
  id,
  inputName,
  onValueChange,
  max,
  min,
  defaultValue,
  disabled,
}: {
  id: string;
  inputName: string;
  min?: number;
  max?: number;
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
        placeholder="Type here..."
        required
        type="number"
        name={id}
        max={max}
        min={min || 0}
        defaultValue={defaultValue}
        onBlur={({ target: { value } }) => onValueChange(value)}
      />
    </Input.Root>
  );
};
