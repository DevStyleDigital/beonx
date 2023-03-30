'use client';

import clsx from 'clsx';
import { Percent } from 'components/Pages/Percent';
import { StepsNavigation } from 'contexts/StepsNavigation/components';
import { usePathname } from 'next/navigation';

const STEPS = {
  '1': { name: 'Discover', step: 1 },
  '2': { name: 'Digitalization & Automation', step: 2 },
  '3': { name: 'Channel Strategy & Distribution', step: 3 },
  '4': { name: 'Pricing Strategy', step: 4 },
  '5': { name: 'Revenue Generation & Retention', step: 5 },
  '6': { name: 'Cost Optimization', step: 6 },
  '7': { name: 'Sustainability', step: 7 },
  '8': { name: 'Profitability Index', step: 8 },
};
const stepsWithoutChart = [1, 8];

export const Header = () => {
  const pathname = usePathname();
  const pathnameSplit = pathname!.split('/');
  const step = pathnameSplit[pathnameSplit.length - 1];

  const currStep = STEPS[step as '1'];

  return (
    <header className="flex max-xl:flex-col px-4 xl:justify-between sm:px-12">
      <div
        className={clsx('flex h-fit justify-center gap-4', {
          'max-[320px]:flex-col max-[320px]:items-center': !stepsWithoutChart.includes(
            currStep.step,
          ),
        })}
      >
        {!stepsWithoutChart.includes(currStep.step) && <Percent />}
        <div
          className={clsx('!max-w-[16rem] h-fit max-[320px]:text-center', {
            'max-xl:text-center': stepsWithoutChart.includes(currStep.step),
          })}
        >
          <span className="text-lg text-gray-600">{currStep.step}st Step</span>
          <h2 className="text-4xl max-[520px]:text-2xl font-sans font-black">
            {currStep.name}
          </h2>
        </div>
      </div>

      <StepsNavigation.Root className="xl:ml-8 mt-8 flex h-fit justify-center overflow-auto" />
    </header>
  );
};
