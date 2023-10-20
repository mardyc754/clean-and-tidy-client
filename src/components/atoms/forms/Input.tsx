import { forwardRef, type InputHTMLAttributes } from 'react';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      {...props}
      className={`rounded-lg outline-none ${className}`}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export default Input;
