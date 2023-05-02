import { Select } from 'components/Pages/Inputs/Select';
import { notFound } from 'next/navigation';
import { getDbServer } from 'services/supabase/server';
import { AddOptions } from './AddOptions';
import { UpdateForm } from './UpdateForm';

const Step1Inputs = async ({ params }: { params: { input: string } }) => {
  const database = getDbServer();
  const { data: inputs, error } = await database
    .from('inputs')
    .select('*')
    .eq('id', params.input);

  const input = inputs?.[0];

  if (!inputs || !input || error) return notFound();

  return <UpdateForm input={input} />;
};

export default Step1Inputs;
