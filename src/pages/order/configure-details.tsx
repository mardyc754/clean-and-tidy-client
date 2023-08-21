import { Heading1 } from '~/components/atoms/typography/headings';
import { CleaningDetailsForm } from '~/components/organisms/forms';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';

import { configureDetailsIndicatorData } from './constants';
import { SummarySection } from '~/components/organisms/layout';

const mockSummaryData = new Map([
  ['Selected offer', 'Home cleaning'],
  ['Cleaning frequency', 'Once a week'],
  ['Cleaning duration', '2 hours'],
  ['First cleaning date', '17.08.2023 8:00']
]);

const ConfigureDetails = () => {
  return (
    <PageWrapper title="Configure order details">
      <div className="flex flex-col p-16">
        <MultiStepFormIndicator
          stepIndicatorData={configureDetailsIndicatorData}
        />
        <div className="flex justify-between">
          <div className="flex flex-col py-16">
            <Heading1>Configure Details</Heading1>
            <CleaningDetailsForm />
          </div>
          <div className="py-16">
            <SummarySection data={mockSummaryData} totalCost={200} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ConfigureDetails;
