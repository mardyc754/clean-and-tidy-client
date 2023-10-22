import { useShallow } from 'zustand/react/shallow';

import { Heading1 } from '~/components/atoms/typography/headings';
import { MultiStepFormIndicator } from '~/components/molecules';
import { PageWrapper } from '~/components/template';
import { SummarySection } from '~/components/organisms/layout';

import type { NullableDate, StepIndicator } from '~/types/forms';

import type { PageWrapperProps } from './PageWrapper';

import {
  displayDayDateAndHourDate,
  displayTimeInHours
} from '~/utils/dateUtils';
import { EMPTY_DATA_PLACEHOLDER } from '~/utils/constants';
import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

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
  const { totalCost, totalDuration, cleaningFrequency, startDate, hourDate } =
    useOrderServiceFormStore(
      useShallow((state) => ({
        orderServiceFormData: state.orderServiceFormData,
        totalCost: state.totalCost,
        totalDuration: state.durationInMinutes,
        cleaningFrequency: state.cleaningFrequencyDisplayData,
        startDate: state.startDate,
        hourDate: state.hourDate
      }))
    );

  const summaryData = new Map([
    ['Selected service', `${serviceName}`],
    [
      'Cleaning frequency',
      `${cleaningFrequency?.name ?? EMPTY_DATA_PLACEHOLDER}`
    ],
    ['Cleaning duration', `${displayTimeInHours(totalDuration)}`],
    [
      'First cleaning date',
      `${displayDayDateAndHourDate(
        startDate as NullableDate,
        hourDate as NullableDate
      )}`
    ]
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
      </div>
    </PageWrapper>
  );
};

export default OrderCleaningFormPage;
