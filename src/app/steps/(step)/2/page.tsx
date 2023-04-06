import { getDbServer } from 'services/supabase/server';
import { Inputs } from '../Inputs';
import { FormControl } from '../FormControl';
import { BubbleChart } from 'components/Chart/Bubble';

const INPUTS_ID = [
  'pms',
  'rms',
  'rate-shopper',
  'bi-big-data',
  'erp',
  'channel-manager',
  'cms',
  'gds',
  'be',
  'web-app',
  'widgets',
  'imersive-web',
  'crm',
  'loyalty',
  'chat-bot',
  'e-concierge',
  'online-check-in',
  'online-check-out',
  'upselling',
  'operational-apps',
  'other-strategic-platform',
];

const generateData = (numPoints: number) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 50,
    });
  }
  return data;
};

const Step = async () => {
  const database = getDbServer();
  const { data: inputs, error: inputError } = await database
    .from('inputs_new')
    .select('id,input_name,options,type,size')
    .eq('step', '2');

  if (!inputs || inputError) throw 'Application cant get the inputs of this page.';

  return (
    <FormControl>
      <div className="flex max-lg:flex-col-reverse items-center px-8 justify-between gap-10 flex-wrap-reverse">
        <div className="flex flex-col lg:w-96 w-full overflow-y-auto max-h-[62vh] p-4">
          <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="2" stepByStep />
        </div>

        <div className="mr-8 lg:sticky max-lg:mb-10 flex flex-col items-center max-lg:w-full lg:top-24 w-[55%] h-[62vh]">
          <BubbleChart
            data={[generateData(3), generateData(7)]}
            dataDatasets={{
              labels: [''],
              datasets: [
                {
                  label: 'Bubble Chart',
                  backgroundColor: 'rgba(255, 99, 132, 0.6)',
                  xAxisID: 'x-axis-1',
                  yAxisID: 'y-axis-1',
                },
                {
                  label: 'Bubble Chart',
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  xAxisID: 'x-axis-2',
                  yAxisID: 'y-axis-1',
                },
              ],
            }}
          />
        </div>
      </div>
    </FormControl>
  );
};

export default Step;
