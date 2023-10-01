type Heading2Props = {
  children: string;
  className?: string;
  textSize?: string;
  color?: string;
};

const Heading2 = ({
  children,
  color = 'black',
  className = '',
  textSize = 'text-4xl'
}: Heading2Props) => {
  return (
    <h2 className={`text-${color} font-emphasize ${textSize} ${className}`}>
      {children}
    </h2>
  );
};

export default Heading2;
