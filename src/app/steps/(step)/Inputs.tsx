'use client';
import { usePercentages } from 'contexts/Percentages';
import { useSteps } from 'contexts/Steps';
import { InputType } from 'types/supabase';
import { INPUTS_COMPONENTS } from './InputsComponents';
import { SelectOption } from 'components/Select/SelectTag';

export const Inputs = ({
  inputs,
  step,
  inputsOrder,
  stepByStep,
}: {
  inputs: (Omit<InputType, 'step'> & { min?: number; max?: number })[];
  step: string;
  inputsOrder: string[];
  stepByStep?: boolean;
}) => {
  const { stepsValues, setStepsValues, setInputUpdated } =
    useSteps<typeof inputsOrder[number]>();
  const { updateGroupPercentage, groups } = usePercentages();

  return (
    <>
      {(inputs as (Omit<InputType, 'step'> & { min?: number; max?: number })[])
        .sort(
          (inputA, inputB) =>
            inputsOrder.indexOf(inputA.id) - inputsOrder.indexOf(inputB.id),
        )
        .map((input, i, arr) => {
          const lastInputId = arr[i - 1]?.id;
          const Comp = INPUTS_COMPONENTS[input.type as keyof typeof INPUTS_COMPONENTS];

          return (
            <Comp
              key={input.id}
              id={input.id}
              inputName={input.input_name}
              options={input.options}
              min={input.min}
              max={input.max}
              disabled={
                stepByStep && i !== 0 && !stepsValues?.[step]?.[lastInputId]?.value
              }
              defaultValue={stepsValues?.[step]?.[input.id]?.value as any}
              onValueChange={(value) => {
                if (input.type === 'select-tag') {
                  const noOptionIndex = (value as SelectOption[]).findIndex(
                    ({ label }) => label === 'No',
                  );
                  if (noOptionIndex !== -1 && noOptionIndex === value.length - 1)
                    value = [value[noOptionIndex]] as SelectOption[];
                  else if (noOptionIndex !== -1 && noOptionIndex !== value.length - 1) {
                    (value as SelectOption[]).splice(noOptionIndex, 1);
                  }
                }
                setInputUpdated(input.id);
                setStepsValues((prev) => ({
                  ...(prev || {}),
                  [step as '1']: {
                    ...(prev?.[step] || {}),
                    [input.id]: {
                      value: value as string,
                      type: input.type,
                      maxOptions: input.options?.length,
                    },
                  },
                }));

                if (input.type !== 'boolean') return;
                const groupsWithoutKey = Object.values(groups);
                const groupsKey = Object.keys(groups) as (keyof typeof groups)[];
                let group;
                for (let i = 0; i < groupsWithoutKey.length; i++) {
                  if (groupsWithoutKey[i].includes(input.id)) {
                    group = groupsKey[i];
                    break;
                  }
                }
                if (!group) return;
                updateGroupPercentage(group, value as string);
              }}
            />
          );
        })}
    </>
  );
};
