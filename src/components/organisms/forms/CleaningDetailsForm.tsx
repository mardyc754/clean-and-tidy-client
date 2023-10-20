import { FormProvider, useForm } from 'react-hook-form';

import { useMemo } from 'react';
import { type Service, type ServiceWithUnit } from '~/api/schemas/services';

import { Checkbox } from '~/components/atoms/forms';

import {
  CalendarWithHours,
  ExtraDataMultiSelect,
  RadioGroup
} from '../form-fields';
import { NumericInput } from '~/components/atoms/forms';

type CleaningDetailsFormProps = {
  data: Service;
};

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const { id, name, unit } = data;

  console.log(data);
  const methods = useForm();

  const cleaningFrequencyData = useMemo(
    () => data?.cleaningFrequencies ?? [],
    [data]
  );

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  console.log(methods.watch());
  return (
    <FormProvider {...methods}>
      <form className="py-16">
        <NumericInput
          min={0}
          max={500}
          name="numberOfUnits"
          label="Area size (in m2)"
          wrapperClassName="items-center py-4"
        />
        {cleaningFrequencyData.length > 1 && (
          <RadioGroup
            name="cleaningFrequency"
            label="Cleaning frequency"
            data={cleaningFrequencyData}
          />
        )}
        <Checkbox
          name="includeDetergents"
          className="py-4"
          label="Detergents"
          caption="Include detergents (+15zł)"
        />
        <CalendarWithHours
          calendarInputName="startDate"
          hourInputName="hourDate"
          label="Cleaning start date"
        />
        {secondaryServicesWithUnit.length > 0 && (
          <ExtraDataMultiSelect
            className="py-4"
            data={secondaryServicesWithUnit}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default CleaningDetailsForm;
