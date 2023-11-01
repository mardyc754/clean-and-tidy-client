import Link from 'next/link';

import { robotoBold } from '~/settings/fontSetting';

type NavbarButtonProps = {
  name: string;
  // onClick: VoidFunction;
  href?: string;
};

const NavbarButton = ({ name, href = '' }: NavbarButtonProps) => {
  return (
    <Link href={href}>
      <button className={`${robotoBold.className}`}>{name}</button>
    </Link>
  );
};

export default NavbarButton;
