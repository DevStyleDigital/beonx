'use client';

import { usePersistedState } from 'hooks/persisted-state';
import { cookies } from 'services/cookies';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { removeDuplicatesFromArray } from 'utils/remove-duplicates-from-array';
import { getTimeByString } from 'utils/get-time-by-string';

export const STEPS_STORAGE_KEY = 'STEPS_STORAGE';
export const COMPLETED_STEPS_KEY = 'COMPLETED_STEPS';
export const PERCENTAGES_KEY = 'PERCENTAGES_STEPS';
export const CURR_STEP_KEY = 'CURR_STEP';
export const STEP1_CHART_KEY = 'STEP1_CHART';

type StepsNavigationContext = {
  next: () => void;
  prev: () => void;
  thisStep: number;
  currStep: number;
  stepsCompleted: number[];
};

const Context = createContext<StepsNavigationContext>({} as StepsNavigationContext);
export const useStepsNavigation = () => useContext(Context);

export const StepsNavigationProvider: BTypes.FC<{}, {}, false> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const getStepByRoute = useCallback(() => {
    const step = pathname?.replace('steps/', '');
    return step && Number(step.replace('/', ''));
  }, [pathname]);

  const [thisStep, setThisStep] = useState(getStepByRoute() || 1);
  const [currStep, setCurrStep] = usePersistedState(CURR_STEP_KEY, 1);
  const [stepsCompleted, setStepsCompleted] = usePersistedState<number[]>(
    COMPLETED_STEPS_KEY,
    [],
  );

  function next() {
    setStepsCompleted((prev) => removeDuplicatesFromArray([...prev, thisStep]));
    setThisStep(thisStep + 1);

    if (currStep <= thisStep) {
      setCurrStep(thisStep + 1);
      cookies.set('_CURR_STEP', `${thisStep + 1}`, {
        maxAge: getTimeByString('1y'),
        path: '/',
      });
    }

    router.push(`steps/${thisStep + 1}`);
  }

  function prev() {
    setThisStep(thisStep - 1);
    router.push(`steps/${thisStep - 1}`);
  }

  useEffect(() => {
    setThisStep(getStepByRoute() || 1);
  }, [pathname, getStepByRoute]);

  return (
    <Context.Provider
      value={{
        next,
        prev,
        thisStep,
        currStep,
        stepsCompleted,
      }}
    >
      {children}
    </Context.Provider>
  );
};
