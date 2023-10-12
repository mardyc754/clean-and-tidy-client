import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';

type NumericControlProps = {
  icon: IconDefinition;
  onClick: VoidFunction;
  position: 'left' | 'right';
};

const NumericInputControl = ({
  icon,
  onClick,
  position
}: NumericControlProps) => {
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <button
      className={`absolute ${positionClass} top-0 flex h-full cursor-pointer items-center p-4`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default NumericInputControl;
