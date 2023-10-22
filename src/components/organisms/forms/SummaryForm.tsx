import { useSummaryData } from '~/hooks/useSummaryData';

import { AddressDataField, SummaryView } from '~/components/organisms/layout';
import { Heading2 } from '~/components/atoms/typography/headings';

interface SummaryFormProps {
  serviceName: string;
}

const SummaryForm = ({ serviceName }: SummaryFormProps) => {
  const { summaryData, totalCost, contactDetails } =
    useSummaryData(serviceName);

  return (
    <div className="pt-16">
      <SummaryView
        data={summaryData}
        totalCost={totalCost}
        labelClasses="text-lg"
        valueClasses="text-2xl"
        contentDistribution="stretch"
        summaryTypographySize="large"
      />
      <div className="py-16">
        <Heading2>Address data</Heading2>
        <div className="pt-8">
          <AddressDataField data={contactDetails} />
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
