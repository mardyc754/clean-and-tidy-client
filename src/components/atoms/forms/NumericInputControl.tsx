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
    <div
      className={`absolute ${positionClass} top-0 flex h-full cursor-pointer items-center p-4`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default NumericInputControl;
