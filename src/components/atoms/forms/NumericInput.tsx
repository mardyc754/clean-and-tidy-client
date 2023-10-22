import React, { type InputHTMLAttributes, type ChangeEvent } from 'react';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { SetRequired } from 'type-fest';
import { useFormContext, useWatch } from 'react-hook-form';

import Label from './Label';
import Input from './Input';
import NumericInputControl from './NumericInputControl';

export type NumericInputProps = {
  max?: number;
  min?: number;
  label?: string;
  wrapperClassName?: string;
  initialValue?: number;
  onChange?: (value: number) => void;
  variant?: 'outlined' | 'contained-controls';
} & SetRequired<
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'max' | 'min' | 'onChange'
  >,
  'name'
>;

type LabelWrapperProps = {
  name: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
};

const LabelWrapper = ({
  name,
  label,
  children,
  className = ''
}: LabelWrapperProps) =>
  label ? (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  ) : (
    <>{children}</>
  );

const NumericInput = ({
  className = '',
  max = 9999,
  min = -9999,
  variant = 'outlined',
  name,
  label,
  wrapperClassName,
  initialValue = 0,
  onChange,
  ...props
}: NumericInputProps) => {
  const { setValue, register } = useFormContext();

  const currentValue = useWatch({ name }) as number;

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);

    if (isNaN(newValue) || newValue < min) {
      // setValue(name, min);
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    setValue(name, newValue);
    onChange?.(newValue);
  };

  return (
    <LabelWrapper name={name} label={label} className={wrapperClassName}>
      <div
        className={`flex rounded-lg${
          variant === 'outlined' ? ' bg-white' : ' bg-transparent'
        } ${className}`}
      >
        <NumericInputControl
          variant={variant}
          icon={faMinus}
          onClick={() => {
            const newValue = currentValue - 1;
            setValue(name, newValue);
            onChange?.(newValue);
          }}
        />
        <Input
          defaultValue={min}
          {...register(name, {
            valueAsNumber: true,
            min,
            max,
            value: initialValue
          })}
          className={`text-center${
            variant === 'outlined' ? ' w-[150px] p-4' : ' w-[80px] p-1'
          }`}
          onChange={handleValueChange}
          {...props}
        />
        <NumericInputControl
          variant={variant}
          icon={faPlus}
          onClick={() => {
            const newValue = currentValue + 1;
            setValue(name, newValue);
            onChange?.(newValue);
          }}
        />
      </div>
    </LabelWrapper>
  );
};

export default NumericInput;
