import { robotoBold } from '~/settings/fontSetting';

type NavbarButtonProps = {
  name: string;
  onClick: VoidFunction;
};

const NavbarButton = ({ name, onClick }: NavbarButtonProps) => {
  return (
    <button className={`${robotoBold.className}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default NavbarButton;
