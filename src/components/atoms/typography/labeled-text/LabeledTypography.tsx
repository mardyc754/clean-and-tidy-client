import clsx from 'clsx';

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
    ['horizontal', 'md:items-center md:gap-2 md:flex-row'],
    ['vertical', ''],
    ['stretch', 'md:items-center md:justify-between md:flex-row']
  ]);
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        wrapperClasses.get(contentDistribution) ?? '',
        'py-2'
      )}
    >
      <p className={labelClasses}>{label}</p>
      <p className={`font-emphasize ${valueClasses}`}>{value}</p>
    </div>
  );
};

export default LabeledTypography;
