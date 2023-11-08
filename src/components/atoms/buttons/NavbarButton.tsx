import Link from 'next/link';

type NavbarButtonProps = {
  children: React.ReactNode;
  href?: string;
};

const NavbarButton = ({ href = '', children }: NavbarButtonProps) => {
  return (
    <Link href={href}>
      <button className={'py-2 font-link text-base'}>{children}</button>
    </Link>
  );
};

export default NavbarButton;
