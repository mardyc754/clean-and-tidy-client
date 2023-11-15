import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { type Dispatch, Fragment, type SetStateAction } from 'react';

type DropdownOption = { id: number; name: string };

type DropdownProps = {
  options: DropdownOption[];
  value: DropdownOption | undefined;
  className?: string;
  onChange: Dispatch<SetStateAction<DropdownOption | undefined>>;
};

const Dropdown = ({
  options,
  value,
  onChange,
  className = ''
}: DropdownProps) => {
  return (
    <div className={`w-60 ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={clsx(
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    'ui-active:bg-cyan-100 ui-active:text-cyan-900',
                    'text-gray-900'
                  )}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={
                          'block truncate font-normal ui-selected:font-medium'
                        }
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Dropdown;
