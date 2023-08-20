import type { InputHTMLAttributes } from 'react';
import type { SetRequired } from 'type-fest';

import { Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  label: string;
} & SetRequired<InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Textfield = ({ name, label, ...props }: TextfieldProps) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} placeholder={label} {...props} />
    </div>
  );
};

export default Textfield;
