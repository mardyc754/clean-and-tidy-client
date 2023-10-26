import { useMemo, useState } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

import { getAllServices, getServiceById } from '~/api/services';
import type { Service } from '~/api/schemas/services';

import {
  CleaningDetailsForm,
  ContactDetailsForm,
  SummaryForm
} from '~/components/organisms/forms';
import { StepButtons } from '~/components/organisms/form-fields';
import { OrderServiceFormPage } from '~/components/template';

import {
  configureDetailsIndicatorData,
  contactDetailsIndicatorData,
  summaryIndicatorData
} from './constants';

function getCurrentStepComponent(index: number, data: Service | null) {
  let componentData;

  switch (index) {
    case 1:
      componentData = {
        heading: 'Contact details',
        stepIndidatorData: contactDetailsIndicatorData,
        stepComponent: <ContactDetailsForm />
      };
      break;
    case 2:
      componentData = {
        heading: 'Summary',
        stepIndidatorData: summaryIndicatorData,
        stepComponent: <SummaryForm />
      };
      break;
    case 0:
    default:
      componentData = {
        heading: 'Configure details',
        stepIndidatorData: configureDetailsIndicatorData,
        stepComponent: data ? <CleaningDetailsForm data={data} /> : <></>
      };
  }

  return componentData;
}

export default function OrderService({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepData = useMemo(
    () => getCurrentStepComponent(currentStep, data),
    [currentStep, data]
  );
  return (
    <OrderServiceFormPage
      serviceName={`${data?.name}`}
      showSummary={currentStep < 2}
      title="Configure Order Details"
      heading={currentStepData.heading}
      stepIndicatorData={currentStepData.stepIndidatorData}
    >
      {currentStepData.stepComponent}
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

  if ('hasError' in data) {
    return { props: { data: null } };
  }

  return { props: { data } };
}) satisfies GetStaticProps<{ data: Service | null }>;
