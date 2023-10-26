import Link from 'next/link';

import { robotoBold } from '~/settings/fontSetting';

type NavbarButtonProps = {
  name: string;
  // onClick: VoidFunction;
  navigateOnClickTo?: string;
};

const NavbarButton = ({ name, navigateOnClickTo = '' }: NavbarButtonProps) => {
  return (
    <Link href={navigateOnClickTo}>
      <button className={`${robotoBold.className}`}>{name}</button>
    </Link>
  );
};

export default NavbarButton;
