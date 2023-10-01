import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  color?: 'default' | 'danger';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  color = 'default',
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const colorMap = new Map([
    ['default', 'bg-cyan-500'],
    ['danger', 'bg-red-400']
  ]);

  return (
    <button
      className={`rounded-full ${colorMap.get(
        color
      )} px-10 py-2 font-emphasize text-base text-white shadow-md ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
