import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { reservation } from '~/constants/queryKeys';

import { createReservation } from '~/api/reservation';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

import { useSummaryData } from '~/hooks/useSummaryData';

import { Heading2 } from '~/components/atoms/typography/headings';
import { AddressDataField, SummaryView } from '~/components/organisms/layout';

import { StepButtons } from '../form-fields';

interface SummaryFormProps {
  serviceName: string;
}

const SummaryForm = ({ serviceName }: SummaryFormProps) => {
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: createReservation,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: reservation.all });
      await router.push(
        {
          pathname: '/order-service/success',
          query: {
            reservationName: data.name,
            email: clientData.email
          }
        },
        '/order-service/success'
      );
      toast.dismiss();
    },
    onError: async (error) => {
      await router.push(
        {
          pathname: '/order-service/error',
          query: { message: error.message }
        },
        '/order-service/error'
      );
      toast.dismiss();
    }
  });

  useEffect(() => {
    if (mutation.status === 'pending') {
      toast.loading('Creating reservation...');
    }
  }, [mutation.status]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      frequency: frequency!,
      visitData: {
        startDate: (fullStartDate() as Date).toISOString(),
        endDate: (endDate() as Date).toISOString(),
        cost: totalCost,
        includeDetergents,
        employeeIds: [2] // TODO: get employee ids from backend
      },
      bookerEmail: clientData.email,
      address,
      contactDetails: clientData,
      services: services.map((service) => ({
        serviceId: service.id,
        ...omit(service, ['name', 'unit', 'id'])
      }))
    });
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
