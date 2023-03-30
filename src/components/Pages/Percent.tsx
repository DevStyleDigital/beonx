'use client';

import colors from '@root/colors.json';
import { DoughnutChart } from 'components/DoughnutChart';
import { usePercentages } from 'contexts/Percentages';

export const Percent: BTypes.FC<{}, {}, false, false, false> = () => {
  const { percentages } = usePercentages();

  return (
    <div className="mt-2">
      <DoughnutChart.Root
        defaultPercent={percentages?.total || 0}
        textClassName="!text-primary"
        contentSize="2.2rem"
      >
        <DoughnutChart.Pie
          id="percent"
          color={colors.primary}
          percent={percentages?.total || 0}
          strokeWidth="0.875rem"
          backgroundColor={colors.gray[100]}
        />
      </DoughnutChart.Root>
    </div>
  );
};
