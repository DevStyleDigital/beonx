import { getDbServer } from 'services/supabase/server';
import { InputType } from 'types/supabase';
import { FormControl } from '../FormControl';
import { Inputs } from '../Inputs';
import { Chart } from './Chart';
import { AllInputs } from './Inputs';
import { INPUTS_ID } from './InputsId';
import { PersonalInfoForm } from './PersonalInfoForm';

const Step = async () => {
  const database = getDbServer();
  const { data: inputs, error: inputError } = await database
    .from('inputs_new')
    .select('id,input_name,options,type,size')
    .eq('step', '1');

  if (!inputs || inputError) throw 'Application cant get the inputs of this page.';

  return (
    <FormControl>
      <PersonalInfoForm />

      <hr className="border-separate my-8" />

      <div className="flex relative max-lg:flex-col-reverse mb-10">
        <div className="w-1/2 max-lg:w-full grid grid-cols-2 gap-8 px-8 max-sm:grid-cols-1">
          <AllInputs
            inputs={[
              ...inputs,
              { id: 'occupancy', input_name: 'Occupancy', type: 'percent' },
              {
                id: 'adr',
                input_name: 'ADR',
                type: 'currency',
              },
              {
                id: 'hotels-number',
                input_name: 'Total number of hotels',
                type: 'number',
                min: 1,
              },
              {
                id: 'rooms-number',
                input_name: 'Total number of rooms',
                type: 'number',
                max: 1000,
                min: 1,
              },
              {
                id: 'average-stay',
                input_name: 'Average Length of Stay',
                type: 'number',
              },
              {
                id: 'average-guest-stay',
                input_name: 'Average Number of guests per stay',
                type: 'number',
                max: 4,
              },
            ]}
          />
        </div>
        <Chart />
      </div>
    </FormControl>
  );
};

export default Step;
