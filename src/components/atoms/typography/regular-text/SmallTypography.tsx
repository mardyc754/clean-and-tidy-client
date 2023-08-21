type SmallTypographyProps = {
  children: string;
};

const SmallTypography = ({ children }: SmallTypographyProps) => {
  return <p className="text-xs">{children}</p>;
};

export default SmallTypography;
