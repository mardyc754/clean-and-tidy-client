import { Heading2 } from '~/components/atoms/typography/headings';
import { SummaryTypography } from '~/components/atoms/typography/labeled-text';

import type { SummaryData } from '~/types/forms';

import LabeledTypographyList from './LabeledTypographyList';

type SummarySectionProps = {
  data: SummaryData;
  totalCost: number;
};

const SummarySection = ({ data, totalCost }: SummarySectionProps) => {
  return (
    <div className="sticky top-8 rounded-lg bg-white p-8 shadow-md">
      <div className="pb-4">
        <Heading2 className="text-center">Summary</Heading2>
      </div>
      <div className="flex flex-col">
        <LabeledTypographyList
          data={data}
          contentDistribution="vertical"
          labelClasses="text-xs"
          valueClasses="text-base"
          name="SummarySection"
        />

        <SummaryTypography
          size="medium"
          label="Total cost"
          value={`${totalCost.toFixed(2)} PLN/visit`}
        />
      </div>
    </div>
  );
};

export default SummarySection;
