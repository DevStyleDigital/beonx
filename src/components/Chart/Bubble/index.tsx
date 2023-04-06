'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export type ChartData = {
  x: number;
  y: number;
  r: number;
};
export type Dataset = {
  label: string;
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  xAxisID?: string;
  yAxisID?: string;
};

export const BubbleChart: BTypes.FC<{
  options?: any;
  data: ChartData[][];
  dataDatasets: {
    labels: any[];
    datasets: Dataset[];
  };
}> = ({ options = {}, data, dataDatasets }) => {
  return (
    <Bubble
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              suggestedMin: 0,
              suggestedMax: 0,
              max: 1,
              scaleLabel: {
                display: true,
                labelString: 'Ability to Execute',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
          xAxes: [
            {
              id: 'x-axis-1',
              suggestedMin: 0,
              suggestedMax: 0,
              max: 1,
              scaleLabel: {
                display: true,
                labelString: 'Guest Retention',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
            {
              id: 'x-axis-2',
              position: 'top',
              suggestedMin: 0,
              suggestedMax: 0,
              max: 1,
              scaleLabel: {
                display: true,
                labelString: 'Guest Retention',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
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
