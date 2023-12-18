import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import React, { type ChangeEvent, type InputHTMLAttributes } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { SetRequired } from 'type-fest';

import ErrorLabel from './ErrorLabel';
import Input from './Input';
import Label from './Label';
import NumericInputControl from './NumericInputControl';

export type NumericInputProps = {
  max?: number;
  min?: number;
  step?: number;
  label?: string;
  wrapperClassName?: string;
  initialValue?: number;
  errorLabel?: string;
  onChange?: (value: number) => void;
  variant?: 'outlined' | 'contained-controls';
  incrementDisabled?: boolean;
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
  step = 1,
  variant = 'outlined',
  name,
  label,
  wrapperClassName,
  errorLabel,
  initialValue = 0,
  incrementDisabled = false,
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
          variant === 'outlined' && ' border-2 border-muted bg-white',
          variant === 'contained-controls' && ' bg-transparent',
          variant === 'outlined' && errorLabel && 'border-red-500',
          className
        )}
      >
        <NumericInputControl
          variant={variant}
          icon={faMinus}
          onClick={() => {
            const newValue = currentValue - step;
            if (newValue < min) return;
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
            variant === 'outlined'
              ? ' w-[150px] p-2 shadow-sm'
              : ' w-[80px] p-1'
          )}
          onChange={handleValueChange}
          {...props}
        />
        <NumericInputControl
          disabled={incrementDisabled}
          variant={variant}
          icon={faPlus}
          onClick={() => {
            const newValue = currentValue + step;
            if (newValue > max) return;
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
