import Link from 'next/link';

export type NavigationButtonProps = {
  name: string;
  navigateOnClickTo: string;
  className?: string;
};

const NavigationButton = ({
  name,
  navigateOnClickTo,
  className = ''
}: NavigationButtonProps) => {
  return (
    <Link href={navigateOnClickTo}>
      <button
        className={`rounded-full bg-cyan-500 px-10 py-2 font-emphasize text-base text-white shadow-md ${className}`}
      >
        {name}
      </button>
    </Link>
  );
};

export default NavigationButton;
