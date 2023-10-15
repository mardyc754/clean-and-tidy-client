import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { type Service, type ServiceWithUnit } from '~/api/schemas/services';

import { useOrderServiceDataStore } from '~/stores';

import {
  LabeledCheckbox,
  OrderServiceNumericInput
} from '~/components/molecules/form-fields';

import type { RadioFieldOption } from '~/types/forms';

import {
  CalendarWithHours,
  ExtraDataMultiSelect,
  RadioGroup
} from '../form-fields';

type CleaningDetailsFormProps = {
  data: Service;
};

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const { id, name, unit } = data;

  const {
    includeDetergents,
    cleaningFrequency,
    cleaningFrequencyData,
    startDate,
    hourDate,
    changeCleaningFrequency,
    changeIncludeDetergents,
    changeStartDate,
    changeHourDate
  } = useOrderServiceDataStore(
    useShallow((state) => ({
      changeCleaningFrequency: state.changeCleaningFrequency,
      changeStartDate: state.changeStartDate,
      changeIncludeDetergents: state.changeIncludeDetergents,
      changeHourDate: state.changeHourDate,
      includeDetergents: state.includeDetergents,
      cleaningFrequency: state.cleaningFrequency,
      cleaningFrequencyData: state.cleaningFrequencyData,
      orderedServices: state.orderedServices,
      startDate: state.startDate,
      hourDate: state.hourDate
    }))
  );

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  return (
    <form className="py-16">
      <OrderServiceNumericInput
        serviceData={{ id, name, unit }}
        isMainServiceControl
        min={0}
        max={500}
        name="areaSize"
        label="Area size (in m2)"
        className="items-center py-4"
      />
      {cleaningFrequencyData.length > 1 && (
        <RadioGroup
          label="Cleaning frequency"
          data={cleaningFrequencyData}
          value={cleaningFrequency}
          onChange={
            changeCleaningFrequency as (value: RadioFieldOption) => void
          }
        />
      )}
      <LabeledCheckbox
        className="py-4"
        label="Detergents"
        caption="Include detergents (+15zł)"
        name="detergents"
        checked={includeDetergents}
        onChangeChecked={changeIncludeDetergents}
      />
      <CalendarWithHours
        day={startDate}
        hour={hourDate}
        onChangeDate={changeStartDate}
        onChangeHour={changeHourDate}
        label="Cleaning start date"
      />
      {secondaryServicesWithUnit.length > 0 && (
        <ExtraDataMultiSelect
          className="py-4"
          data={secondaryServicesWithUnit}
        />
      )}
    </form>
  );
};

export default CleaningDetailsForm;
