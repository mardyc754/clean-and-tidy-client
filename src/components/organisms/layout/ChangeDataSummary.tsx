import { Heading2 } from '~/components/atoms/typography/headings';
import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import type { SummaryData } from '~/types/forms';

type ChangeDataSummaryProps = {
  data: SummaryData;
};

const ChangeDataSummary = ({ data }: ChangeDataSummaryProps) => {
  return (
    <div className="sticky top-8 rounded-lg bg-white px-16 py-8 shadow-md">
      <div className="pb-4">
        <Heading2 className="text-center">Summary</Heading2>
      </div>
      <div className="flex flex-col">
        {Array.from(data).map(([key, value]) => (
          <LabeledTypography
            label={key}
            value={value}
            contentDistribution="vertical"
            key={`ChangeDataSummary-${key}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChangeDataSummary;
