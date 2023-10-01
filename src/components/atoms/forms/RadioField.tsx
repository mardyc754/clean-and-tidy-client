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
      className={({ checked }) =>
        `
        ${checked ? 'bg-cyan-500 bg-opacity-75 text-white' : 'bg-white'}
          relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
      }
    >
      {({ checked }) => (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm">
                <HeadlessRadioGroup.Label
                  as="p"
                  className={`font-medium  ${
                    checked ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {data.name}
                </HeadlessRadioGroup.Label>
                <HeadlessRadioGroup.Description
                  as="span"
                  className={`inline ${
                    checked ? 'text-cyan-100' : 'text-slate-500'
                  }`}
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
