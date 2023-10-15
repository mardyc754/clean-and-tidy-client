import type { InputHTMLAttributes } from 'react';
import type { SetRequired } from 'type-fest';

import { ErrorLabel, Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  label: string;
  wrapperProps?: string;
  errorLabel?: string;
} & SetRequired<InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Textfield = ({
  name,
  label,
  wrapperProps = '',
  errorLabel,
  ...props
}: TextfieldProps) => {
  return (
    <div className={`flex flex-col ${!errorLabel && 'pb-4'} ${wrapperProps}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} placeholder={label} {...props} className="p-4" />
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default Textfield;
