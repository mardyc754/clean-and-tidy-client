import clsx from 'clsx';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps
} from '~/components/shadcn/ui/button';

import { OptionalLink } from '../links';

export type ButtonProps = {
  color?: 'default' | 'danger';
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = 'default',
      children,
      onClick,
      className,
      href,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const colorMap = new Map([
      ['default', 'bg-cyan-500'],
      ['danger', 'bg-red-400']
    ]);

    return (
      <OptionalLink href={href} passHref>
        <ShadcnButton
          ref={ref}
          className={clsx(
            // 'rounded-full',
            colorMap.get(color),
            // 'px-10 py-2 font-emphasize text-base text-white shadow-md',
            className
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </ShadcnButton>
      </OptionalLink>
    );
  }
);

Button.displayName = 'Button';

export default Button;
