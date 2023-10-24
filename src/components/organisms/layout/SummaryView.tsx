import type { SummaryData } from '~/types/forms';
import {
  LabeledTypography,
  SummaryTypography
} from '~/components/atoms/typography/labeled-text';

type SummarySectionProps = {
  data: SummaryData;
  totalCost: number;
  labelClasses?: string;
  valueClasses?: string;
  contentDistribution?: 'horizontal' | 'vertical' | 'stretch';
  summaryTypographySize?: 'medium' | 'large';
};

const SummaryView = ({
  data,
  totalCost,
  labelClasses = 'text-xs',
  valueClasses = 'text-base',
  contentDistribution = 'vertical',
  summaryTypographySize = 'medium'
}: SummarySectionProps) => {
  return (
    <div className="flex flex-col">
      {Array.from(data).map(([key, value]) => (
        <LabeledTypography
          label={key}
          value={value}
          contentDistribution={contentDistribution}
          labelClasses={labelClasses}
          valueClasses={valueClasses}
          key={`SummarySection-${key}`}
        />
      ))}
      <SummaryTypography
        size={summaryTypographySize}
        label="Total costs"
        value={`${totalCost} zł/visit`}
      />
    </div>
  );
};

export default SummaryView;
