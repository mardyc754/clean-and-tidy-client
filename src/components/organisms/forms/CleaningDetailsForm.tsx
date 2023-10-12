import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import type { Service, ServiceWithUnit } from '~/api/schemas/services';

import { LabeledCheckbox, Textfield } from '~/components/molecules/form-fields';
import {
  CalendarWithHours,
  ExtraDataMultiSelect,
  RadioGroup
} from '../form-fields';

import { useOrderServiceDataStore } from '~/stores';
import { type CleaningFrequency } from '~/types/forms';

type CleaningDetailsFormProps = {
  data: Service;
};

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const {
    includeDetergents,
    cleaningFrequency,
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
      changeCleaningFrequency: (value: string) =>
        state.changeCleaningFrequency(value as CleaningFrequency),
      changeStartDate: state.changeStartDate,
      changeIncludeDetergents: state.changeIncludeDetergents,
      increaseTotalCostAndDuration: state.increaseTotalCostAndDuration,
      includeDetergents: state.includeDetergents,
      cleaningFrequency: state.cleaningFrequency
    }))
  );
  const cleaningFrequencyData = useMemo(
    () => data?.cleaningFrequencies ?? [],
    [data]
  );

  const secondaryServicesWithUnit = useMemo(
    () => data.secondaryServices?.filter((service) => !!service.unit) ?? [],
    [data]
  ) as ServiceWithUnit[];

  return (
    <form className="py-16">
      <Textfield
        name="areaSize"
        label="Area size"
        placeholder="Area size (in m2)"
      />
      {cleaningFrequencyData.length > 1 && (
        <RadioGroup
          label="Cleaning frequency"
          data={cleaningFrequencyData}
          value={cleaningFrequency}
          onChange={changeCleaningFrequency}
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
