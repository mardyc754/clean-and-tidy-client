type Heading1Props = {
  children: string;
  className?: string;
  color?: string;
};

const Heading1 = ({
  children,
  color = 'black',
  className = ''
}: Heading1Props) => {
  return (
    <h1 className={`text-${color} font-emphasize text-7xl ${className}`}>
      {children}
    </h1>
  );
};

export default Heading1;
