'use client';

import { useSteps } from 'contexts/Steps';
import { useEffect, useState } from 'react';
import { Inputs } from '../Inputs';
import { INPUTS_ID } from './InputsId';

const RMS_OPTIONS_SELECT_OPTIONS = [
  { label: 'Atomize', value: 'atomize' },
  { label: 'BEONx', value: 'beonx' },
  { label: 'Duetto', value: 'duetto' },
  { label: 'IDeaS', value: 'ideas' },
  { label: 'EzRMS', value: 'ezrms' },
  { label: 'Rainmaker', value: 'rainmaker' },
  { label: 'RateGain', value: 'rategain' },
  { label: 'Room Price Genie', value: 'room-price-genie' },
];
const RMS_FB_SELECT_OPTIONS = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];
const RMS_RESTAURANT_SELECT_OPTIONS = [
  { label: 'OPERA Cloud', value: 'opera-cloud' },
  { label: 'OPERA 5', value: 'opera5' },
  { label: 'Suite 8', value: 'suite8' },
  { label: 'HMS', value: 'hms' },
  { label: 'Cloudbeds', value: 'cloudbeds' },
  { label: 'Mews', value: 'mews' },
  { label: 'Amadeus Hospitality Property Management', value: 'amadeus' },
  { label: 'BEONx', value: 'beonx' },
];

export const AllInputs = ({ inputs: inputsProps }: { inputs: any[] }) => {
  const [inputs, setInputs] = useState(inputsProps);
  const { stepsValues, setStepsValues } = useSteps();

  useEffect(() => {
    if (!inputs) return;
    const rmsOptions = stepsValues?.[1]?.['rms-implemented']?.value;
    if (!Array.isArray(rmsOptions)) return;
    const rmsLabel = rmsOptions.map(({ label }) => label);
    const newInputs = [...inputs];

    const addOrRemoveInput = (id: string, inputName: string, options: any) => {
      let rmsInputIndex = -1;

      for (let i = newInputs.length - 1; i >= 0; i--) {
        if (newInputs[i].id === id) {
          rmsInputIndex = i;
          break;
        }
      }

      if (rmsLabel.includes(inputName) && rmsInputIndex === -1)
        return newInputs.push({
          id,
          input_name: `Which RMS ${inputName} system are you using?`,
          type: 'select',
          options,
        });

      if (!rmsLabel.includes(inputName) && rmsInputIndex !== -1) {
        setStepsValues((prev) => {
          const newPrev = { ...prev };
          if (newPrev?.[1]?.[id]) delete newPrev[1][id];
          return newPrev;
        });
        return newInputs.splice(rmsInputIndex, 1);
      }
    };

    addOrRemoveInput('rms-rooms-system', 'Rooms', RMS_OPTIONS_SELECT_OPTIONS);
    addOrRemoveInput('rms-fb-system', 'F & B', RMS_FB_SELECT_OPTIONS);
    addOrRemoveInput(
      'rms-restaurant-system',
      'Restaurant',
      RMS_RESTAURANT_SELECT_OPTIONS,
    );

    setInputs(newInputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsValues, inputsProps]);

  return <Inputs inputsOrder={INPUTS_ID} step="1" inputs={inputs} />;
};
