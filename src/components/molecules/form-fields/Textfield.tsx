import type { InputHTMLAttributes } from 'react';

import { Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  name: string;
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Textfield = ({ name, label, ...props }: TextfieldProps) => {
  return (
    <>
      <div className="flex flex-col">
        <Label htmlFor={name}>{label}</Label>
        <Input name={name} placeholder={label} {...props} />
      </div>
    </>
  );
};

export default Textfield;
