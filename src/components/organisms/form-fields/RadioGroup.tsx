import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import { RadioField } from '~/components/atoms/forms';
import type { RadioFieldOption } from '~/types/forms';

type RadioGroupProps = {
  label: string;
  value: RadioFieldOption | null;
  onChange: (value: RadioFieldOption) => void;
  data: RadioFieldOption[];
};

const RadioGroup = ({ label, data, value, onChange }: RadioGroupProps) => {
  return (
    <div className="py-4">
      <HeadlessRadioGroup value={value} onChange={onChange}>
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
