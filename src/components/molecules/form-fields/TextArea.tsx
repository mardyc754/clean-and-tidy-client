import type { TextareaHTMLAttributes } from 'react';
import type { SetRequired } from 'type-fest';

import { Label } from '~/components/atoms/forms';

type TextAreaProps = {
  label: string;
  className?: string;
  wrapperProps?: string;
} & SetRequired<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>;

const TextArea = ({
  name,
  label,
  className = '',
  wrapperProps = '',
  ...props
}: TextAreaProps) => {
  return (
    <div className={`flex h-full flex-col ${wrapperProps}`}>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        name={name}
        placeholder={label}
        className={`resize-none rounded-lg p-4 outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;
