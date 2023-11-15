import { Placement, useFloating } from '@floating-ui/react-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Portal, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

interface BasicPopoverProps {
  buttonComponent: React.ReactNode;
  buttonClasses?: string;
  children?: React.ReactNode;
  placement?: Placement;
}

export default function BasicPopover({
  children,
  buttonComponent,
  buttonClasses = '',
  placement = 'right'
}: BasicPopoverProps) {
  const { refs, floatingStyles } = useFloating({
    // placement: 'bottom-start'
    // placement: 'bottom-start'
    placement
  });
  return (
    <Popover className="relative">
      <Popover.Button
        className={buttonClasses}
        ref={refs.setReference}
        // className={clsx(
        //   'text-white/90 ui-open:text-white',
        //   'group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium',
        //   'hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        // )}
      >
        {buttonComponent}
        {/* <FontAwesomeIcon
          icon={faChevronDown}
          className={clsx(
            'text-orange-300/70 ui-open:text-orange-300',
            'ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80'
          )}
          aria-hidden="true"
        /> */}
      </Popover.Button>
      {/* <Portal> */}
      {/* <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        > */}
      {/* <Popover.Panel className="absolute z-10 mt-3 w-96 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"> */}
      <Portal>
        <Popover.Panel
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-10"
          // className="absolute z-10 mt-3 w-96 max-w-sm px-4 sm:px-0 lg:max-w-3xl"
        >
          <div className="rounded-lg bg-white px-8 py-4 text-black shadow-lg ring-1 ring-black/5">
            {children}
          </div>
          {/* </div> */}
        </Popover.Panel>
        {/* </Transition> */}
        {/* </Portal> */}
      </Portal>
    </Popover>
  );
}
