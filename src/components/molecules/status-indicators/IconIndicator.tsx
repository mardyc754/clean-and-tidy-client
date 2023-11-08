import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faCircleCheck
} from '@fortawesome/free-regular-svg-icons';

const iconIndicatorVariantData = {
  success: { color: 'text-green-500', icon: faCircleCheck },
  error: { color: 'text-red-500', icon: faCircleXmark }
};

const iconSizeData = {
  small: 'text-7xl',
  medium: 'text-8xl',
  large: 'text-9xl'
};

interface IconIndicatorProps {
  variant: keyof typeof iconIndicatorVariantData;
  size?: keyof typeof iconSizeData;
  caption?: string;
}

const IconIndicator = ({
  variant,
  caption,
  size = 'medium'
}: IconIndicatorProps) => {
  const variantData = iconIndicatorVariantData[variant];

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        caption && 'space-y-4'
      )}
    >
      <FontAwesomeIcon
        icon={variantData.icon}
        className={clsx(iconSizeData[size], variantData.color)}
      />
      {caption && <p>{caption}</p>}
    </div>
  );
};

export default IconIndicator;
