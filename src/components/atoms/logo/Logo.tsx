import Link from 'next/link';

import { robotoBold } from '~/settings/fontSetting';

type LogoProps = {
  color?: string;
};

const Logo = ({ color = 'black' }: LogoProps) => {
  return (
    <p className={`${robotoBold.className} text-${color}`}>
      <Link href="/">Clean and Tide</Link>
    </p>
  );
};

export default Logo;
