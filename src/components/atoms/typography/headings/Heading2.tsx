type Heading2Props = {
  children: string;
  className?: string;
  color?: string;
};

const Heading2 = ({
  children,
  color = 'black',
  className = ''
}: Heading2Props) => {
  return (
    <h2 className={`text-${color} font-emphasize text-6xl ${className}`}>
      {children}
    </h2>
  );
};

export default Heading2;
