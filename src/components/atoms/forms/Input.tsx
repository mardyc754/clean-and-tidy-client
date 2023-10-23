import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      {...props}
      className={clsx('rounded-lg outline-none', className)}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export default Input;
