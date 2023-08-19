import type { InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="rounded-lg px-8 py-4" />;
};

export default Input;
