type SmallTypographyProps = {
  children: string;
};

const MediumTypography = ({ children }: SmallTypographyProps) => {
  return <p className="text-sm">{children}</p>;
};

export default MediumTypography;
