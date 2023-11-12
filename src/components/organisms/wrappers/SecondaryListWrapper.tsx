interface SecondaryListWrapperProps {
  title: string;
  children?: React.ReactNode;
}

const SecondaryListWrapper = ({
  title,
  children
}: SecondaryListWrapperProps) => {
  return (
    <div className="flex flex-col space-y-4 border-t-2 border-t-slate-200 py-4">
      <p className="text-xl font-semibold">{title}</p>
      {children}
    </div>
  );
};

export default SecondaryListWrapper;
