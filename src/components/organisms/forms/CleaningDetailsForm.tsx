import { useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { cleaningDetailsResolver } from '~/api/resolvers/orderServiceForm';
import type { Service, ServiceWithUnit } from '~/api/schemas/services';
import type { OrderServiceInputData } from '~/api/schemas/reservation';

import { Checkbox, NumericInput } from '~/components/atoms/forms';

import {
  CalendarWithHours,
  ExtraDataMultiSelect,
  RadioGroup
} from '../form-fields';
import { useOrderServiceFormStore } from '~/stores/orderServiceFormStore';

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
    onChangeHourDate
  } = useOrderServiceFormStore((state) => ({
    setData: state.setData,
    onChangeIncludeDetergents: state.onChangeIncludeDetergents,
    onChangeServiceNumberOfUnits: state.onChangeServiceNumberOfUnits,
    onChangeCleaningFrequency: state.onChangeCleaningFrequency,
    onChangeStartDate: state.onChangeStartDate,
    onChangeHourDate: state.onChangeHourDate
  }));

  const methods = useForm<OrderServiceInputData>({
    defaultValues: {
      numberOfUnits: 0,
      cleaningFrequency: null,
      includeDetergents: false,
      startDate: null,
      hourDate: null,
      extraServices: []
    }
    // resolver: cleaningDetailsResolver
  });

  const cleaningFrequencyData = useMemo(
    () => data?.cleaningFrequencies ?? [],
    [data]
  );

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  // console.log(data);
  // const currentValues = useWatch<OrderServiceInputData>({
  //   control: methods.control
  // });
  // console.log(currentValues);

  return (
    <FormProvider {...methods}>
      <form className="py-16">
        <NumericInput
          min={0}
          max={500}
          name="numberOfUnits"
          label="Area size (in m2)"
          wrapperClassName="items-center py-4"
          onChange={(value: number) =>
            onChangeServiceNumberOfUnits(value, true, { id, name, unit })
          }
        />
        {cleaningFrequencyData.length > 1 && (
          <RadioGroup
            name="cleaningFrequency"
            label="Cleaning frequency"
            optionList={cleaningFrequencyData}
            onChange={onChangeCleaningFrequency}
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
        />
        {secondaryServicesWithUnit.length > 0 && (
          <ExtraDataMultiSelect
            name="extraServices"
            className="py-4"
            data={secondaryServicesWithUnit}
            onChangeNumberOfUnits={onChangeServiceNumberOfUnits}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
