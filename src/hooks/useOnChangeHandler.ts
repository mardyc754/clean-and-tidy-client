import { useEffect } from 'react';
import { type FieldValues, type Path, useWatch } from 'react-hook-form';

export const useOnChangeHandler = <
  T,
  FormValues extends FieldValues = FieldValues
>(
  name: Path<FormValues>,
  onChange?: (value: T) => void
) => {
  const currentValue = useWatch<FormValues, Path<FormValues>>({ name });

  useEffect(() => {
    onChange?.(currentValue);
  }, [currentValue, onChange]);

  return { currentValue: currentValue as T };
};
