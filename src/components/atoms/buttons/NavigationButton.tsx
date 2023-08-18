import Link from 'next/link';

type NavigationButtonProps = {
  name: string;
  navigateOnClickTo: string;
};

const NavigationButton = ({
  name,
  navigateOnClickTo
}: NavigationButtonProps) => {
  return (
    <Link href={navigateOnClickTo}>
      <button
        className={`rounded-full bg-cyan-300 px-10 py-2 font-emphasize text-base text-white shadow-md`}
      >
        {name}
      </button>
    </Link>
  );
};

export default NavigationButton;
