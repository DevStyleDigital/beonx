'use client';

import colors from '@root/colors.json';
import { Checkbox } from '@mui/material';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import * as Icon from 'components/Icons';
import Select, { components, OptionProps } from 'react-select';
import { InputSkeleton } from 'components/InputSkeleton';

export type SelectOption = {
  value: string;
  label: string;
};

type InputOptionProps = OptionProps<SelectOption> & {
  getStyles: any;
  Icon: any;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  children: any;
  innerProps: any;
};

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: InputOptionProps) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = 'transparent';
  if (isFocused) bg = '#eee';
  if (isActive) bg = '#B2D4FF';

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex ',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <Checkbox
        checked={isSelected}
        sx={{
          color: colors.primary,
          '&.Mui-checked': {
            color: colors.primary,
          },
        }}
      />
      {children}
    </components.Option>
  );
};

type MultiSelectProps = {
  id: string;
  disabled?: boolean;
  required?: boolean;
  options?: SelectOption[];
  defaultValue?: SelectOption[];
  onValueChange?: (value: SelectOption[]) => void;
};

export const MultiSelect: BTypes.FC<MultiSelectProps, {}, false> = ({
  children,
  options: optionsProp,
  defaultValue,
  onValueChange,
  id,
  disabled,
  required,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-full">
      <label className="w-full h-full flex flex-col justify-between" htmlFor={id}>
        {children}
        {mounted && optionsProp ? (
          <Select
            defaultValue={defaultValue || []}
            isMulti
            inputId={id}
            isDisabled={disabled}
            required={required}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(options) =>
              onValueChange && onValueChange(options as SelectOption[])
            }
            className="select-tag !cursor-pointer relative z-50 outline-none"
            options={optionsProp}
            components={{
              Option: InputOption as any,
              IndicatorSeparator: null,
              DropdownIndicator: () => (
                <ChevronDownIcon className="w-4 h-4 mr-3 text-primary" />
              ),
              ClearIndicator: ({ clearValue }) => (
                <Icon.TrashIcon
                  onClick={clearValue}
                  className="w-4 h-4 text-gray-600 hover:text-primary mr-2 cursor-pointer"
                />
              ),
            }}
          />
        ) : (
          <InputSkeleton />
        )}
      </label>
    </div>
  );
};
