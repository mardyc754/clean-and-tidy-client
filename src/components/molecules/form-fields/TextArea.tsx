import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import type { SetRequired } from 'type-fest';

import { ErrorLabel, Label } from '~/components/atoms/forms';

type TextAreaProps = {
  label: string;
  className?: string;
  sublabel?: string;
  wrapperProps?: string;
  errorLabel?: string;
  onChange?: (value: string) => void;
} & Omit<
  SetRequired<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>,
  'onChange'
>;

const TextArea = ({
  name,
  label,
  placeholder,
  className = '',
  wrapperProps = '',
  errorLabel,
  sublabel,
  onChange,
  ...props
}: TextAreaProps) => {
  const { register, setValue } = useFormContext();

  return (
    <div
      className={clsx(
        'flex h-full flex-col',
        !errorLabel && 'pb-4',
        wrapperProps
      )}
    >
      <Label htmlFor={name}>{label}</Label>
      {sublabel && <p className="pb-2 text-xs">{sublabel}</p>}
      <textarea
        placeholder={placeholder ?? label}
        className={`resize-none rounded-lg p-4 outline-none ${className}`}
        {...register(name)}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(name, newValue);
          onChange?.(newValue);
        }}
        {...props}
      />
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default TextArea;
