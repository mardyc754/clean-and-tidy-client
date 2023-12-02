import { useEffect, useMemo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { type Service, type ServiceWithUnit } from '~/schemas/api/services';
import {
  type OrderServiceInputData,
  cleaningDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

interface CleaningDetailsFormProps {
  data: Service;
  submitHandler: SubmitHandler<OrderServiceInputData>;
}

export function useCleaningDetailsForm({
  data,
  submitHandler
}: CleaningDetailsFormProps) {
  const { id, name, unit, minNumberOfUnitsIfPrimary, minCostIfPrimary } = data;

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  const {
    onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    getInitialCleaningDetailsFormData,
    getOrderedServicesIds,
    setAvailableEmployees,
    getAvailableEmployeesForService,
    cleaningFrequencyDisplayData,
    totalCost,
    startDate
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      onChangeIncludeDetergents: state.onChangeIncludeDetergents,
      onChangeServiceNumberOfUnits: state.onChangeServiceNumberOfUnits,
      onChangeCleaningFrequency: state.onChangeCleaningFrequency,
      onChangeStartDate: state.onChangeStartDate,
      onChangeHourDate: state.onChangeHourDate,
      currentStep: state.currentStep,
      totalCost: state.totalCost,
      startDate: state.startDate,
      getOrderedServicesIds: state.getOrderedServicesIds,
      getInitialCleaningDetailsFormData:
        state.getInitialCleaningDetailsFormData,
      setAvailableEmployees: state.setAvailableEmployees,
      getAvailableEmployeesForService: state.getAvailableEmployeesForService,
      cleaningFrequencyDisplayData: state.cleaningFrequencyDisplayData
    }))
  );

  const methods = useForm<OrderServiceInputData>({
    defaultValues: getInitialCleaningDetailsFormData(),
    resolver: cleaningDetailsResolver(
      minNumberOfUnitsIfPrimary,
      minCostIfPrimary
    )
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const cleaningFrequencyData = useMemo(
    () => data?.cleaningFrequencies ?? [],
    [data]
  );

  // initialize total cost value
  useEffect(() => {
    methods.register('totalCost', { value: totalCost });
    methods.setValue('totalCost', totalCost);
  }, [methods, totalCost]);

  // handle number of units if the service does not have a unit
  // e.g. furniture cleaning
  useEffect(() => {
    if (!unit) {
      methods.register('numberOfUnits', { value: 0 });
      onChangeServiceNumberOfUnits(
        0,
        true,
        { id, name, unit },
        secondaryServicesWithUnit.length
      );
    }
  }, [
    id,
    methods,
    name,
    onChangeServiceNumberOfUnits,
    secondaryServicesWithUnit?.length,
    unit
  ]);

  const onSubmit = handleSubmit(submitHandler);

  return {
    methods,
    errors,
    serviceData: {
      id,
      name,
      unit,
      minNumberOfUnitsIfPrimary,
      minCostIfPrimary
    },
    cleaningFrequencyData,
    secondaryServicesWithUnit,
    totalCost,
    startDate,
    orderedServicesIds: getOrderedServicesIds(),
    cleaningFrequencyDisplayData,
    onSubmit,
    onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    setAvailableEmployees,
    getAvailableEmployeesForService
  };
}
