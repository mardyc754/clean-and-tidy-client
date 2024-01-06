import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { type Service } from '~/schemas/api/services';

import { useOrderServiceFormStore } from '~/stores/orderService/orderServiceFormStore';

import { useCleaningDetailsForm } from '~/hooks/orderServiceForm/useCleaningDetailsForm';
import { useOrderServiceFormNavigation } from '~/hooks/orderServiceForm/useOrderServiceFormNavigation';
import { useServicesBusyHours } from '~/hooks/orderServiceForm/useServicesBusyHours';

import { FormCheckbox, NumericInput } from '~/components/atoms/forms';

import { extractYearAndMonthFromDateToString } from '~/utils/dateUtils';

import {
  CalendarWithHours,
  NumericInputMultiSelect,
  RadioGroup,
  StepButtons
} from '../form-fields';

interface CleaningDetailsFormProps {
  data: Service;
}

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const { unit, id, name, detergentsCost } = data;
  const { onChangeStep, returnToHomePage } = useOrderServiceFormNavigation();

  const [period, setPeriod] = useState<string | undefined>(undefined);

  const {
    methods,
    errors,
    cleaningFrequencyData,
    secondaryServicesWithUnit,
    orderedServicesIds,
    onSubmit
  } = useCleaningDetailsForm({
    data,
    submitHandler: async () => await onChangeStep(2)
  });

  const {
    onChangeDetergentsCost,
    onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency,
    onChangeStartDate,
    onChangeHourDate,
    setAvailableEmployees,
    getAvailableEmployeesForService,
    isReservationAvailable,
    cleaningFrequencyDisplayData,
    duration,
    startDate
  } = useOrderServiceFormStore(
    useShallow((state) => ({
      onChangeDetergentsCost: state.onChangeDetergentsCost,
      onChangeServiceNumberOfUnits: state.onChangeServiceNumberOfUnits,
      onChangeCleaningFrequency: state.onChangeCleaningFrequency,
      onChangeStartDate: state.onChangeStartDate,
      onChangeHourDate: state.onChangeHourDate,
      setAvailableEmployees: state.setAvailableEmployees,
      getAvailableEmployeesForService: state.getAvailableEmployeesForService,
      cleaningFrequencyDisplayData: state.cleaningFrequencyDisplayData,
      duration: state.durationInMinutes,
      startDate: state.startDate,
      isReservationAvailable: state.isReservationAvailable
    }))
  );

  useEffect(() => {
    if (startDate) {
      setPeriod(extractYearAndMonthFromDateToString(startDate));
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
    period,
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
    <NumericInputMultiSelect
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
          {detergentsCost && detergentsCost > 0 && (
            <FormCheckbox
              name="includeDetergents"
              label="Detergents"
              caption={`Include detergents (+${detergentsCost} PLN)`}
              onChange={(newValue: boolean) =>
                onChangeDetergentsCost(
                  newValue ? detergentsCost : -detergentsCost
                )
              }
            />
          )}
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
            disableHourSelection={!busyHoursData?.employees.length}
          />
          {secondaryServicesWithUnit.length > 0 && unit && (
            <NumericInputMultiSelect
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
          submitButtonDisabled={!isReservationAvailable}
        />
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
