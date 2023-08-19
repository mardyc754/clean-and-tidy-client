import { useMemo } from 'react';

import { Textfield } from '~/components/molecules/form-fields';
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

  return (
    <form>
      <Textfield
        name="areaSize"
        label="Area size"
        placeholder="Area size (in m2)"
      />
      <RadioGroup label="Cleaning frequency" data={cleaningFrequencyData} />
    </form>
  );
};

export default CleaningDetailsForm;
