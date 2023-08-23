import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import {
  ButtonNavigation,
  SummarySection
} from '~/components/organisms/layout';

import type { StepIndicator } from '~/types/forms';

import type { NavigationButtonProps } from '../atoms/buttons/NavigationButton';

const mockSummaryData = new Map([
  ['Selected offer', 'Home cleaning'],
  ['Cleaning frequency', 'Once a week'],
  ['Cleaning duration', '2 hours'],
  ['First cleaning date', '17.08.2023 8:00']
]);

type OrderCleaningFormPageProps = {
  title: string;
  children: React.ReactNode;
  stepIndicatorData: StepIndicator[];
  heading: string;
  buttonData: NavigationButtonProps[];
};

const OrderCleaningFormPage = ({
  children,
  stepIndicatorData,
  heading,
  title,
  buttonData
}: OrderCleaningFormPageProps) => {
  return (
    <PageWrapper title={title}>
      <div className="flex flex-col p-16">
        <MultiStepFormIndicator stepIndicatorData={stepIndicatorData} />
        <div className="flex justify-between">
          <div className="flex flex-col py-16">
            <Heading1>{heading}</Heading1>
            {children}
          </div>
          <div className="py-16">
            <SummarySection data={mockSummaryData} totalCost={200} />
          </div>
        </div>
        <ButtonNavigation buttonData={buttonData} />
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
