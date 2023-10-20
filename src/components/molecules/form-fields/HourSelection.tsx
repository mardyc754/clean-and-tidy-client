import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { HourTile } from '~/components/atoms/forms';

import { dateWithHour, extractHourFromDate } from '~/utils/dateUtils';

type HourSelectionProps = {
  name: string;
  className?: string;
  direction?: 'row' | 'column';
  disableSelection: boolean;
};

const HourSelection = ({
  name,
  className = '',
  direction = 'column',
  disableSelection
}: HourSelectionProps) => {
  const hourAvailabilityData = useMemo(
    () => [
      // available field will be later replaced by availableEmployees array
      { hour: 7, available: false },
      { hour: 8, available: true },
      { hour: 9, available: true },
      { hour: 10, available: true },
      { hour: 11, available: false },
      { hour: 12, available: false },
      { hour: 13, available: false },
      { hour: 14, available: true },
      { hour: 15, available: true },
      { hour: 16, available: true },
      { hour: 17, available: true },
      { hour: 18, available: false }
    ],
    []
  );

  const { register, setValue, watch } = useFormContext();

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    // it will be grid probably with gaps
    <div
      className={`grid ${
        direction === 'column'
          ? 'grid-flow-col grid-cols-2 grid-rows-6'
          : 'grid-cols-6 grid-rows-2'
      } gap-1 ${className}`}
    >
      {hourAvailabilityData.map(({ hour, available }) => (
        <HourTile
          key={`HourTile-${hour}`}
          value={hour}
          available={available}
          disabled={disableSelection}
          selected={hour === extractHourFromDate(watch(name))}
          onSelect={(selectedHour) =>
            setValue(name, dateWithHour(watch(name), selectedHour))
          }
        />
      ))}
    </div>
  );
};

export default HourSelection;
