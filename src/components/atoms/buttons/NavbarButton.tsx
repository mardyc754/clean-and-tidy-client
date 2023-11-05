import Link from 'next/link';
import clsx from 'clsx';

import { robotoBold } from '~/settings/fontSetting';

type NavbarButtonProps = {
  children: React.ReactNode;
  href?: string;
};

const NavbarButton = ({ href = '', children }: NavbarButtonProps) => {
  return (
    <Link href={href}>
      <button className={clsx(robotoBold.className, 'py-2 text-base')}>
        {children}
      </button>
    </Link>
  );
};

export default NavbarButton;
