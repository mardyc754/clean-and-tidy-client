import { type InputHTMLAttributes, forwardRef } from 'react';

import { Label } from '~/components/atoms/forms';
import { Checkbox as ShadcnCheckbox } from '~/components/shadcn/ui/checkbox';

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLButtonElement>,
    'type' | 'onChange' | 'name'
  > {
  name: string;
  label?: string;
  caption: string;
  // onChange?: (value: boolean) => void;
}

type CheckboxWrapperProps = {
  name: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
};

const CheckboxWrapper = ({
  name,
  label,
  className = '',
  children
}: CheckboxWrapperProps) =>
  label ? (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  ) : (
    <>{children}</>
  );

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ name, label, caption, className = '', ...props }, ref) => {
    return (
      <CheckboxWrapper name={name} label={label} className={className}>
        <div className="flex items-center">
          <ShadcnCheckbox ref={ref} {...props} />
          <div className="p-1">
            <label htmlFor={name} className="text-xs">
              {caption}
            </label>
          </div>
        </div>
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
