type MediumTypographyProps = {
  children: string;
  className?: string;
};

const MediumTypography = ({
  children,
  className = ''
}: MediumTypographyProps) => {
  return <p className={`text-base ${className}`}>{children}</p>;
};

export default MediumTypography;
