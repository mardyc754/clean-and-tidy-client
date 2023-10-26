import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { SummarySection } from '~/components/organisms/layout';

import type { StepIndicator } from '~/types/forms';

import type { PageWrapperProps } from './PageWrapper';
import { useSummaryData } from '~/hooks/useSummaryData';

type OrderCleaningFormPageProps = {
  stepIndicatorData: StepIndicator[];
  heading: string;
  showSummary?: boolean;
  serviceName: string;
} & PageWrapperProps;

const OrderCleaningFormPage = ({
  children,
  stepIndicatorData,
  heading,
  title,
  showSummary = false,
  serviceName
}: OrderCleaningFormPageProps) => {
  const { totalCost, summaryData } = useSummaryData(serviceName);

  return (
    <PageWrapper title={title}>
      <div className="flex flex-col p-16">
        <MultiStepFormIndicator stepIndicatorData={stepIndicatorData} />
        <div className="flex justify-evenly">
          <div className={`flex flex-col py-16 ${!showSummary ? 'w-3/5' : ''}`}>
            <Heading1>{heading}</Heading1>
            {children}
          </div>
          {showSummary && (
            <div className="min-w-[20rem] py-16">
              <SummarySection data={summaryData} totalCost={totalCost} />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
