import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  position?: 'top' | 'middle' | 'bottom';
  children?: React.ReactNode;
  icon?: IconDefinition;
  href?: string;
}

const DropdownMenuItem = ({
  position,
  children,
  icon,
  href,
  ...props
}: DropdownButtonProps) => {
  return (
    <Menu.Item>
      <button
        className={clsx(
          'ui-active:text-cyan-500',
          'text-gray-900',
          'group flex w-full items-center space-x-2 rounded-b-md px-2 py-2 font-link text-sm',
          position === 'top' && 'rounded-t-md',
          position === 'bottom' && 'rounded-b-md'
        )}
        {...props}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {children}
      </button>
    </Menu.Item>
  );
};

export default DropdownMenuItem;
