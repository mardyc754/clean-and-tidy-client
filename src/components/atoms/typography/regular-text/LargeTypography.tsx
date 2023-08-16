type LargeTypographyProps = {
  children: string;
  color?: string;
};

const LargeTypography = ({
  children,
  color = 'black'
}: LargeTypographyProps) => {
  return <p className={`text-${color} text-xl`}>{children}</p>;
};

export default LargeTypography;
