import React, { type InputHTMLAttributes, type ChangeEvent } from 'react';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { SetRequired } from 'type-fest';
import {
  type UseFormWatch,
  useFormContext,
  type FieldValues,
  type UseFormRegister,
  type UseFormSetValue
} from 'react-hook-form';

import Label from './Label';
import Input from './Input';
import NumericInputControl from './NumericInputControl';
import { init } from 'next/dist/compiled/@vercel/og/satori';

export type NumericInputProps = {
  // value: number;
  // onIncreaseValue: VoidFunction;
  // onDecreaseValue: VoidFunction;
  // onChange: (value: number) => void;
  max?: number;
  min?: number;
  label?: string;
  wrapperClassName?: string;
  initialValue?: number;
  // watch: UseFormWatch<FieldValues>;
  // setValue: UseFormSetValue<FieldValues>;
  // register: UseFormRegister<FieldValues>;
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
  // value,
  // onIncreaseValue,
  // onDecreaseValue,
  // onChange,
  // setValue,
  // register,
  // watch,
  className = '',
  max = 9999,
  min = -9999,
  variant = 'outlined',
  name,
  label,
  wrapperClassName,
  initialValue = 0,
  ...props
}: NumericInputProps) => {
  const { setValue, register, watch } = useFormContext();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      setValue(name, min);
    } else if (newValue > max) {
      setValue(name, max);
    } else if (newValue < min) {
      setValue(name, min);
    } else {
      setValue(name, newValue);
    }
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
          onClick={() => setValue(name, watch(name) - 1)}
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
            setValue(name, watch(name) + 1);
          }}
        />
      </div>
    </LabelWrapper>
  );
};

export default NumericInput;
