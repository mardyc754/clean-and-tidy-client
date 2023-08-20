import { useState, useMemo } from 'react';

import { LabeledCheckbox, Textfield } from '~/components/molecules/form-fields';
import { RadioGroup } from '../form-fields';

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
        label="Detergents"
        caption="Include detergents (+25zł)"
        name="detergents"
        checked={includeDetergents}
        onChangeChecked={onChangeIncludeDetergents}
      />
    </form>
  );
};

export default CleaningDetailsForm;
