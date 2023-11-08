import clsx from 'clsx';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  caption?: string;
  className?: string;
}

const Spinner = ({ size = 'medium', caption, className }: SpinnerProps) => {
  const sizeClasses = {
    small: 'h-12 w-12 border-4',
    medium: 'h-24 w-24 border-8',
    large: 'h-36 w-36 border-8'
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center',
        caption && 'space-y-4',
        className
      )}
    >
      <div
        className={clsx(
          sizeClasses[size],
          'animate-spin rounded-full border-solid border-cyan-500 border-t-transparent'
        )}
      />
      {caption && <p>{caption}</p>}
    </div>
  );
};

export default Spinner;
