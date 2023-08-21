import type { SummaryData } from '~/types/forms';
import { Heading2 } from '~/components/atoms/typography/headings';
import {
  LabeledTypography,
  SummaryTypography
} from '~/components/atoms/typography/labeled-text';

type SummarySectionProps = {
  data: SummaryData;
  totalCost: number;
};

const SummarySection = ({ data, totalCost }: SummarySectionProps) => {
  return (
    <div className="sticky top-8 rounded-lg bg-white p-16 shadow-md">
      <Heading2>Summary</Heading2>
      <div className="py-4">
        {Array.from(data).map(([key, value]) => (
          <LabeledTypography
            label={key}
            value={value}
            key={`SummarySection-${key}`}
          />
        ))}
      </div>
      <div className="border-t-4 py-4">
        <SummaryTypography label="Total costs" value={`${totalCost} zł`} />
      </div>
    </div>
  );
};

export default SummarySection;
