'use client';

import clsx from 'clsx';

export const ButtonArrow: BTypes.FCIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23.608"
      height="10.503"
      viewBox="0 0 23.608 10.503"
      {...props}
      className={clsx('w-6 h-3 translate-y-[2%]', props.className)}
    >
      <g id="Arrow" transform="translate(23.608) rotate(90)">
        <path
          id="Vector"
          d="M5.25,23.6a1.311,1.311,0,0,1-1.311-1.311V4.469l-1.692,1.7A1.317,1.317,0,0,1,.386,4.312L4.319.378a1.318,1.318,0,0,1,2.242.931v20.98A1.311,1.311,0,0,1,5.25,23.6Z"
          transform="translate(0 0.008)"
          className="fill-background"
        />
        <path
          id="Vector-2"
          data-name="Vector"
          d="M5.25,6.562a1.311,1.311,0,0,1-.931-.38L.386,2.248A1.317,1.317,0,1,1,2.248.386L6.181,4.319A1.311,1.311,0,0,1,5.25,6.562Z"
          transform="translate(3.934 0)"
          className="fill-background"
        />
      </g>
    </svg>
  );
};
