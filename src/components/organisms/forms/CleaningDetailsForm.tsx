import { useState, useMemo } from 'react';
import {
  LabeledCheckbox,
  Textfield,
  LabeledNumericInput
} from '~/components/molecules/form-fields';
import { CalendarWithHours, RadioGroup } from '../form-fields';
import { frequencyValues } from '~/utils/constants';

const CleaningDetailsForm = () => {
  const cleaningFrequencyData = useMemo(() => frequencyValues, []);

  const [frequency, setFrequency] = useState('once');
  const [includeDetergents, setIncludeDetergents] = useState(false);
  const [hours, setHours] = useState(1);

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
        caption="Include detergents (+25zł)"
        name="detergents"
        checked={includeDetergents}
        onChangeChecked={onChangeIncludeDetergents}
      />
      <LabeledNumericInput
        value={hours}
        setValue={setHours}
        label="Cleaning duration - hours (max 12)"
        name="hours"
        className="py-4"
        min={1}
        max={12}
      />
      <CalendarWithHours label="Cleaning start date" />
    </form>
  );
};

export default CleaningDetailsForm;
