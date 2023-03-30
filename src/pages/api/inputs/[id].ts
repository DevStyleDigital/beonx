import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const supabase = createServerSupabaseClient(
      { req, res },
      {
        supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user?.user_metadata.roles?.includes('admin'))
      throw Error('not authenticated');

    if (req.method === 'PUT') {
      const data = req.body;
      await supabase.from('inputs_new').update(data).eq('id', id);
      return res.status(200).end('Updated');
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  } catch (err: any) {
    return res.status(500).json({ error: { statusCode: 500, message: err.message } });
  }
}
