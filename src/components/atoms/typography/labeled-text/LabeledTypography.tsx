type LabeledTypographyProps = {
  label: string;
  value: string;
  contentDistribution?: 'vertical' | 'horizontal' | 'stretch';
  labelClasses?: string;
  valueClasses?: string;
};

const LabeledTypography = ({
  label,
  value,
  contentDistribution = 'vertical',
  labelClasses = 'text-xs',
  valueClasses = 'text-base'
}: LabeledTypographyProps) => {
  const wrapperClasses = new Map<typeof contentDistribution, string>([
    ['horizontal', 'items-center gap-2'],
    ['vertical', 'flex-col'],
    ['stretch', 'items-center justify-between']
  ]);
  return (
    <div
      className={`flex ${wrapperClasses.get(contentDistribution) ?? ''} py-2`}
    >
      <p className={labelClasses}>{label}</p>
      <p className={`font-emphasize ${valueClasses}`}>{value}</p>
    </div>
  );
};

export default LabeledTypography;
