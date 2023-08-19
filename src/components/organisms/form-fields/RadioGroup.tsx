import { useState } from 'react';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';

import { RadioField } from '~/components/atoms/forms';
import type { RadioFieldOption } from '~/types/forms';

type RadioGroupProps = {
  label: string;
  data: RadioFieldOption[];
};

const RadioGroup = ({ label, data }: RadioGroupProps) => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <div className="py-16">
      <HeadlessRadioGroup value={selected} onChange={setSelected}>
        <HeadlessRadioGroup.Label className="py-1">
          {label}
        </HeadlessRadioGroup.Label>
        <div className="space-y-2 py-2">
          {data.map((freq) => (
            <RadioField key={freq.name} data={freq} />
          ))}
        </div>
      </HeadlessRadioGroup>
    </div>
  );
};

export default RadioGroup;
