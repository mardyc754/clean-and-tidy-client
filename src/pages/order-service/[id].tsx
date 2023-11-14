import { useMemo } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { type NextRouter, withRouter } from 'next/router';

import {
  configureDetailsIndicatorData,
  contactDetailsIndicatorData,
  summaryIndicatorData
} from '~/constants/orderServiceForm';

import { getAllServices, getServiceById } from '~/api/services';

import type { Service } from '~/schemas/api/services';

import { EMPTY_DATA_PLACEHOLDER } from '~/constants/primitives';

import {
  CleaningDetailsForm,
  ContactDetailsForm,
  SummaryForm
} from '~/components/organisms/forms';
import { OrderServiceFormPage } from '~/components/template';

function getCurrentStepComponent(index: number, data: Service | null) {
  let componentData;

  switch (index) {
    case 2:
      componentData = {
        heading: 'Contact details',
        stepIndidatorData: contactDetailsIndicatorData,
        stepComponent: <ContactDetailsForm />
      };
      break;
    case 3:
      componentData = {
        heading: 'Summary',
        stepIndidatorData: summaryIndicatorData,
        stepComponent: <SummaryForm serviceName={data?.name ?? ''} />
      };
      break;
    case 1:
    default:
      componentData = {
        heading: 'Configure details',
        stepIndidatorData: configureDetailsIndicatorData,
        stepComponent: data ? <CleaningDetailsForm data={data} /> : <></>
      };
  }

  return componentData;
}

function OrderService({
  data,
  router
}: InferGetStaticPropsType<typeof getStaticProps> & { router: NextRouter }) {
  // InferGetServerSidePropsType<typeof getServerSideProps> & {
  // router: NextRouter;
  // }) {

  // const { currentStep } = useOrderServiceFormStore((state) => ({
  //   currentStep: state.currentStep
  // }));

  // const router = useRouter();
  // const query = router.query;

  const currentStep = useMemo(() => {
    const step = router.query.currentStep;
    if (typeof step === 'string') {
      return parseInt(step);
    }

    return 0;
  }, [router.query.currentStep]);
  // console.log(query);

  const currentStepData = useMemo(
    () => getCurrentStepComponent(currentStep, data),
    [currentStep, data]
  );

  return (
    <OrderServiceFormPage
      serviceName={`${data?.name ?? EMPTY_DATA_PLACEHOLDER}`}
      showSummary={currentStep < 3}
      title="Configure Order Details"
      heading={currentStepData.heading}
      stepIndicatorData={currentStepData.stepIndidatorData}
    >
      {currentStepData.stepComponent}
      {/* <StepButtons
        cancelHref="/"
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        maxStep={2}
      /> */}
    </OrderServiceFormPage>
  );
}

export const getStaticPaths = async () => {
  const data = await getAllServices({ primaryOnly: true });
  if ('hasError' in data) {
    return { paths: [], fallback: false }; // temporary
  }

  return {
    paths: data.map(({ id }) => ({
      params: {
        id: `${id}`
      }
    })),
    fallback: true
  };
};

export const getStaticProps = (async ({ params }) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const data = await getServiceById(params.id as string, {
    includeSecondaryServices: true,
    includeCleaningFrequencies: true
  });

  if ('hasError' in data) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data
    }
  };
}) satisfies GetStaticProps<{ data: Service | null }>;

// export const getServerSideProps = (async (ctx) => {
//   const { params } = ctx;
//   if (!params) {
//     return {
//       notFound: true
//     };
//   }

//   const data = await getServiceById(params.id as string, {
//     includeSecondaryServices: true,
//     includeCleaningFrequencies: true
//   });

//   if ('hasError' in data) {
//     return {
//       notFound: true
//     };
//   }

//   return {
//     props: {
//       data,
//       ...(await prefetchUserData(ctx))
//     }
//   };
// }) satisfies GetServerSideProps<{ data: Service | null }>;

export default withRouter(OrderService);
