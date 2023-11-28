import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ErrorLabel, HourTile } from '~/components/atoms/forms';

import { dateWithHour, extractHourFromDate, isSame } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';
import type { HourAvailability } from '~/types/service';

type HourSelectionProps = {
  name: string;
  className?: string;
  direction?: 'row' | 'column';
  disableSelection: boolean;
  errorLabel?: string;
  onChange?: (value: ValidDate) => void;
  hourAvailabilityData: HourAvailability[];
};

const HourSelection = ({
  name,
  className = '',
  direction = 'column',
  disableSelection,
  errorLabel,
  hourAvailabilityData,
  onChange
}: HourSelectionProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name]);

  const currentValue = useWatch({ name }) as Date;

  return (
    <div className={clsx(!errorLabel && 'mb-4', className)}>
      {/* // it will be grid probably with gaps */}
      <div
        className={clsx(
          'grid',
          direction === 'column'
            ? 'grid-flow-col grid-cols-2 grid-rows-6'
            : 'grid-cols-5 grid-rows-2',
          'gap-1'
        )}
      >
        {hourAvailabilityData.map(({ hour, available }) => (
          <HourTile
            key={`HourTile-${hour}`}
            value={hour}
            available={available}
            disabled={disableSelection}
            selected={isSame(currentValue, hour)}
            onSelect={(selectedHour) => {
              setValue(name, selectedHour);
              onChange?.(new Date(selectedHour));
            }}
          />
        ))}
      </div>
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default HourSelection;
