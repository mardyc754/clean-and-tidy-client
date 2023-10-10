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

import { OrderServiceFormPage } from '~/components/template';

import {
  configureDetailsIndicatorData,
  contactDetailsIndicatorData,
  summaryIndicatorData
} from './constants';
import { StepButtons } from '~/components/organisms/form-fields';

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

export default function OrderService({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <OrderServiceFormPage
      serviceName={`${data?.name}`}
      showSummary={currentStep < 2}
      title="Configure Order Details"
      heading={orderServiceStepData[currentStep]!.heading}
      stepIndicatorData={orderServiceStepData[currentStep]!.stepIndidatorData}
    >
      {orderServiceStepData[currentStep]?.stepComponent}
      <StepButtons
        cancelHref="/"
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        maxStep={2}
      />
    </OrderServiceFormPage>
  );
}

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
  if (!params) {
    return { props: { data: null } };
  }

  const data = await getServiceById(params.id as string, {
    includeSecondaryServices: true
  });

  console.log({ data });

  if ('hasError' in data) {
    return { props: { data: null } };
  }

  return { props: { data } };
}) satisfies GetStaticProps<{ data: Service | null }>;
