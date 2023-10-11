import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import {
  // ButtonNavigation,
  SummarySection
} from '~/components/organisms/layout';

import type { StepIndicator } from '~/types/forms';

// import type { NavigationButtonProps } from '../atoms/buttons/NavigationButton';
import type { PageWrapperProps } from './PageWrapper';

// const mockSummaryData = new Map([
//   ['Selected offer', 'Home cleaning'],
//   ['Cleaning frequency', 'Once a week'],
//   ['Cleaning duration', '2 hours'],
//   ['First cleaning date', '17.08.2023 8:00']
// ]);

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
  const summaryData = new Map([
    ['Selected service', `${serviceName}`],
    ['Cleaning frequency', 'Once a week'],
    ['Cleaning duration', '2 hours'],
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
              <SummarySection data={summaryData} totalCost={200} />
            </div>
          )}
        </div>
        {/* <ButtonNavigation buttonData={buttonData} /> */}
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;