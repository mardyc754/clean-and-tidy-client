import { useState } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
// import type { Merge } from 'type-fest';

import { getAllServices, getServiceById } from '~/api/services';
import type { Service } from '~/api/schemas/services';

import {
  CleaningDetailsForm,
  ContactDetailsForm,
  SummaryForm
} from '~/components/organisms/forms';

import { OrderCleaningFormPage } from '~/components/template';

import { Button } from '~/components/atoms/buttons';

import {
  configureDetailsIndicatorData,
  contactDetailsIndicatorData,
  summaryIndicatorData
} from './constants';

const orderServiceStepData = [
  {
    heading: 'Configure details',
    stepIndidatorData: configureDetailsIndicatorData,
    stepComponent: <CleaningDetailsForm />
  },
  {
    heading: 'Contact details',
    stepIndidatorData: contactDetailsIndicatorData,
    stepComponent: <ContactDetailsForm />
  },
  {
    heading: 'Summary',
    stepIndidatorData: summaryIndicatorData,
    stepComponent: <SummaryForm />
  }
];

// const exampleSingleReservationData = {
//   id: 1, // or UUID
//   name: 'Home Cleaning',
//   duration: 2,
//   date: new Date(2023, 7, 17, 8)
// };

// type StringifiedReservationData = Merge<
//   Omit<SingleReservationData, 'date'>,
//   { date: string }
// >;

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths = async () => {
  const data = await getAllServices({ primaryOnly: true });
  if ('hasError' in data) {
    return { paths: [] }; // temporary
  }

  return {
    paths: data.map(({ id }) => ({
      params: {
        id: `${id}`
      }
    })),
    fallback: false
  };
};

export const getStaticProps = (async ({ params }) => {
  const data = await getServiceById(params?.id as string);
  if ('hasError' in data) {
    return { props: { data: null } };
  }

  return { props: { data } };
}) satisfies GetStaticProps<{ data: Service | null }>;

export default function OrderService({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <OrderCleaningFormPage
      serviceName={`${data?.name}`}
      showSummary
      title="Configure Order Details"
      heading={orderServiceStepData[currentStep]!.heading}
      stepIndicatorData={orderServiceStepData[currentStep]!.stepIndidatorData}
      buttonData={[
        { name: 'Return', navigateOnClickTo: '/' },
        { name: 'Continue', navigateOnClickTo: '/order/contact-details' }
      ]}
    >
      {orderServiceStepData[currentStep]?.stepComponent}
      <div className="m-0 flex w-full justify-between">
        <Button
          onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))}
          className="w-72 flex-1 py-4"
        >
          Return
        </Button>
        <Button
          onClick={() => setCurrentStep((prev) => (prev < 2 ? prev + 1 : prev))}
          className="w-72 flex-1 py-4"
        >
          Continue
        </Button>
      </div>
    </OrderCleaningFormPage>
  );
}
