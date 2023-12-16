import { type InputHTMLAttributes } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Checkbox from './Checkbox';

interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLButtonElement>,
    'type' | 'onChange' | 'name'
  > {
  name: string;
  label?: string;
  caption: string;
  onChange?: (value: boolean) => void;
}

const FormCheckbox = ({ name, onChange, ...props }: CheckboxProps) => {
  const { register, setValue } = useFormContext();

  const checked = useWatch({ name }) as boolean;

  return (
    <Checkbox
      {...props}
      defaultChecked={checked}
      {...register(name, { value: false })}
      onClick={() => {
        const newValue = !checked;
        setValue(name, newValue);
        onChange?.(newValue);
      }}
    />
  );
};

export default FormCheckbox;
