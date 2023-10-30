import clsx from 'clsx';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner = ({ size = 'medium' }: SpinnerProps) => {
  const sizeClasses = {
    small: 'h-12 w-12 border-4',
    medium: 'h-24 w-24 border-8',
    large: 'h-36 w-36 border-8'
  };

  return (
    <div
      className={clsx(
        sizeClasses[size],
        'animate-spin rounded-full border-solid border-cyan-500 border-t-transparent'
      )}
    ></div>
  );
};

export default Spinner;
