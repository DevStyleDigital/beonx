'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export type Dataset = {
  label: string;
  fill?: boolean;
  backgroundColor: string[];
  borderColor?: string[];
};

export const Chart: BTypes.FC<{
  options?: any;
  data: any[][];
  dataDatasets: {
    labels: any[];
    datasets: Dataset[];
  };
}> = ({ options = {}, data, dataDatasets }) => {
  return (
    <Doughnut
      className="!w-full !h-full"
      options={{
        maintainAspectRatio: false,
        ...options,
      }}
      data={{
        labels: dataDatasets.labels,
        datasets: dataDatasets.datasets.map((dataset, i) => ({
          ...dataset,
          data: data[i],
        })),
      }}
    />
  );
};
