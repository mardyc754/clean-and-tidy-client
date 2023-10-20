import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import { RadioField } from '~/components/atoms/forms';
import type { CleaningFrequency, RadioFieldOption } from '~/types/forms';

type RadioGroupProps = {
  name: string;
  label: string;
  data: RadioFieldOption[];
};

const RadioGroup = ({ name, label, data }: RadioGroupProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const onChange = (value: CleaningFrequency) => {
    setValue(name, value);
  };

  return (
    <div className="py-4">
      <HeadlessRadioGroup onChange={onChange}>
        <HeadlessRadioGroup.Label className="py-1">
          {label}
        </HeadlessRadioGroup.Label>
        <div className="space-y-2 py-2">
          {data.map((field) => (
            <RadioField key={field.name} data={field} />
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
};

export default RadioGroup;
