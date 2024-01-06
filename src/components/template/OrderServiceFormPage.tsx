import { useSummaryData } from '~/hooks/useSummaryData';

import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { SummarySection } from '~/components/organisms/layout';
import { PageWrapper } from '~/components/template';

import type { StepIndicator } from '~/types/forms';

import type { PageWrapperProps } from './PageWrapper';

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
      <div className="flex flex-col px-8 py-16 md:px-16">
        <MultiStepFormIndicator stepIndicatorData={stepIndicatorData} />
        <div className="flex flex-col justify-evenly lg:flex-row">
          <div className={`flex flex-1 flex-col py-16 md:px-16`}>
            <Heading1>{heading}</Heading1>
            {children}
          </div>
          {showSummary && (
            <div className="py-16 md:min-w-[24rem]">
              <SummarySection data={summaryData} totalCost={totalCost} />
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
