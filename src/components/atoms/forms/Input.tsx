type InputProps = {
  name: string;
  placeholder: string;
};

const Input = ({ name, placeholder }: InputProps) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      className="rounded-lg px-8 py-4"
    />
  );
};

export default Input;
