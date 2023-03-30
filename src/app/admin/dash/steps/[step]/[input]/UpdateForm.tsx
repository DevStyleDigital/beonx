'use client';
import colors from '@root/colors.json';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Select } from 'components/Pages/Inputs/Select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { http } from 'services/http';
import { InputType, Option } from 'types/supabase';
import { AddOptions } from './AddOptions';

export const UpdateForm = ({ input }: { input: InputType }) => {
  const router = useRouter();
  const [inputType, setInputType] = useState(input.type);
  const [inputSize, setInputSize] = useState(input.size);
  const [newOptions, setNewOptions] = useState<Option[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setSubmitting(true);

    const updatedValues = {
      type: undefined as undefined | InputType['type'],
      size: undefined as undefined | InputType['size'],
      options: undefined as undefined | Option[],
    };

    if (inputType !== input.type) updatedValues.type = inputType;
    if (inputSize !== input.size) updatedValues.size = inputSize;
    if (newOptions && inputType !== 'boolean' && newOptions !== input.options)
      updatedValues.options = newOptions;

    http
      .put(`/api/inputs/${input.id}`, updatedValues)
      .then((res) => {
        alert('Input updated successfully');
        router.push(`/admin/dash/steps/${input.step}`);
        return res;
      })
      .catch(() => {
        alert(
          'Ops... Ocurred one error on create/update the input.\nPlease try again more late.',
        );
        return '';
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="font-bold text-xl">{input.input_name}</h1>
      <div className="flex flex-wrap mt-10 gap-4 items-end">
        <div className="w-full gap-8 max-md:w-full flex">
          <Select
            defaultValue={inputType}
            inputName="Input type"
            onValueChange={(value) => setInputType(value as 'select')}
            options={[
              { label: 'Tag', value: 'select-tag' },
              { label: 'Yes / No', value: 'boolean' },
              { label: 'Default', value: 'select' },
            ]}
          />
          {/* {inputType === 'boolean' && (
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
                defaultValue={inputSize}
                onChange={(ev) => setInputSize(Number(ev.target.value))}
              />
            </Input.Root>
          )} */}
        </div>
        {inputType !== 'boolean' && (
          <AddOptions
            input={input}
            onOptionsChange={(options) => setNewOptions(options)}
          />
        )}
        <Button.Root
          size="fit"
          type="submit"
          className="uppercase block text-end mt-4"
          disabled={submitting}
        >
          {submitting ? <Button.Spin /> : 'Update input'}
        </Button.Root>
      </div>
    </form>
  );
};
