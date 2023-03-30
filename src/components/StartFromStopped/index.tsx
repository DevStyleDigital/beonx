'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cookies } from 'services/cookies';

export const StartFromStopped = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const historic = localStorage.getItem('STEPS_VALUES');
    if (historic && Object.keys(JSON.parse(historic) || {}).length) setOpen(true);
  }, []);

  function clearAllStepsData() {
    localStorage.removeItem('STEPS_VALUES');
    localStorage.removeItem('INCREASE_POTENTIAL_DATA');
    localStorage.removeItem('PERCENTAGES');
    localStorage.removeItem('GROUP_VALUES_SUM');
    localStorage.removeItem('COMPLETED_STEPS');
    localStorage.removeItem('CURR_STEP');
    localStorage.removeItem('CURRENT_REVENUE_DATA');
    cookies.remove('_CURR_STEP');
    setOpen(false);
  }

  return (
    <>
      {mounted && open && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="flex items-center justify-center fixed top-0 left-0 right-0 bg-black/40 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
        >
          <div className="relative max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden
                  className="mx-auto mb-4 text-gray-400 w-14 h-14"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  We see that you have a history on our site.
                  <br /> You want:
                </h3>
                <Link
                  href="/steps"
                  onClick={() => setOpen(false)}
                  data-modal-hide="popup-modal"
                  className="text-white bg-primary hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Continue From Historic
                </Link>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={clearAllStepsData}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Clear Historic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
