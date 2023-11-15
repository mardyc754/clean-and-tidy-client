import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type InputHTMLAttributes } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Label } from '~/components/atoms/forms';

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'name'
  > {
  name: string;
  label?: string;
  caption: string;
  onChange?: (value: boolean) => void;
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

const Checkbox = ({
  name,
  label,
  caption,
  className = '',
  onChange,
  ...props
}: CheckboxProps) => {
  const { register, setValue } = useFormContext();

  const checked = useWatch({ name }) as boolean;

  const wrapperStyle = checked
    ? 'bg-cyan-500'
    : 'border-2 border-cyan-500 bg-transparent';

  return (
    <CheckboxWrapper name={name} label={label} className={className}>
      <div className="flex items-center">
        <div className={`relative h-6 w-6 rounded-lg ${wrapperStyle}`}>
          {checked && (
            <div
              className="absolute left-0 top-0 flex h-6 w-6 place-content-center"
              aria-hidden="true"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="h-4 w-4 place-self-center text-white"
                aria-hidden="true"
              />
            </div>
          )}
          <input
            {...props}
            type="checkbox"
            className="absolute top-0 h-6 w-6 cursor-pointer appearance-none rounded-lg"
            defaultChecked={checked}
            {...register(name, { value: false })}
            onChange={() => {
              const newValue = !checked;
              setValue(name, newValue);
              onChange?.(newValue);
            }}
          />
        </div>
        <div className="px-2">
          <p className="text-xs">{caption}</p>
        </div>
      </div>
    </CheckboxWrapper>
  );
};

export default Checkbox;
