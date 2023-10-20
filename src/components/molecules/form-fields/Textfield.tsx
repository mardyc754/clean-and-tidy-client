import type { InputHTMLAttributes } from 'react';
import {
  useFormContext,
  type FieldValues,
  type UseFormRegister
} from 'react-hook-form';
import type { SetRequired } from 'type-fest';

import { ErrorLabel, Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  label: string;
  wrapperProps?: string;
  errorLabel?: string;
  // register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  // register: UseFormRegister<FieldValues>;
} & SetRequired<InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Textfield = ({
  name,
  label,
  wrapperProps = '',
  errorLabel,
  // register,
  ...props
}: TextfieldProps) => {
  const { register } = useFormContext();
  return (
    <div className={`flex flex-col ${!errorLabel && 'pb-4'} ${wrapperProps}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        placeholder={label}
        {...register(name)}
        {...props}
        className="p-4"
      />
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default Textfield;
