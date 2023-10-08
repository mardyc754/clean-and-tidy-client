import type { InputHTMLAttributes } from 'react';

const Input = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className={`rounded-lg p-4 outline-none ${className}`} />
  );
};

export default Input;
