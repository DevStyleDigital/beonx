'use client';

import * as SelectRadix from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { useWindowSize } from 'hooks/window-size';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { InputSkeleton } from 'components/InputSkeleton';

interface SelectContextProps {
  // open: boolean;
  color: string;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = createContext<SelectContextProps>({} as SelectContextProps);

const useSelect = () => useContext(SelectContext);

export const SelectRoot: BTypes.FC<
  SelectRadix.SelectProps,
  { color?: string; className?: string; inputName: JSX.Element },
  false
> = ({ color = '#0003', inputName, ...props }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <SelectContext.Provider value={{ color }}>
      {mounted ? (
        <div
          className="relative w-full [&>div]:w-full [&>div]:!absolute [&>div]:left-0"
          style={{
            ['--color' as string]: color,
            opacity: props.disabled ? '0.5' : '1',
          }}
        >
          <SelectRadix.Root {...props} />
        </div>
      ) : (
        <div className="flex flex-col w-full h-100% justify-between">
          {inputName}
          <InputSkeleton />
        </div>
      )}
    </SelectContext.Provider>
  );
};

export const SelectTrigger: BTypes.FC<SelectRadix.SelectTriggerProps, {}, false> = ({
  children,
  ...props
}) => {
  return (
    <SelectRadix.Trigger
      {...props}
      className="flex flex-col w-full h-full justify-between outline-none"
    >
      {children}
      <span
        className={clsx(
          'w-full flex justify-between relative z-10 py-1 items-end border-b-[1px] border-[var(--color)] transition-all border-opacity-75 focus:border-opacity-100 outline-none',
          props.className,
        )}
      >
        <SelectRadix.Value
          placeholder={
            <span className="text-gray-600 text-sm font-sans-secondary">
              {props.placeholder}
            </span>
          }
        />
        <SelectRadix.Icon className="mr-3">
          <ChevronDownIcon className="w-4 h-4 text-[var(--color)]" />
        </SelectRadix.Icon>
      </span>
    </SelectRadix.Trigger>
  );
};

export const SelectMobilePortal: BTypes.FC<SelectRadix.SelectPortalProps, {}, false> = ({
  children,
}) => {
  return (
    <SelectRadix.Portal
      className="
          fixed
          z-[1000]
          !bg-black
          !bg-opacity-20
          h-screen
          w-screen
          top-0
          left-0
          rounded-none

          [&>div]:absolute
          [&>div]:!flex-none
          [&>div]:rounded-md
          [&>div]:!bg-background
          [&>div]:!max-h-[70vh]
          [&>div]:!h-fit
          [&>div]:!w-48
          [&>div]:translate-y-[calc(-50%)]
          [&>div]:left-1/2
          [&>div]:translate-x-[calc(-50%)]
          [&>div]:top-1/2
          [&>div]:!m-0
        "
    >
      {children}
    </SelectRadix.Portal>
  );
};

export const SelectPortal: BTypes.FC<SelectRadix.SelectPortalProps, {}, false> = ({
  children,
  ...props
}) => {
  const size = useWindowSize();
  const Container = size.width && size.width < 1024 ? SelectMobilePortal : React.Fragment;

  return (
    <Container>
      <SelectRadix.Content
        suppressHydrationWarning
        {...props}
        position="popper"
        sideOffset={8}
        className={clsx(
          'bg-white z-50 rounded-md py-2 drop-shadow-lg max-h-48',
          props.className,
        )}
      >
        <SelectRadix.Viewport className="!overflow-y-auto py-3 custom-scrollbar-inputs">
          {children}
        </SelectRadix.Viewport>
      </SelectRadix.Content>
    </Container>
  );
};

export const SelectOption: BTypes.FC<SelectRadix.SelectItemProps, {}, false> = ({
  children,
  ...props
}) => {
  const { color } = useSelect();
  return (
    <SelectRadix.Item
      {...props}
      style={{
        ['--color' as string]: color,
      }}
      className="
        flex
        items-center
        h-6
        p-5
        relative
        select-none
        focus:bg-gray-100
        outline-none
        [&[data-state=checked]]:bg-[var(--color)]
        [&[data-state=checked]]:focus:bg-[var(--color)]
      "
    >
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
    </SelectRadix.Item>
  );
};
