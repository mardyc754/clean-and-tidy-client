type SmallTypographyProps = {
  children: string;
};

const MediumTypography = ({ children }: SmallTypographyProps) => {
  return <p>{children}</p>;
};

export default MediumTypography;
