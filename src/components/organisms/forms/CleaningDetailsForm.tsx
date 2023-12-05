import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import { type Service } from '~/schemas/api/services';

import { getAssignedEmployees } from '~/stores/orderService/utils';

import { useCleaningDetailsForm } from '~/hooks/orderServiceForm/useCleaningDetailsForm';
import { useOrderServiceFormNavigation } from '~/hooks/orderServiceForm/useOrderServiceFormNavigation';
import { useServicesBusyHours } from '~/hooks/orderServiceForm/useServicesBusyHours';

import { Checkbox, NumericInput } from '~/components/atoms/forms';

import {
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek
} from '~/utils/dateUtils';

import type { TimeRange } from '~/types/forms';

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
  const { unit, id, name } = data;
  const { onChangeStep, returnToHomePage } = useOrderServiceFormNavigation();

  const [availablityRange, setAvailablityRange] = useState<
    TimeRange | undefined
  >(undefined);

  const {
    methods,
    errors,
    cleaningFrequencyData,
    secondaryServicesWithUnit,
    startDate,
    orderedServicesIds,
    cleaningFrequencyDisplayData,
    duration,
    onSubmit,
    onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    setAvailableEmployees,
    getAvailableEmployeesForService,
    canAddMoreServices
  } = useCleaningDetailsForm({
    data,
    submitHandler: async () => await onChangeStep(2)
  });

  useEffect(() => {
    if (startDate) {
      setAvailablityRange({
        // from: startOfDay(startDate).toISOString(),
        // to: endOfDay(startDate).toISOString()
        from: startOfWeek(startDate).toISOString(),
        to: endOfWeek(startDate).toISOString()
      });
    }
  }, [startDate]);

  // in order to call the query more frequently,
  // we can either disable cache for this query
  // or provide a "day" query param
  const { busyHoursData } = useServicesBusyHours({
    serviceIds:
      orderedServicesIds.length > 0
        ? Array.from(new Set([id, ...orderedServicesIds]))
        : [id],
    ...availablityRange,
    frequency: cleaningFrequencyDisplayData?.value
  });

  useEffect(() => {
    if (busyHoursData) {
      setAvailableEmployees([...busyHoursData?.employees]);
    }
  }, [busyHoursData, setAvailableEmployees]);

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
      <form onSubmit={onSubmit}>
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
            busyHours={busyHoursData?.busyHours ?? []}
            currentDuration={duration}
            direction="column"
          />
          {secondaryServicesWithUnit.length > 0 && unit && (
            <ServiceMultiSelect
              title="Extra services"
              defaultValues={methods.watch('extraServices')}
              name="extraServices"
              data={secondaryServicesWithUnit}
              onChangeNumberOfUnits={onChangeServiceNumberOfUnits}
              serviceAvailabilityGetter={getAvailableEmployeesForService}
            />
          )}
        </div>
        <StepButtons
          submitErrorLabel={errors.totalCost?.message}
          currentStep={1}
          onDecreaseStep={returnToHomePage}
        />
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
