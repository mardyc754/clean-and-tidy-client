import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ErrorLabel, HourTile } from '~/components/atoms/forms';

import { isAfter, isSame, minutesBetween } from '~/utils/dateUtils';

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
  selectedDuration?: number;
};

const HourSelection = ({
  name,
  className = '',
  direction = 'column',
  disableSelection,
  errorLabel,
  hourAvailabilityData,
  selectedDuration = 0,
  onChange
}: HourSelectionProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const currentValue = useWatch({ name }) as Date;

  // console.log('>>> currentValue', currentValue);
  // console.log('>>> selectedDuration', selectedDuration);
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
            included={
              minutesBetween(hour, currentValue) < selectedDuration &&
              isAfter(hour, currentValue)
            }
            onSelect={(stringifiedHourDate) => {
              const hourDate = new Date(stringifiedHourDate);
              setValue(name, hourDate);
              onChange?.(hourDate);
            }}
          />
        ))}
      </div>
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default HourSelection;
