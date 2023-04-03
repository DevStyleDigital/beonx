import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export type Dataset = {
  label: string;
  fill?: boolean;
  backgroundColor: string;
  borderColor?: string;
};

export const Chart: BTypes.FC<{
  options?: any;
  data: any[];
  dataDatasets: {
    labels: any[];
    datasets: Dataset[];
  };
}> = ({ options = {}, data, dataDatasets }) => {
  return (
    <Line
      className="!w-full !h-full"
      options={{
        maintainAspectRatio: false,
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
        ...options,
      }}
      data={{
        labels: dataDatasets.labels,
        datasets: dataDatasets.datasets.map((dataset, i) => ({
          ...dataset,
          data: [data[i], data[i]],
        })),
      }}
    />
  );
};
