/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { usePersistedState } from 'hooks/persisted-state';
import { createContext, useContext, useState } from 'react';
import { GROUPS } from './utils/groups';

type StepsNavigationContext = {
  groups: typeof GROUPS;
  percentages: {
    [key in keyof typeof GROUPS | 'total']?: number;
  };
  updateGroupPercentage: (group: keyof typeof GROUPS, value: string) => void;
};

const Context = createContext<StepsNavigationContext>({} as StepsNavigationContext);
export const usePercentages = (): StepsNavigationContext => useContext(Context);

export const PercentagesProvider: BTypes.FC<{}, {}, false> = ({ children }) => {
  const [percentages, setPercentages] = usePersistedState<{
    [key in keyof typeof GROUPS | 'total']?: number;
  }>('PERCENTAGES', {});
  const [valuesSum, setValuesSum] = usePersistedState<{
    [key in keyof typeof GROUPS | 'total']?: number;
  }>('GROUP_VALUES_SUM', {});

  const updateGroupPercentage: StepsNavigationContext['updateGroupPercentage'] = (
    group,
    value,
  ) => {
    const newGroupValue =
      value === 'true' ? (valuesSum[group] || 0) + 1 : (valuesSum[group] || 1) - 1;

    const newValuesSum = {
      ...valuesSum,
      [group]: newGroupValue,
      total:
        Object.values(valuesSum).reduce((acc, curr) => acc + curr, 0) -
        (valuesSum[group] || 0) +
        newGroupValue -
        (valuesSum.total || 0),
    };

    setValuesSum(newValuesSum);

    const inputsId = GROUPS[group];
    setPercentages((prev) => {
      const newPercentage = Math.floor(
        ((newValuesSum[group] || 0) / inputsId.length) * 100,
      );

      const allPercentagesValueSum = Object.entries(prev).reduce(
        (acc, [key, curr]) => (key !== 'total' && key !== group ? acc + curr : acc),
        0,
      );

      return {
        ...prev,
        [group]: newPercentage,
        total: Math.floor(
          (allPercentagesValueSum + newPercentage) / Object.keys(GROUPS).length,
        ),
      };
    });
  };

  return (
    <Context.Provider value={{ percentages, groups: GROUPS, updateGroupPercentage }}>
      {children}
    </Context.Provider>
  );
};
