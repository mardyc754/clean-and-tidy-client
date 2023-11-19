import clsx from 'clsx';
import { type InputHTMLAttributes, forwardRef } from 'react';

import { Input as ShadcnInput } from '~/components/shadcn/ui/input';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <ShadcnInput
      {...props}
      className={clsx('rounded-lg outline-none', className)}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export default Input;
