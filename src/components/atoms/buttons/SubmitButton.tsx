import React, { type ButtonHTMLAttributes } from 'react';

import Button, { type ButtonProps } from '~/components/atoms/buttons/Button';

const SubmitButton = ({ name, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      type="submit"
      // className={`rounded-full bg-cyan-500 px-10 py-2 font-emphasize text-base text-white shadow-md`}
    >
      {name}
    </Button>
  );
};

export default SubmitButton;
