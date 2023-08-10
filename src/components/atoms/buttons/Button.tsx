type ButtonProps = {
  name: string;
  onClick: VoidFunction;
};

const Button = ({ name, onClick }: ButtonProps) => {
  return (
    <button
      className={`rounded-full bg-cyan-300 px-10 py-2 font-emphasize text-base text-white shadow-md`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
