import clsx from 'clsx';
import { type InputHTMLAttributes, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { SetRequired } from 'type-fest';

import { ErrorLabel, Input, Label } from '~/components/atoms/forms';

type TextfieldProps = {
  label: string;
  wrapperProps?: string;
  errorLabel?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
} & SetRequired<
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>,
  'name'
>;

const Textfield = ({
  name,
  label,
  wrapperProps = '',
  errorLabel,
  defaultValue,
  onChange,
  className,
  ...props
}: TextfieldProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      onChange?.(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, name, setValue]);

  return (
    <div className={clsx('flex flex-col', !errorLabel && 'pb-4', wrapperProps)}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        placeholder={label}
        {...register(name)}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(name, newValue);
          onChange?.(newValue);
        }}
        className={clsx('border-2 border-muted p-2 shadow-sm', className)}
        {...props}
      />
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default Textfield;
