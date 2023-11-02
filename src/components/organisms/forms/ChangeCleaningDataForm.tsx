import { useMemo } from 'react';
import {
  CalendarWithHours,
  RadioGroup
} from '~/components/organisms/form-fields';
import { NumericInput } from '~/components/atoms/forms';

import type { SingleVisitData } from '~/types/user';
import type { ChangeDataMode } from '~/types/forms';
import type { CleaningFrequency } from '~/types/enums';
import {
  changeDataModeData,
  frequencyValues
} from '../../../constants/mappings';
import { FormProvider, useForm } from 'react-hook-form';

type ChangeCleaningDataFormProps = {
  data: SingleVisitData;
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

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <RadioGroup
          value={changeDataMode}
          onChange={onChangeDataMode}
          label="Change data"
          optionList={changeDataModeData}
        />
        <CalendarWithHours
          label={`${
            changeDataMode === 'once'
              ? 'Change the cleaning date'
              : 'Change the next cleaning date'
          }`}
        />
        <NumericInput
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
            optionList={cleaningFrequencyData}
            value={frequency}
            onChange={onChangeFrequency}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default ChangeCleaningDataForm;
