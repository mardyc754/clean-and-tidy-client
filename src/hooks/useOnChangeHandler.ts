import { useEffect } from 'react';
import { useWatch, type FieldValues, type Path } from 'react-hook-form';

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
