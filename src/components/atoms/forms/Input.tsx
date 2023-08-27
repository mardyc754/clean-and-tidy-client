import type { InputHTMLAttributes } from 'react';

const Input = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`rounded-lg px-8 py-4 outline-none ${className}`}
    />
  );
};

export default Input;
