import { useState, useMemo } from 'react';
import { Calendar } from '~/components/molecules/calendar';
import {
  LabeledCheckbox,
  Textfield,
  LabeledNumericInput,
  HourSelection
} from '~/components/molecules/form-fields';
import { CalendarWithHours, RadioGroup } from '../form-fields';

const CleaningDetailsForm = () => {
  const cleaningFrequencyData = useMemo(
    () => [
      {
        name: 'Once'
      },
      {
        name: 'Once a week'
      },
      {
        name: 'Every two week'
      }
    ],
    []
  );

  const [includeDetergents, setIncludeDetergents] = useState(false);
  const [hours, setHours] = useState(1);

  const onChangeIncludeDetergents = () => {
    setIncludeDetergents((prev) => !prev);
  };

  return (
    <form>
      <Textfield
        name="areaSize"
        label="Area size"
        placeholder="Area size (in m2)"
      />
      <RadioGroup label="Cleaning frequency" data={cleaningFrequencyData} />
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
