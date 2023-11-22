import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ErrorLabel, HourTile } from '~/components/atoms/forms';

import { dateWithHour, extractHourFromDate } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';

type HourSelectionProps = {
  name: string;
  className?: string;
  direction?: 'row' | 'column';
  disableSelection: boolean;
  errorLabel?: string;
  onChange?: (value: ValidDate) => void;
};

const HourSelection = ({
  name,
  className = '',
  direction = 'column',
  disableSelection,
  errorLabel,
  onChange
}: HourSelectionProps) => {
  const hourAvailabilityData = useMemo(
    () => [
      // available field will be later replaced by availableEmployees array
      { hour: 7, available: true },
      { hour: 8, available: true },
      { hour: 9, available: true },
      { hour: 10, available: true },
      { hour: 11, available: true },
      { hour: 12, available: true },
      { hour: 13, available: true },
      { hour: 14, available: true },
      { hour: 15, available: true },
      { hour: 16, available: true },
      { hour: 17, available: true },
      { hour: 18, available: true }
    ],
    []
  );

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
            : 'grid-cols-6 grid-rows-2',
          'gap-1'
        )}
      >
        {hourAvailabilityData.map(({ hour, available }) => (
          <HourTile
            key={`HourTile-${hour}`}
            value={hour}
            available={available}
            disabled={disableSelection}
            selected={hour === extractHourFromDate(currentValue)}
            onSelect={(selectedHour) => {
              const newValue = dateWithHour(currentValue, selectedHour);
              setValue(name, newValue);
              onChange?.(newValue);
            }}
          />
        ))}
      </div>
      <ErrorLabel>{errorLabel ?? ''}</ErrorLabel>
    </div>
  );
};

export default HourSelection;
