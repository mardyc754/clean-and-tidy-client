import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Disclosure as HDisclosure,
  DisclosureProps as HDisclosureProps,
  Transition
} from '@headlessui/react';

interface DisclosureProps {
  defaultOpen?: boolean;
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

const Disclosure = ({
  titleComponent,
  children,
  defaultOpen = false
}: DisclosureProps) => {
  return (
    <HDisclosure as="div" defaultOpen={defaultOpen}>
      <HDisclosure.Button
        as="div"
        className="flex items-center justify-between gap-4 bg-white px-6 py-4 shadow-md focus:outline-none ui-open:rounded-t-lg ui-open:border-b-2 ui-open:border-b-slate-200 ui-not-open:rounded-lg"
      >
        {titleComponent}
        <FontAwesomeIcon
          icon={faChevronDown}
          className="h-5 w-5 transform text-cyan-500 hover:cursor-pointer ui-open:rotate-180"
        />
      </HDisclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HDisclosure.Panel
          className="flex items-center justify-between bg-white  px-5 py-4 shadow-md focus:outline-none ui-open:rounded-b-lg"
          // "ui-open:border-t-2 ui-open:border-t-slate-400"
        >
          {children}
        </HDisclosure.Panel>
      </Transition>
    </HDisclosure>
  );
};

export default Disclosure;
