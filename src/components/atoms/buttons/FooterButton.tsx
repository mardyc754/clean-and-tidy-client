import { robotoBold } from '~/settings/fontSetting';

type FooterButtonProps = {
  name: string;
  onClick: VoidFunction;
};

const FooterButton = ({ name, onClick }: FooterButtonProps) => {
  return (
    <button className={`${robotoBold.className} text-white`} onClick={onClick}>
      {name}
    </button>
  );
};

export default FooterButton;
