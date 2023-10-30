import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

type LabeledTypographyListProps = {
  data: Map<string, string>;
  name: string;
  labelClasses?: string;
  valueClasses?: string;
  contentDistribution?: 'horizontal' | 'vertical' | 'stretch';
};

const LabeledTypographyList = ({
  data,
  name,
  labelClasses = 'text-xs',
  valueClasses = 'text-base',
  contentDistribution = 'vertical'
}: LabeledTypographyListProps) => {
  return (
    <>
      {Array.from(data).map(([key, value]) => (
        <LabeledTypography
          label={key}
          value={value}
          contentDistribution={contentDistribution}
          labelClasses={labelClasses}
          valueClasses={valueClasses}
          key={`${name}-${key}`}
        />
      ))}
    </>
  );
};

export default LabeledTypographyList;
