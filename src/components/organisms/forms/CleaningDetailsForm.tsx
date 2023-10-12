import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

import type { Service, ServiceWithUnit } from '~/api/schemas/services';

import { useOrderServiceDataStore } from '~/stores';

import {
  LabeledCheckbox,
  LabeledNumericInput
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
  const {
    includeDetergents,
    cleaningFrequency,
    cleaningFrequencyData,
    increaseTotalCost,
    increaseTotalDuration,
    changeCleaningFrequency,
    changeStartDate,
    changeIncludeDetergents,
    increaseTotalCostAndDuration
  } = useOrderServiceDataStore(
    useShallow((state) => ({
      increaseTotalCost: state.increaseTotalCost,
      increaseTotalDuration: state.increaseTotalDuration,
      // changeCleaningFrequency: (value: RadioFieldOption) =>
      //   state.changeCleaningFrequency(value),
      changeCleaningFrequency: state.changeCleaningFrequency,
      changeStartDate: state.changeStartDate,
      changeIncludeDetergents: state.changeIncludeDetergents,
      increaseTotalCostAndDuration: state.increaseTotalCostAndDuration,
      includeDetergents: state.includeDetergents,
      cleaningFrequency: state.cleaningFrequency,
      cleaningFrequencyData: state.cleaningFrequencyData
    }))
  );

  const [value, setValue] = useState(0);

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  return (
    <form className="py-16">
      <LabeledNumericInput
        value={value}
        setValue={setValue}
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
      <CalendarWithHours label="Cleaning start date" />
      {secondaryServicesWithUnit.length > 0 && (
        <ExtraDataMultiSelect
          onChange={increaseTotalCostAndDuration}
          className="py-4"
          data={secondaryServicesWithUnit}
        />
      )}
    </form>
  );
};

export default CleaningDetailsForm;
