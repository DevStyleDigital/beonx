import 'server-only';

import { notFound } from 'next/navigation';
import { getDbServer } from 'services/supabase/server';

import * as Icons from 'components/Icons';
import { Sidebar } from 'components/Sidebar';

const STEPS = [
  { name: 'Discover', step: 1 },
  { name: 'Digitalization & Automation', step: 2 },
  { name: 'Channel Strategy & Distribution', step: 3 },
  { name: 'Channel Strategy & Distribution', step: 4 },
  { name: 'Cost Optimization', step: 6 },
  { name: 'Sustainability', step: 7 },
];

const DashLayout = async ({ children }: BTypes.FCChildren) => {
  const database = getDbServer();
  const {
    data: { session },
  } = await database.auth.getSession();
  const {
    data: { user },
  } = await database.auth.getUser(session?.access_token);

  if (!user || !user.user_metadata.roles?.includes('admin')) notFound();

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar
        links={[
          {
            id: 'dash',
            content: 'Dashboard',
            route: '/admin/dash',
            icon: Icons.PieChartIcon,
          },
          {
            id: 'step',
            content: 'Steps',
            child: STEPS.sort((a, b) => a.step - b.step).map((step) => ({
              id: `${step.step}`,
              icon: Icons.FileIcon,
              route: `/admin/dash/steps/${step.step}`,
              content: `Step ${step.step}: ${step.name}`,
              option: null,
            })),
          },
        ]}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="mx-auto px-6 py-8 md:max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashLayout;
