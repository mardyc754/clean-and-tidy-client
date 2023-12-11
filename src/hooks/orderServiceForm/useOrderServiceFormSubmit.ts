import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { reservation } from '~/constants/queryKeys';

import { createReservation } from '~/api/reservation';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';
import { prepareVisitParts } from '~/stores/orderService/utils';

export function useOrderServiceFormSubmit() {
  const queryClient = useQueryClient();

  const {
    // reservation creation data
    frequency,
    fullStartDate,
    endDate,
    includeDetergents,
    address,
    clientData,
    services,
    resetOrderServiceForm,
    extraInfo
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      currentStep: state.currentStep,
      // reservation creation data
      frequency: state.cleaningFrequencyDisplayData?.value,
      includeDetergents: state.includeDetergents,
      address: state.addressData,
      clientData: state.clientData,
      services: state.orderedServices,
      totalCost: state.totalCost,
      extraInfo: state.extraInfo,
      decreaseStep: state.decreaseStep,
      fullStartDate: state.fullStartDate,
      endDate: state.endDate,
      resetOrderServiceForm: state.resetOrderServiceForm
    }))
  );

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
      resetOrderServiceForm();
      useOrderServiceFormStore.persist.clearStorage();

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

    if (!frequency || !fullStartDate() || !endDate()) {
      return;
    }

    mutation.mutate({
      frequency: frequency,
      includeDetergents,
      visitParts: prepareVisitParts(services),
      bookerEmail: clientData.email,
      address,
      contactDetails: clientData,
      services: services
        .filter((service) => !!service)
        .map((service) => ({
          serviceId: service!.id,
          isMainServiceForReservation: service!.isMainServiceForReservation
        })),
      extraInfo
    });
  };

  return { onSubmit };
}
