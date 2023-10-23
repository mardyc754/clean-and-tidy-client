import React, { type InputHTMLAttributes, type ChangeEvent } from 'react';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useFormContext, useWatch } from 'react-hook-form';
import type { SetRequired } from 'type-fest';

import Label from './Label';
import Input from './Input';
import NumericInputControl from './NumericInputControl';
import clsx from 'clsx';
import ErrorLabel from './ErrorLabel';

export type NumericInputProps = {
  max?: number;
  min?: number;
  label?: string;
  wrapperClassName?: string;
  initialValue?: number;
  errorLabel?: string;
  onChange?: (value: number) => void;
  variant?: 'outlined' | 'contained-controls';
} & SetRequired<
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'max' | 'min' | 'onChange'
  >,
  'name'
>;

const NumericInput = ({
  className = '',
  max = 9999,
  min = -9999,
  variant = 'outlined',
  name,
  label,
  wrapperClassName,
  errorLabel,
  initialValue = 0,
  onChange,
  ...props
}: NumericInputProps) => {
  const { setValue, register } = useFormContext();

  const currentValue = useWatch({ name }) as number;

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);

    if (isNaN(newValue) || newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    setValue(name, newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={clsx(
        wrapperClassName,
        'w-fit',
        variant === 'outlined' && !errorLabel && 'mb-4'
      )}
    >
      {label && <Label htmlFor={name}>{label}</Label>}
      <div
        className={clsx(
          'flex rounded-lg',
          variant === 'outlined' ? ' bg-white' : ' bg-transparent',
          className
        )}
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
          className={clsx(
            'text-center',
            variant === 'outlined' ? ' w-[150px] p-4' : ' w-[80px] p-1'
          )}
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
      {variant === 'outlined' && <ErrorLabel>{errorLabel}</ErrorLabel>}
    </div>
  );
};

export default NumericInput;
