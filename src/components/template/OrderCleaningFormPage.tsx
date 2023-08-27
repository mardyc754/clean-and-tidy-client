import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import {
  ButtonNavigation,
  SummarySection
} from '~/components/organisms/layout';

import type { StepIndicator } from '~/types/forms';

import type { NavigationButtonProps } from '../atoms/buttons/NavigationButton';
import type { PageWrapperProps } from './PageWrapper';

const mockSummaryData = new Map([
  ['Selected offer', 'Home cleaning'],
  ['Cleaning frequency', 'Once a week'],
  ['Cleaning duration', '2 hours'],
  ['First cleaning date', '17.08.2023 8:00']
]);

type OrderCleaningFormPageProps = {
  stepIndicatorData: StepIndicator[];
  heading: string;
  buttonData: NavigationButtonProps[];
  showSummary?: boolean;
} & PageWrapperProps;

const OrderCleaningFormPage = ({
  children,
  stepIndicatorData,
  heading,
  title,
  buttonData,
  showSummary = false
}: OrderCleaningFormPageProps) => {
  return (
    <PageWrapper title={title}>
      <div className="flex flex-col p-16">
        <MultiStepFormIndicator stepIndicatorData={stepIndicatorData} />
        <div className="flex justify-between">
          <div
            className={`flex ${
              showSummary ? 'w-3/5' : 'w-full'
            } flex-col py-16`}
          >
            <Heading1>{heading}</Heading1>
            {children}
          </div>
          {showSummary && (
            <div className="w-1/3 py-16">
              <SummarySection data={mockSummaryData} totalCost={200} />
            </div>
          )}
        </div>
        <ButtonNavigation buttonData={buttonData} />
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
