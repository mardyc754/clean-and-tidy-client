type Heading1Props = {
  children: string;
  className?: string;
  textSize?: string;
  color?: string;
};

const Heading1 = ({
  children,
  color = 'black',
  className = '',
  textSize = 'text-5xl'
}: Heading1Props) => {
  return (
    <h1 className={`text-${color} font-emphasize ${textSize} ${className}`}>
      {children}
    </h1>
  );
};

export default Heading1;
