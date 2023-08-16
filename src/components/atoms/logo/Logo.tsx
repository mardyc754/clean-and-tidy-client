import { robotoBold } from '~/settings/fontSetting';

type LogoProps = {
  color?: string;
};

const Logo = ({ color = 'black' }: LogoProps) => {
  return (
    <p className={`${robotoBold.className} text-${color}`}>Clean and Tide</p>
  );
};

export default Logo;
