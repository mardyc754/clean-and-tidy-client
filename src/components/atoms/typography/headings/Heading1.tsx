type Heading1Props = {
  children: string;
  color?: string;
};

const Heading1 = ({ children, color = 'black' }: Heading1Props) => {
  return (
    <h1 className={`text-${color} font-emphasize text-7xl`}>{children}</h1>
  );
};

export default Heading1;
