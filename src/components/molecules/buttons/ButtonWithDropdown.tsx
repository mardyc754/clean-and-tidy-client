import {
  type IconDefinition,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';

import { convertToCamelCase } from '~/utils/stringUtils';

import DropdownMenuItem from '../../atoms/buttons/DropdownMenuItem';

interface ButtonWithDropdownProps {
  label: string;
  dropdownItemsData: Array<{
    label: React.ReactNode;
    icon?: IconDefinition;
  }>;
}
const ButtonWithDropdown = ({
  label,
  dropdownItemsData
}: ButtonWithDropdownProps) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 py-2 font-link text-base">
        <span>{label}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="h-5 w-5 transform hover:cursor-pointer ui-open:rotate-180"
        />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {dropdownItemsData.map((item, index) => (
          <DropdownMenuItem
            icon={dropdownItemsData[index]!.icon}
            position={
              index === 0
                ? 'top'
                : index === dropdownItemsData.length - 1
                ? 'bottom'
                : 'middle'
            }
            key={`DropdownMenuItem-${convertToCamelCase(label)}-${index}`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default ButtonWithDropdown;
