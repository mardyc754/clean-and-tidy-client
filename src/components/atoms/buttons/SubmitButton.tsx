type ButtonProps = {
  name: string;
};

const SubmitButton = ({ name }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`rounded-full bg-cyan-500 px-10 py-2 font-emphasize text-base text-white shadow-md`}
    >
      {name}
    </button>
  );
};

export default SubmitButton;
