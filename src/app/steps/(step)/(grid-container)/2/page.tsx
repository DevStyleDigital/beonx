import { getDbServer } from 'services/supabase/server';
import { Inputs } from '../../Inputs';

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

const Step = async () => {
  const database = getDbServer();
  const { data: inputs, error: inputError } = await database
    .from('inputs_new')
    .select('id,input_name,options,type,size')
    .eq('step', '2');

  if (!inputs || inputError) throw 'Application cant get the inputs of this page.';

  return <Inputs inputs={inputs} inputsOrder={INPUTS_ID} step="2" stepByStep />;
};

export default Step;
