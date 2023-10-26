import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import type { NumericInputProps } from './NumericInput';

type NumericControlProps = {
  icon: IconDefinition;
  onClick: VoidFunction;
  variant?: NumericInputProps['variant'];
};

const NumericInputControl = ({
  icon,
  onClick,
  variant = 'outlined'
}: NumericControlProps) => {
  return (
    <button
      // className={`flex cursor-pointer items-center `}
      className={`flex cursor-pointer items-center${
        variant === 'outlined' ? ' p-4' : ' rounded-full bg-cyan-500 p-3'
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={variant === 'outlined' ? 'h-4 w-4' : 'h-3 w-3 text-white'}
      />
    </button>
  );
};

export default NumericInputControl;
