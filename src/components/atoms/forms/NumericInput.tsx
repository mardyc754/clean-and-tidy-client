import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { InputHTMLAttributes, ChangeEvent } from 'react';
import type { SetRequired } from 'type-fest';

import Input from './Input';
import NumericInputControl from './NumericInputControl';

export type NumericInputProps = {
  value: number;
  onIncreaseValue: VoidFunction;
  onDecreaseValue: VoidFunction;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  variant?: 'outlined' | 'contained-controls';
} & SetRequired<
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'max' | 'min' | 'onChange'
  >,
  'name'
>;

const NumericInput = ({
  value,
  onIncreaseValue,
  onDecreaseValue,
  onChange,
  className = '',
  max = 9999,
  min = -9999,
  variant = 'outlined',
  ...props
}: NumericInputProps) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      onChange(min);
    } else if (newValue > max) {
      onChange(max);
    } else if (newValue < min) {
      onChange(min);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div
      className={`flex rounded-lg${
        variant === 'outlined' ? ' bg-white' : ' bg-transparent'
      } ${className}`}
    >
      <NumericInputControl
        variant={variant}
        icon={faMinus}
        onClick={onDecreaseValue}
      />
      <Input
        value={value}
        className={`text-center${
          variant === 'outlined' ? ' w-[150px] p-4' : ' w-[80px] p-1'
        }`}
        onChange={handleValueChange}
        {...props}
      />
      <NumericInputControl
        variant={variant}
        icon={faPlus}
        onClick={onIncreaseValue}
      />
    </div>
  );
};

export default NumericInput;
