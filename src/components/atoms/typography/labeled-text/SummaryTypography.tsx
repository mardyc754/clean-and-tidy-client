import { LargeTypography } from '~/components/atoms/typography/regular-text';

type SummaryTypographyProps = {
  label: string;
  value: string;
};

const SummaryTypography = ({ label, value }: SummaryTypographyProps) => {
  return (
    <LargeTypography className="flex justify-between">
      {label}
      <span className="font-emphasize text-cyan-500">{value}</span>
    </LargeTypography>
  );
};

export default SummaryTypography;
