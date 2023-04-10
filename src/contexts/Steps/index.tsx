'use client';

import { SelectOption } from 'components/Select/SelectTag';
import { usePersistedStepsValues } from 'hooks/use-persisted-steps-values';
import { createContext, useContext, useState } from 'react';

export type StepInputs<T extends string> = {
  [key in T]?:
    | { value: string | SelectOption[] | undefined; maxOptions?: number; type: string }
    | undefined;
};

type StepsNavigationContext<T extends string> = {
  stepsValues: {
    [key: string]: StepInputs<T>;
  };
  setStepsValues: React.Dispatch<
    React.SetStateAction<StepsNavigationContext<T>['stepsValues']>
  >;
  errors: { [key in string]?: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key in string]?: string }>>;
  inputUpdated: string;
  setInputUpdated: React.Dispatch<React.SetStateAction<string>>;
};

const Context = createContext<StepsNavigationContext<'1'>>(
  {} as StepsNavigationContext<'1'>,
);
export const useSteps = <T extends string>(): StepsNavigationContext<T> =>
  useContext(Context);

export const StepsProvider: BTypes.FC<{}, {}, false> = ({ children }) => {
  const [stepsValues, setStepsValues] = usePersistedStepsValues<'1', any>();
  const [errors, setErrors] = useState();
  const [inputUpdated, setInputUpdated] = useState('');

  return (
    <Context.Provider
      value={
        {
          stepsValues,
          setStepsValues,
          inputUpdated,
          setInputUpdated,
          errors,
          setErrors,
        } as any
      }
    >
      {children}
    </Context.Provider>
  );
};
