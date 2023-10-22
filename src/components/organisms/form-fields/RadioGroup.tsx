import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import { RadioField } from '~/components/atoms/forms';
import type { RadioFieldOption } from '~/types/forms';

type RadioGroupProps<T extends RadioFieldOption> = {
  name: string;
  label: string;
  optionList: T[];
  onChange?: (value: T['value'], availableOptions: T[]) => void;
};

const RadioGroup = <T extends RadioFieldOption>({
  name,
  label,
  optionList,
  onChange
}: RadioGroupProps<T>) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const handleChange = (value: T['value']) => {
    setValue(name, value);
    onChange?.(value, optionList);
  };

  return (
    <div className="py-4">
      <HeadlessRadioGroup onChange={handleChange}>
        <HeadlessRadioGroup.Label className="py-1">
          {label}
        </HeadlessRadioGroup.Label>
        <div className="space-y-2 py-2">
          {optionList.map((field) => (
            <RadioField key={field.name} data={field} />
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
};

export default RadioGroup;
