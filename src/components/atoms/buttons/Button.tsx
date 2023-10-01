import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ name, onClick, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-full bg-cyan-500 px-10 py-2 font-emphasize text-base text-white shadow-md ${className}`}
      onClick={onClick}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
