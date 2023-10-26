import { useState, useMemo } from 'react';

import type { Service, ServiceWithUnit } from '~/api/schemas/services';

import { LabeledCheckbox, Textfield } from '~/components/molecules/form-fields';
import {
  CalendarWithHours,
  ExtraDataMultiSelect,
  RadioGroup
} from '../form-fields';
import { frequencyValues } from './constants';

type CleaningDetailsFormProps = {
  data: Service;
};

const CleaningDetailsForm = ({ data }: CleaningDetailsFormProps) => {
  const cleaningFrequencyData = useMemo(() => frequencyValues, []);
  const secondaryServices = useMemo(() => data.secondaryServices, [data]);

  const [frequency, setFrequency] = useState('once');
  const [includeDetergents, setIncludeDetergents] = useState(false);

  const onChangeIncludeDetergents = () => {
    setIncludeDetergents((prev) => !prev);
  };

  return (
    <form className="py-16">
      <Textfield
        name="areaSize"
        label="Area size"
        placeholder="Area size (in m2)"
      />
      <RadioGroup
        label="Cleaning frequency"
        data={cleaningFrequencyData}
        value={frequency}
        onChange={(value) => setFrequency(value)}
      />
      <LabeledCheckbox
        className="py-4"
        label="Detergents"
        caption="Include detergents (+15zł)"
        name="detergents"
        checked={includeDetergents}
        onChangeChecked={onChangeIncludeDetergents}
      />
      {/* <LabeledNumericInput
        value={hours}
        setValue={setHours}
        label="Cleaning duration - hours (max 12)"
        name="hours"
        className="py-4"
        min={1}
        max={12}
      /> */}
      <CalendarWithHours label="Cleaning start date" />
      <ExtraDataMultiSelect
        className="py-4"
        data={
          (secondaryServices?.filter(
            (service) => !!service.unit
          ) as ServiceWithUnit[]) ?? []
        }
      />
    </form>
  );
};

export default CleaningDetailsForm;
