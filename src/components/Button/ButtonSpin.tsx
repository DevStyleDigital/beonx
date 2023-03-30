'use client';

export type ButtonSpin = BTypes.FC<{}, {}, false, false>;

export const ButtonSpin: ButtonSpin = () => {
  return (
    <div
      className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-gray-150"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
