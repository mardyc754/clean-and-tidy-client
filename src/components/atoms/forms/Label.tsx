type LabelProps = {
  htmlFor: string;
  children: string;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="py-1">
      {children}
    </label>
  );
};

export default Label;
