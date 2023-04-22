/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { BubbleChart, ChartData } from 'components/Chart/Bubble';
import { bubbles } from './bubbles-data';
import { useEffect, useState } from 'react';
import { useSteps } from 'contexts/Steps';
import { INPUTS_ID } from './InputsId';

export const Bubbles = () => {
  const { inputUpdated, stepsValues } = useSteps();

  const [bubblesData, setBubblesData] = useState<ChartData[]>([]);

  function handleBubblesData(data: { [key: string]: Omit<ChartData, 'id'> }) {
    setBubblesData(
      Object.entries(bubbles).map(([key, value]) => ({
        ...value,
        id: key,
      })),
    );
  }

  useEffect(() => {
    if (!INPUTS_ID.includes(inputUpdated)) return;
    if (bubbles[inputUpdated] && stepsValues?.[2]?.[inputUpdated]?.value)
      bubbles[inputUpdated].visible = true;

    const enabled = (stepsValues?.[2]?.[inputUpdated]?.value as string) === 'true';
    if (bubbles[inputUpdated]) bubbles[inputUpdated].fill = enabled;
    handleBubblesData(bubbles);
  }, [stepsValues]);

  useEffect(() => {
    const enabled = Object.entries(stepsValues?.[2] || {}).map(([key, value]) =>
      value?.value === 'true' ? key : null,
    );

    enabled.forEach((key) => {
      if (!key) return;
      if (bubbles[key] && stepsValues?.[2]?.[key]?.value) bubbles[key].visible = true;
      if (bubbles[key]) bubbles[key].fill = true;
    });
    handleBubblesData(bubbles);
  }, []);

  return (
    <div className="mr-8 max-[1242px]:hidden mb-10 flex flex-col items-center lg:top-24 w-[63%] h-[68vh]">
      <div className="w-full h-full relative">
        <div className="absolute -left-[calc(9rem+0.5rem)] text-sm top-1/2 translate-x-1/2 -rotate-90">
          <span className="uppercase">Ability to Execute</span>
        </div>
        <div className="chart-bubble-text top-1">
          <div className="chart-bubble-text-first-section">
            <span>Guest Acquisition</span>
            <span>Up-selling platforms</span>
          </div>
          <div className="chart-bubble-text-second-section">
            <span>Guest Journey Platforms</span>
            <span>Guest Journey Design With Predictive Analytic</span>
          </div>
        </div>
        <BubbleChart data={bubblesData} />
        <div className="chart-bubble-text bottom-1">
          <div className="chart-bubble-text-first-section">
            <span>Research</span>
            <span>E-Concierge</span>
            <span>Surveying & Reviews</span>
          </div>
          <div className="chart-bubble-text-second-section">
            <span>Online Check in & Check out</span>
            <span>COMMS.</span>
            <span>Guest Communications</span>
          </div>
        </div>
      </div>
    </div>
  );
};
