import { omit } from 'lodash';
import { useShallow } from 'zustand/react/shallow';

import { createRecurringReservation } from '~/api/reservation';

import { useSummaryData } from '~/hooks/useSummaryData';

import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

import { AddressDataField, SummaryView } from '~/components/organisms/layout';
import { Heading2 } from '~/components/atoms/typography/headings';

import { StepButtons } from '../form-fields';
import { useRouter } from 'next/router';

interface SummaryFormProps {
  serviceName: string;
}

const SummaryForm = ({ serviceName }: SummaryFormProps) => {
  const {
    decreaseStep,
    currentStep,
    // recurring reservation creation data
    frequency,
    fullStartDate,
    endDate,
    includeDetergents,
    address,
    clientData,
    services
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      decreaseStep: state.decreaseStep,
      currentStep: state.currentStep,
      // recurring reservation creation data
      frequency: state.cleaningFrequencyDisplayData?.value,
      fullStartDate: state.fullStartDate,
      endDate: state.endDate,
      includeDetergents: state.includeDetergents,
      address: state.addressData,
      clientData: state.clientData,
      services: state.orderedServices
    }))
  );

  const { summaryData, totalCost, contactDetails } =
    useSummaryData(serviceName);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recurringReservation = await createRecurringReservation({
      frequency: frequency!,
      reservationData: {
        startDate: (fullStartDate() as Date).toISOString(),
        endDate: (endDate() as Date).toISOString(),
        cost: totalCost,
        includeDetergents,
        employeeIds: [2] // TODO: get employee ids from backend
      },
      clientId: 1, // TODO: get client id from the auth provider
      address,
      contactDetails: clientData,
      services: services.map((service) => ({
        serviceId: service.id,
        ...omit(service, ['name', 'unit', 'id'])
      }))
    });

    if (!recurringReservation || 'hasError' in recurringReservation) {
      await router.push(
        {
          pathname: '/order-service/error',
          query: { message: recurringReservation?.message }
        },
        '/order-service/error'
      );
    } else {
      await router.push(
        {
          pathname: '/order-service/success',
          query: {
            reservationName: recurringReservation.name,
            email: clientData.email
          }
        },
        '/order-service/success'
      );
    }
  };

  const onDecreaseStep = async () => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, currentStep: 2 }
    });
  };

  return (
    <form className="pt-16" onSubmit={onSubmit}>
      <SummaryView
        data={summaryData}
        totalCost={totalCost}
        labelClasses="text-lg"
        valueClasses="text-2xl"
        contentDistribution="stretch"
        summaryTypographySize="large"
      />
      <div className="py-16">
        <Heading2>Address data</Heading2>
        <div className="pt-8">
          <AddressDataField data={contactDetails} />
        </div>
      </div>
      {/* <StepButtons currentStep={currentStep} onDecreaseStep={decreaseStep} /> */}
      <StepButtons currentStep={3} onDecreaseStep={onDecreaseStep} />
    </form>
  );
};

export default SummaryForm;
