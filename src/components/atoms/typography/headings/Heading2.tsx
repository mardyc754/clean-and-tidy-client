type Heading2Props = {
  children: string;
  color?: string;
};

const Heading2 = ({ children, color = 'black' }: Heading2Props) => {
  return (
    <h2 className={`text-${color} font-emphasize text-6xl`}>{children}</h2>
  );
};

export default Heading2;
