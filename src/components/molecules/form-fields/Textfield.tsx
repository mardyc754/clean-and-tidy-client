import type { InputHTMLAttributes } from 'react';
import type { SetRequired } from 'type-fest';

import { Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  label: string;
  wrapperProps?: string;
} & SetRequired<InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Textfield = ({
  name,
  label,
  wrapperProps = '',
  ...props
}: TextfieldProps) => {
  return (
    <div className={`flex flex-col ${wrapperProps}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} placeholder={label} {...props} />
    </div>
  );
};

export default Textfield;
