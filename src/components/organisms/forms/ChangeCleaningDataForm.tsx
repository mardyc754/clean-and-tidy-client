import { useMemo } from 'react';
import {
  CalendarWithHours,
  RadioGroup
} from '~/components/organisms/form-fields';
import { LabeledNumericInput } from '~/components/molecules/form-fields';

import type { SingleReservationData } from '~/types/user';
import type { ChangeDataMode, CleaningFrequency } from '~/types/forms';
import { changeDataModeData, frequencyValues } from './constants';

type ChangeCleaningDataFormProps = {
  data: SingleReservationData;
  changeDataMode: ChangeDataMode;
  onChangeDataMode: (value: string) => void;
  frequency: CleaningFrequency;
  onChangeFrequency: (value: string) => void;
};

const ChangeCleaningDataForm = ({
  data,
  changeDataMode,
  onChangeDataMode,
  frequency,
  onChangeFrequency
}: ChangeCleaningDataFormProps) => {
  const cleaningFrequencyData = useMemo(() => frequencyValues.slice(1), []);
  const { duration } = data;

  return (
    <>
      <RadioGroup
        value={changeDataMode}
        onChange={onChangeDataMode}
        label="Change data"
        data={changeDataModeData}
      />
      <CalendarWithHours
        label={`${
          changeDataMode === 'once'
            ? 'Change the cleaning date'
            : 'Change the next cleaning date'
        }`}
      />
      <LabeledNumericInput
        value={duration}
        setValue={() => {
          /** */
        }}
        label="Cleaning duration - hours (max 12)"
        name="hours"
        className="py-4"
        min={1}
        max={12}
      />
      {changeDataMode === 'permanently' && (
        <RadioGroup
          label="Cleaning frequency"
          data={cleaningFrequencyData}
          value={frequency}
          onChange={onChangeFrequency}
        />
      )}
    </>
  );
};

export default ChangeCleaningDataForm;
