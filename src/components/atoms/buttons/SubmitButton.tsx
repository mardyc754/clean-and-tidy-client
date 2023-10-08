import React, { type ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  name: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = ({ name, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type="submit"
      className={`rounded-full bg-cyan-500 px-10 py-2 font-emphasize text-base text-white shadow-md`}
    >
      {name}
    </button>
  );
};

export default SubmitButton;
