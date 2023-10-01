import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AvatarProps = {
  size?: 'small' | 'medium' | 'large';
};
const Avatar = ({ size = 'small' }: AvatarProps) => {
  const sizeMap = new Map([
    ['small', { wrapperClasses: 'h-12 w-12', iconClasses: 'text-2xl' }],
    ['medium', { wrapperClasses: 'h-24 w-24', iconClasses: 'text-5xl' }],
    ['large', { wrapperClasses: 'h-48 w-48', iconClasses: 'text-8xl' }]
  ]);

  const styleData = sizeMap.get(size);

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-cyan-500 ${styleData?.wrapperClasses}`}
    >
      <FontAwesomeIcon
        icon={faUser}
        className={`text-white ${styleData?.iconClasses}`}
      />
    </div>
  );
};

export default Avatar;
