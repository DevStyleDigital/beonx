'use client';
import colors from '@root/colors.json';
import { Button } from 'components/Button';
import { AddIcon, TrashIcon } from 'components/Icons';
import { Input } from 'components/Input';
import { useEffect, useState } from 'react';
import { InputType, Option } from 'types/supabase';

export const AddOptions = ({
  input,
  onOptionsChange,
}: {
  input: InputType;
  onOptionsChange: (options: Option[]) => void;
}) => {
  const [selectOptions, setSelectOptions] = useState<Option[]>(
    input?.options
      ? [...input.options]
      : [{ value: Date.now().toString(), label: '', size: 0 }],
  );

  useEffect(() => {
    onOptionsChange(selectOptions);
  }, [selectOptions, onOptionsChange]);

  return (
    <div className="flex flex-col w-full items-end">
      <h3 className="text-lg font-medium w-full text-gray-400">Options:</h3>

      {selectOptions.map((option, i) => (
        <div className="flex w-full gap-4" key={option.value}>
          <Input.Root id="option_name" borderColor={colors.primary} className="w-full">
            <Input.Label>Option Name</Input.Label>
            <Input.Input
              placeholder="Edit my name"
              name="option_name"
              required
              defaultValue={option.label}
              onChange={(ev) =>
                setSelectOptions((prev) => {
                  prev[i].label = ev.target.value;
                  return prev;
                })
              }
            />
          </Input.Root>
          <Input.Root borderColor={colors.primary} id="option_size" className="w-full">
            <Input.Label>
              Option Size:{' '}
              <span className="text-xs text-gray-600">
                Obs. The value is in percentage (%)
              </span>
            </Input.Label>
            <Input.Input
              type="number"
              name="option_size"
              placeholder="Option Size"
              max={100}
              min={0}
              required
              defaultValue={option.size}
              onChange={(ev) =>
                setSelectOptions((prev) => {
                  prev[i].size = Number(ev.target.value);
                  return prev;
                })
              }
            />
          </Input.Root>
          <Button.Root
            size="fit"
            type="button"
            className="mt-4"
            aria-label="Delete cel"
            disabled={selectOptions.length < 2}
            onClick={() =>
              setSelectOptions((prev) => {
                const newOptions = [...prev];
                for (let j = 0; j < newOptions.length; j++) {
                  if (newOptions[j].value === option.value) {
                    newOptions.splice(j, 1);
                    break;
                  }
                }
                return newOptions;
              })
            }
          >
            <TrashIcon />
          </Button.Root>
        </div>
      ))}
      <Button.Root
        size="fit"
        type="button"
        className="mt-4"
        aria-label="Add new cel"
        onClick={() =>
          setSelectOptions((prev) => [
            ...prev,
            { value: Date.now().toString(), label: '', size: 0 },
          ])
        }
      >
        <AddIcon />
      </Button.Root>
    </div>
  );
};
