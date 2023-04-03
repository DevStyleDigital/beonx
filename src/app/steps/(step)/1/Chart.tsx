/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import colors from '@root/colors.json';
import { Chart as ChartComp } from 'components/Chart';
import { useSteps } from 'contexts/Steps';
import { useEffect, useState } from 'react';

const LABELS = [
  'Current Revenue',
  'RMS Rooms',
  'RMS F & B',
  'RMS Restaurant',
  'Revenue Retention',
  'Guest Messaging',
];

function getPercentOfRMS(
  percent: number,
  value: any,
  removePart: number,
): [number, 'add' | 'remove' | 'add-beonx'] {
  if (!value || !value.value) return [percent, 'add'];
  if (value?.value === 'beonx') return [0, 'remove'];
  if (value?.value) return [percent - removePart, 'add-beonx'];
  return [0, 'remove'];
}

function formatToCurrency(amount: number) {
  return amount
    .toFixed(2)
    .replace('.', ',')
    .replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

function getValueRms(validator: string, percentRms: number, decrement: number) {
  return validator !== 'remove'
    ? validator !== 'add-beonx'
      ? percentRms
      : percentRms - percentRms * decrement
    : 0;
}

export const Chart = () => {
  const { stepsValues, inputUpdated } = useSteps();
  const [data, setData] = useState([100, 0, 0, 0, 0, 0]);
  const [totalLose, setTotalLose] = useState<string | undefined>();
  const [values, setValues] = useState(['0', '0', '0', '0', '0', '0']);

  function getData() {
    const roomsNumber = stepsValues[1]?.['rooms-number']?.value
      ? Number(stepsValues[1]['rooms-number'].value as unknown as string)
      : 0;
    const adrValue = stepsValues[1]?.['adr']?.value as string | undefined;
    const adr = adrValue
      ? Number(adrValue.replaceAll(/[$\s.]/g, '').replace(',', '.'))
      : 0;
    const occupancy = stepsValues[1]?.['occupancy']?.value
      ? Number(
          (stepsValues[1]['occupancy'].value as unknown as string)
            .replace('%', '')
            .replace(',', '.'),
        )
      : 0;

    const currRevenue = ((roomsNumber * occupancy) / 100) * 365 * adr;

    const newData = [...data];
    const roomsMonetaryByOccupancy = getPercentOfRMS(
      20,
      stepsValues[1]?.['rms-rooms-system'],
      20 / 3,
    );
    const restaurantMonetaryByOccupancy = getPercentOfRMS(
      5,
      stepsValues[1]?.['rms-restaurant-system'],
      5 / 3,
    );
    const newDataValues = [
      roomsMonetaryByOccupancy[0],
      stepsValues[1]?.['rms-fb-system']?.value !== 'true' ? 10 : 0,
      restaurantMonetaryByOccupancy[0],
      stepsValues[1]?.['revenue-retention']?.value !== 'true' ? 10 : 0,
      stepsValues[1]?.['guest-messaging']?.value !== 'true' ? 5 : 0,
    ];

    const currRevenueLine = 100 - newDataValues.reduce((acc, curr) => acc + curr, 0);

    newData[0] = currRevenueLine;
    newData[1] = newDataValues[0] ? 100 - newDataValues[0] : 0;
    newData[2] = newDataValues[1] ? 100 - newDataValues[1] : 0;
    newData[3] = newDataValues[2] ? 100 - newDataValues[2] : 0;
    newData[4] = newDataValues[3] ? 100 - newDataValues[3] : 0;
    newData[5] = newDataValues[4] ? 100 - newDataValues[4] : 0;

    const valuesRms = [
      getValueRms(roomsMonetaryByOccupancy[1], 0.15 * currRevenue, 0.05),
      newData[2] ? 0.05 * currRevenue : 0,
      getValueRms(restaurantMonetaryByOccupancy[1], 0.05 * currRevenue, 0.05),
      newData[4] ? 0.1 * currRevenue : 0,
      newData[5] ? 0.03 * currRevenue : 0,
    ];

    const increase = valuesRms.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    const increaseMasked = `$ ${formatToCurrency(increase)}`;

    setTotalLose(increase ? increaseMasked : undefined);

    setValues([`$ ${formatToCurrency(currRevenue)}`, ...valuesRms.map(formatToCurrency)]);

    return newData;
  }

  useEffect(() => {
    if (
      !stepsValues ||
      !stepsValues?.[1] ||
      ![
        'adr',
        'occupancy',
        'rooms-number',
        'revenue-retention',
        'guest-messaging',
        'rms-implemented',
        'rms-rooms-system',
        'rms-fb-system',
        'rms-restaurant-system',
      ].includes(inputUpdated)
    )
      return () => {};

    return setData(getData());
  }, [stepsValues]);

  useEffect(() => setData(getData()), []);

  return (
    <div className="mr-8 lg:sticky max-lg:mb-10 flex flex-col items-center max-lg:w-full lg:top-24 w-1/2 h-80">
      <ChartComp
        data={data}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx: any) => {
                  const valueIndex = LABELS.indexOf(ctx.dataset.label);
                  return `Value of ${ctx.dataset.label}: ${values[valueIndex]}`;
                },
              },
            },
          },
        }}
        dataDatasets={{
          labels: ['Revenue', 'Potential Revenue'],
          datasets: [
            {
              backgroundColor: `${colors.orange}`,
              borderColor: `${colors.orange}`,
              label: 'Current Revenue',
              fill: true,
            },
            {
              backgroundColor: '#B7F6EA',
              borderColor: '#B7F6EA',
              label: 'RMS Rooms',
              fill: true,
            },
            {
              backgroundColor: '#93F1E0',
              borderColor: '#93F1E0',
              label: 'RMS F & B',
              fill: true,
            },
            {
              backgroundColor: '#5DEAD0',
              borderColor: '#5DEAD0',
              label: 'RMS Restaurant',
              fill: true,
            },
            {
              backgroundColor: '#26E3C0',
              borderColor: '#26E3C0',
              label: 'Revenue Retention',
              fill: true,
            },
            {
              backgroundColor: `${colors.green['100']}`,
              borderColor: `${colors.green['100']}`,
              label: 'Guest Messaging',
              fill: true,
            },
          ],
        }}
      />
      {totalLose && (
        <span className="text-xl font-bold mt-10">Increase Potential: {totalLose}</span>
      )}
    </div>
  );
};
