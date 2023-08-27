type LabelProps = {
  htmlFor: string;
  children: string;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="py-1 capitalize">
      {children}
    </label>
  );
};

export default Label;
