import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import type {
  SetStateAction,
  Dispatch,
  InputHTMLAttributes,
  ChangeEvent
} from 'react';
import type { SetRequired } from 'type-fest';

import Input from './Input';
import NumericInputControl from './NumericInputControl';

export type NumericInputProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  max?: number;
  min?: number;
} & SetRequired<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'max' | 'min'>,
  'name'
>;

const NumericInput = ({
  value,
  setValue,
  className,
  max = 9999,
  min = -9999,
  ...props
}: NumericInputProps) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      setValue(min);
    } else if (newValue > max) {
      setValue(max);
    } else if (newValue < min) {
      setValue(min);
    } else {
      setValue(newValue);
    }
  };

  return (
    <div className={`relative w-fit ${className}`}>
      <NumericInputControl
        position="left"
        icon={faMinus}
        onClick={() => setValue((prev) => (prev > min ? prev - 1 : min))}
      />
      <Input
        value={value}
        className="text-center"
        onChange={handleValueChange}
        {...props}
      />
      <NumericInputControl
        position="right"
        icon={faPlus}
        onClick={() => setValue((prev) => (prev < max ? prev + 1 : max))}
      />
    </div>
  );
};

export default NumericInput;
