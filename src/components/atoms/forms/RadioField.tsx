import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import type { RadioFieldOption } from '~/types/forms';

import { CircularCheckIcon } from '../icons';

type RadioFieldProps = {
  data: RadioFieldOption;
};

const RadioField = ({ data }: RadioFieldProps) => {
  return (
    <HeadlessRadioGroup.Option
      key={data.name}
      value={data.id}
      className={`relative flex cursor-pointer rounded-lg
        px-5 py-4 shadow-md focus:outline-none
         ui-checked:bg-cyan-500 ui-checked:bg-opacity-75 
         ui-checked:text-white ui-not-checked:bg-white`}
    >
      {({ checked }) => (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm">
                <HeadlessRadioGroup.Label
                  as="p"
                  className={`font-medium ui-checked:text-white ui-not-checked:text-slate-900`}
                >
                  {data.name}
                </HeadlessRadioGroup.Label>
                <HeadlessRadioGroup.Description
                  as="span"
                  className={`inline ui-checked:text-cyan-100 ui-not-checked:text-slate-500`}
                >
                  {data.details && <span>{data.details}</span>}
                </HeadlessRadioGroup.Description>
              </div>
            </div>
            {checked && (
              <div className="shrink-0 text-white">
                <CircularCheckIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </>
      )}
    </HeadlessRadioGroup.Option>
  );
};

export default RadioField;
