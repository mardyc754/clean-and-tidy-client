import { Heading2 } from '~/components/atoms/typography/headings';

import type { SummaryData } from '~/types/forms';

import SummaryView from './SummaryView';

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
      <SummaryView data={data} totalCost={totalCost} />
    </div>
  );
};

export default SummarySection;
