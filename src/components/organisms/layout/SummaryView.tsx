import { SummaryTypography } from '~/components/atoms/typography/labeled-text';

import type { SummaryData } from '~/types/forms';

import LabeledTypographyList from './LabeledTypographyList';

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
      <LabeledTypographyList
        data={data}
        contentDistribution={contentDistribution}
        labelClasses={labelClasses}
        valueClasses={valueClasses}
        name="SummarySection"
      />

      <SummaryTypography
        size={summaryTypographySize}
        label="Total costs"
        value={`${totalCost.toFixed(2)} PLN/visit`}
      />
    </div>
  );
};

export default SummaryView;
