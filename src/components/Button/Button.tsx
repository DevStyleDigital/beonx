'use client';

import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

export interface ButtonProps {
  href?: string;
  disabled?: boolean;
  buttonRef?: React.ForwardedRef<HTMLButtonElement> | null;

  variant?: 'filled' | 'unstyled';
  size?: 'full' | 'fit' | 'large' | 'no-pd';
}

export const ButtonRoot: BTypes.FC<
  ButtonProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  false
> = ({
  children,
  className,
  buttonRef,
  variant = 'filled',
  size = 'full',
  href,
  ...props
}) => {
  const Comp = href ? 'a' : 'button';

  return (
    <Slot type={props.type || 'button'} ref={buttonRef} {...props}>
      <Comp
        href={href}
        className={clsx(
          'px-4 py-3 rounded-lg flex items-center',
          {
            'bg-transparent text-text text-sm': variant === 'unstyled',
            'bg-primary text-background font-bold text-sm hover:bg-opacity-80 active:scale-95 transition-all disabled:bg-gray-600 disabled:hover:bg-opacity-100 disabled:active:!scale-100':
              variant === 'filled',
            'w-full text-center': size === 'full',
            'w-fit': size === 'fit',
            'px-8 w-fit': size === 'large',
            '!px-0 !py-0': size === 'no-pd',
            'cursor-not-allowed': props.disabled,
          },
          className,
        )}
      >
        {children}
      </Comp>
    </Slot>
  );
};
