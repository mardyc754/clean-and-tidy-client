import { outfitSemiBold } from '~/settings/fontSetting';

type ButtonProps = {
  name: string;
  onClick: VoidFunction;
};

const Button = ({ name, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-cyan-300 px-6 py-2 text-base text-white ${outfitSemiBold.className} rounded-full shadow-md`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
