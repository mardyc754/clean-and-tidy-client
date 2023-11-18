import { useRouter } from 'next/router';
import { useMemo } from 'react';
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
  ExtraDataMultiSelect,
  RadioGroup,
  StepButtons
} from '../form-fields';

interface CleaningDetailsFormProps {
  data: Service;
}

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const { id, name, unit } = data;
  const {
    onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    getInitialCleaningDetailsFormData,
    currentStep
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      setData: state.setData,
      onChangeIncludeDetergents: state.onChangeIncludeDetergents,
      onChangeServiceNumberOfUnits: state.onChangeServiceNumberOfUnits,
      onChangeCleaningFrequency: state.onChangeCleaningFrequency,
      onChangeStartDate: state.onChangeStartDate,
      onChangeHourDate: state.onChangeHourDate,
      currentStep: state.currentStep,
      getInitialCleaningDetailsFormData: state.getInitialCleaningDetailsFormData
    }))
  );

  const methods = useForm<OrderServiceInputData>({
    defaultValues: getInitialCleaningDetailsFormData(),
    resolver: cleaningDetailsResolver
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const cleaningFrequencyData = useMemo(
    () => data?.cleaningFrequencies ?? [],
    [data]
  );

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

  return (
    <FormProvider {...methods}>
      <form className="py-16" onSubmit={handleSubmit(onSubmit)}>
        <NumericInput
          min={0}
          max={500}
          name="numberOfUnits"
          label="Area size (in m2)"
          wrapperClassName="items-center py-4"
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
          className="py-4"
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
        {secondaryServicesWithUnit.length > 0 && (
          <ExtraDataMultiSelect
            defaultValues={methods.watch('extraServices')}
            name="extraServices"
            className="py-4"
            data={secondaryServicesWithUnit}
            onChangeNumberOfUnits={onChangeServiceNumberOfUnits}
          />
        )}
        {/* <StepButtons currentStep={currentStep} onDecreaseStep={decreaseStep} /> */}
        <StepButtons
          currentStep={currentStep}
          onDecreaseStep={onDecreaseStep}
        />
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
