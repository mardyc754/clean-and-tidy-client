import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { type Service, type ServiceWithUnit } from '~/schemas/api/services';
import {
  type OrderServiceInputData,
  cleaningDetailsResolver
} from '~/schemas/forms/orderService';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

import { Checkbox, NumericInput } from '~/components/atoms/forms';

import {
  CalendarWithHours,
  RadioGroup,
  ServiceMultiSelect,
  StepButtons
} from '../form-fields';

interface CleaningDetailsFormProps {
  data: Service;
}

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const { id, name, unit, minNumberOfUnitsIfPrimary, minCostIfPrimary } = data;
  const {
    onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    getInitialCleaningDetailsFormData,
    currentStep,
    totalCost
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      setData: state.setData,
      onChangeIncludeDetergents: state.onChangeIncludeDetergents,
      onChangeServiceNumberOfUnits: state.onChangeServiceNumberOfUnits,
      onChangeCleaningFrequency: state.onChangeCleaningFrequency,
      onChangeStartDate: state.onChangeStartDate,
      onChangeHourDate: state.onChangeHourDate,
      currentStep: state.currentStep,
      totalCost: state.totalCost,
      getInitialCleaningDetailsFormData: state.getInitialCleaningDetailsFormData
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

  useEffect(() => {
    methods.register('totalCost', { value: totalCost });
    methods.setValue('totalCost', totalCost);
  }, [methods, totalCost]);

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
  }, [id, methods, name, onChangeServiceNumberOfUnits, unit]);

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  const router = useRouter();

  const onSubmit: SubmitHandler<OrderServiceInputData> = async () => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, currentStep: 2 }
    });
  };

  const onDecreaseStep = async () => {
    await router.push('/');
  };

  const mainSlot = unit ? (
    <NumericInput
      min={0}
      max={500}
      name="numberOfUnits"
      label={unit.fullName}
      errorLabel={errors.numberOfUnits?.message}
      onChange={(value: number) =>
        onChangeServiceNumberOfUnits(
          value,
          true,
          { id, name, unit },
          secondaryServicesWithUnit.length
        )
      }
    />
  ) : secondaryServicesWithUnit.length > 0 ? (
    <ServiceMultiSelect
      title="Select services"
      defaultValues={methods.watch('extraServices')}
      name="extraServices"
      data={secondaryServicesWithUnit}
      onChangeNumberOfUnits={onChangeServiceNumberOfUnits}
    />
  ) : null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 py-16">
          {mainSlot}
          {cleaningFrequencyData.length > 1 && (
            <RadioGroup
              name="cleaningFrequency"
              label="Cleaning frequency"
              defaultValue={methods.watch('cleaningFrequency')}
              optionList={cleaningFrequencyData}
              onChange={onChangeCleaningFrequency}
              errorLabel={errors.cleaningFrequency?.message}
            />
          )}
          <Checkbox
            name="includeDetergents"
            label="Detergents"
            caption="Include detergents (+15zł)"
            onChange={onChangeIncludeDetergents}
          />
          <CalendarWithHours
            calendarInputName="startDate"
            hourInputName="hourDate"
            label="Cleaning start date"
            onChangeDate={onChangeStartDate}
            onChangeHour={onChangeHourDate}
            dateErrorLabel={errors.startDate?.message}
            hourErrorLabel={errors.hourDate?.message}
          />
          {secondaryServicesWithUnit.length > 0 && unit && (
            <ServiceMultiSelect
              title="Extra services"
              defaultValues={methods.watch('extraServices')}
              name="extraServices"
              data={secondaryServicesWithUnit}
              onChangeNumberOfUnits={onChangeServiceNumberOfUnits}
            />
          )}
        </div>
        <StepButtons
          submitErrorLabel={errors.totalCost?.message}
          currentStep={currentStep}
          onDecreaseStep={onDecreaseStep}
        />
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
