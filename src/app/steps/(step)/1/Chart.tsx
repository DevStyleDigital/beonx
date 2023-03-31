/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import colors from '@root/colors.json';
import { Chart as ChartComp, type Dataset } from 'components/Chart';
import { useSteps } from 'contexts/Steps';
import { useEffect, useState } from 'react';
import { maskToCurrency } from 'utils/format-to-currency';

const LABELS = [
  'Current Revenue',
  'RMS Rooms',
  'RMS F & B',
  'RMS Restaurant',
  'RMS Experience',
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
  const [data, setData] = useState([[100, 0, 0, 0, 0, 0, 0]]);
  const [totalLose, setTotalLose] = useState<string | undefined>();
  const [values, setValues] = useState(['0', '0', '0', '0', '0', '0', '0']);

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

    const newData = [...data[0]];
    const roomsMonetaryByOccupancy = getPercentOfRMS(
      20,
      stepsValues[1]?.['rms-rooms-system'],
      20 / 3,
    );
    const fbMonetaryByOccupancy = getPercentOfRMS(
      10,
      stepsValues[1]?.['rms-fb-system'],
      10 / 3,
    );
    const expMonetaryByOccupancy = getPercentOfRMS(
      5,
      stepsValues[1]?.['rms-experience-system'],
      5 / 3,
    );

    newData[0] = 100;
    newData[1] = roomsMonetaryByOccupancy[0];
    newData[2] = fbMonetaryByOccupancy[0];
    newData[3] = stepsValues[1]?.['rms-restaurant-system']?.value !== 'true' ? 10 : 0;
    newData[4] = expMonetaryByOccupancy[0];
    newData[5] = stepsValues[1]?.['revenue-retention']?.value !== 'true' ? 10 : 0;
    newData[6] = stepsValues[1]?.['guest-messaging']?.value !== 'true' ? 5 : 0;

    const valuesRms = [
      getValueRms(roomsMonetaryByOccupancy[1], 0.15 * currRevenue, 0.05),
      getValueRms(fbMonetaryByOccupancy[1], 0.05 * currRevenue, 0.05),
      newData[4] ? 0.05 * currRevenue : 0,
      getValueRms(expMonetaryByOccupancy[1], 0.03 * currRevenue, 0.05),
      newData[5] ? 0.1 * currRevenue : 0,
      newData[6] ? 0.03 * currRevenue : 0,
    ];

    const increase = valuesRms.reduce((acc, curr, i) => {
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

    return setData([getData()]);
  }, [stepsValues]);

  useEffect(() => setData([getData()]), []);

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
                  const valueIndex = LABELS.indexOf(ctx.label);
                  return `Value of: ${values[valueIndex]}`;
                },
              },
            },
          },
        }}
        dataDatasets={{
          labels: LABELS,
          datasets: [
            {
              backgroundColor: [
                colors.orange,
                '#B7F6EA',
                '#93F1E0',
                '#5DEAD0',
                '#26E3C0',
                colors.green['100'],
                '#009f81',
              ],
              borderColor: [
                `${colors.orange}00`,
                '#B7F6EA' + '00',
                '#93F1E0' + '00',
                '#5DEAD0' + '00',
                '#26E3C0' + '00',
                `${colors.green['100']}00`,
                '#009f81' + '00',
              ],
              label: 'Value in %',
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
