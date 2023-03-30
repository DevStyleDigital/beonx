'use client';
import { usePercentages } from 'contexts/Percentages';
import { FormControl } from '../FormControl';

import * as Icons from 'components/Icons';
import colors from '@root/colors.json';
import clsx from 'clsx';

const STEP_POINTS = [
  {
    id: 'check-in',
    point: 'Check In',
    color: colors.violet,
    icon: <Icons.FireIcon fill={colors.blue} />,
    points: ['Early', 'See below inhouse and outside the property'],
  },
  {
    id: 'check-out',
    point: 'Check Out',
    color: colors.orange,
    icon: <Icons.FireDetailedIcon fill={colors.green[600]} />,
    points: ['Late checkout', 'Future Bookings'],
  },
  {
    id: 'post-check-in',
    point: 'Post Check In',
    color: colors.pink[100],
    icon: <Icons.StarIcon fill={colors.pink[100]} />,
    points: ['Cross selling (other hotels in the chain)'],
  },
  {
    id: 'experiences',
    point: 'Experiences in house',
    color: colors.purple,
    icon: <Icons.CameraIcon fill={colors.orange} />,
    points: [
      'Early check in',
      'Late checkout',
      'Spa',
      'F & B',
      'Shops',
      'Mini Pharmacy',
      'Baby Seating',
    ],
  },
  {
    id: 'post-booking',
    point: 'Post Booking',
    color: colors.blue,
    icon: <Icons.CloudIcon fill={colors.purple} />,
    points: [
      'Choose your room',
      'Design your stay with ancillaries',
      'See below inhouse and outside the property',
    ],
  },
  {
    id: 'experiences-outside',
    point: 'Experiences outside the property',
    color: colors.yellow,
    icon: <Icons.CloudIcon fill={colors.orange} />,
    points: ['Boat rides', 'Tickets', 'Taxis', 'Transfers', 'Cross selling'],
  },
  {
    id: 'metaverse',
    point: 'Metaverse',
    color: colors.green[100],
    icon: <Icons.CloudIcon fill={colors.green[100]} />,
    points: ['Virtual Shops', 'Revenue Share', 'Real Estate rental'],
  },
] as const;

const Step = () => {
  const { percentages } = usePercentages();

  return (
    <FormControl>
      <div className="flex justify-between gap-4 gap-y-8 pb-16 px-4 sm:!px-10 flex-wrap">
        <section className="max-[1060px]:w-max-[845px] flex">
          <ul className="flex min-[1060px]:flex-col max-[1060px]:justify-center flex-wrap gap-4 max-[425px]:gap-8">
            {STEP_POINTS.map((stepPoint) => {
              const percent = percentages[stepPoint.id];
              return (
                <li
                  key={stepPoint.id}
                  className="flex max-[425px]:w-full max-[425px]:gap-4 max-[425px]:flex-col w-fit gap-8 items-center"
                >
                  <div className="text-gray-600 grid gap-4 min-[425px]:w-[9.6rem] grid-cols-[2.5rem_1fr]">
                    <span className="justify-self-center self-center">
                      {stepPoint.icon}
                    </span>
                    <span>{stepPoint.point}</span>
                  </div>
                  <div className="max-[425px]:w-full">
                    <div className="w-44 max-[425px]:w-full relative overflow-hidden bg-gray-100 rounded-full h-2.5">
                      <div
                        style={{
                          ['--percent' as string]: 0,
                          ['--curr-percent' as string]: percent,
                          background: stepPoint.color,
                          width: 'calc(var(--percent) * 1%)',
                        }}
                        className="h-2.5 rounded-full animate-percentage"
                      />
                      <span
                        className="h-2.5 w-2.5 absolute top-0 left-0 rounded-full"
                        style={{ background: stepPoint.color }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="max-[1060px]:w-full flex items-center justify-center">
          <ul className="grid gap-y-8 gap-x-8 grid-cols-[repeat(4,11rem)] max-[425px]:grid-cols-1 max-md:grid-cols-[repeat(2,11rem)] max-[1280px]:grid-cols-[repeat(3,11rem)]">
            {STEP_POINTS.map((stepPoint) => (
              <li
                key={stepPoint.id}
                className={clsx('h-fit max-[425px]:text-center', {
                  'row-span-2': stepPoint.id === 'experiences',
                })}
              >
                <h3 style={{ color: stepPoint.color }} className="text-xl">
                  {stepPoint.point}:
                </h3>
                <ul>
                  {stepPoint.points.map((point, i) => (
                    <li key={stepPoint.id + i} className="text-gray-600 mt-4">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </FormControl>
  );
};

export default Step;
