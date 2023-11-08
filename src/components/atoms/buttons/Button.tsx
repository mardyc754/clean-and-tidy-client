import type { ButtonHTMLAttributes } from 'react';

import { OptionalLink } from '../links';
import clsx from 'clsx';

type ButtonProps = {
  color?: 'default' | 'danger';
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  color = 'default',
  children,
  onClick,
  className,
  href,
  ...props
}: ButtonProps) => {
  const colorMap = new Map([
    ['default', 'bg-cyan-500'],
    ['danger', 'bg-red-400']
  ]);

  return (
    <OptionalLink href={href}>
      <button
        className={clsx(
          'rounded-full',
          colorMap.get(color),
          'px-10 py-2 font-emphasize text-base text-white shadow-md',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </OptionalLink>
  );
};

export default Button;
