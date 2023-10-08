type ErrorLabelProps = {
  children: React.ReactNode;
};

const ErrorLabel = ({ children }: ErrorLabelProps) => {
  return <p className="mt-1 text-xs text-red-500">{children}</p>;
};

export default ErrorLabel;
