type LargeTypographyProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
};

const LargeTypography = ({
  children,
  color = 'black',
  className = ''
}: LargeTypographyProps) => {
  return <p className={`text-${color} text-xl ${className}`}>{children}</p>;
};

export default LargeTypography;
