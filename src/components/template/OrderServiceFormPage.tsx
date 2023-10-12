import { useShallow } from 'zustand/react/shallow';

import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { SummarySection } from '~/components/organisms/layout';

import type { StepIndicator } from '~/types/forms';

import type { PageWrapperProps } from './PageWrapper';
import { useOrderServiceDataStore } from '~/stores';

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
  const { cleaningFrequency, totalDuration, totalCost, startDate } =
    useOrderServiceDataStore(
      useShallow((state) => ({
        cleaningFrequency: state.cleaningFrequency,
        totalDuration: state.totalDuration,
        totalCost: state.totalCost,
        startDate: state.startDate
      }))
    );

  const summaryData = new Map([
    ['Selected service', `${serviceName}`],
    ['Cleaning frequency', 'Once a week'],
    ['Cleaning duration', `${totalDuration} minutes`],
    ['First cleaning date', '17.08.2023 8:00']
  ]);

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
        {/* <ButtonNavigation buttonData={buttonData} /> */}
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
