import {
  MediumTypography,
  SmallTypography
} from '~/components/atoms/typography/regular-text';

type LabeledTypographyProps = {
  label: string;
  value: string;
};

const LabeledTypography = ({ label, value }: LabeledTypographyProps) => {
  return (
    <div className="flex flex-col py-2">
      <SmallTypography>{label}</SmallTypography>
      <MediumTypography className="font-emphasize">{value}</MediumTypography>
    </div>
  );
};

export default LabeledTypography;
