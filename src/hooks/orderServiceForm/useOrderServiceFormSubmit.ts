import { useMutation, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { reservation } from '~/constants/queryKeys';

import { createReservation } from '~/api/reservation';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

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
    totalCost,
    extraInfo
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      decreaseStep: state.decreaseStep,
      currentStep: state.currentStep,
      // reservation creation data
      frequency: state.cleaningFrequencyDisplayData?.value,
      fullStartDate: state.fullStartDate,
      endDate: state.endDate,
      includeDetergents: state.includeDetergents,
      address: state.addressData,
      clientData: state.clientData,
      services: state.orderedServices,
      totalCost: state.totalCost,
      resetOrderServiceForm: state.resetOrderServiceForm,
      extraInfo: state.extraInfo
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
      services: services
        .filter((service) => !!service)
        .map((service) => ({
          serviceId: service!.id,
          ...omit(service, ['name', 'unit', 'id'])
        })),
      extraInfo
    });
  };

  return { onSubmit };
}
