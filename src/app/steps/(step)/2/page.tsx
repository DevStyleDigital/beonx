import { getDbServer } from 'services/supabase/server';
import { FormControl } from '../FormControl';
import { Bubbles } from './Bubbles';
import { Inputs } from '../Inputs';
import { INPUTS_ID } from './InputsId';

const Step = async () => {
  const database = getDbServer();
  const { data: inputs, error: inputError } = await database
    .from('inputs_new')
    .select('id,input_name,options,type,size')
    .eq('step', '2');

  if (!inputs || inputError) throw 'Application cant get the inputs of this page.';

  return (
    <FormControl>
      <div className="flex max-lg:flex-col-reverse items-center px-8 justify-between gap-5 flex-wrap-reverse">
        <div className="flex flex-col lg:w-96 w-full overflow-y-auto max-h-[62vh] p-4">
          <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="2" stepByStep />
        </div>

        <Bubbles />
      </div>
    </FormControl>
  );
};

export default Step;
