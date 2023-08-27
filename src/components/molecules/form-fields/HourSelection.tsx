import { useMemo, useState } from 'react';
import { HourTile } from '~/components/atoms/forms';

type HourSelectionProps = {
  className?: string;
  disableSelection: boolean;
};

const HourSelection = ({
  className = '',
  disableSelection
}: HourSelectionProps) => {
  const [currentHour, setCurrentHour] = useState<string | null>(null);

  const hourAvailabilityData = useMemo(
    () => [
      { hour: '7:00', available: false },
      { hour: '8:00', available: true },
      { hour: '9:00', available: true },
      { hour: '10:00', available: true },
      { hour: '11:00', available: false },
      { hour: '12:00', available: false },
      { hour: '13:00', available: false },
      { hour: '14:00', available: true },
      { hour: '15:00', available: true },
      { hour: '16:00', available: true },
      { hour: '17:00', available: true },
      { hour: '18:00', available: false }
    ],
    []
  );

  return (
    // it will be grid probably with gaps
    <div
      className={`grid grid-flow-col grid-cols-2 grid-rows-6 gap-1 ${className}`}
    >
      {hourAvailabilityData.map(({ hour, available }) => (
        <HourTile
          key={`HourTile-${hour}`}
          value={hour}
          available={available}
          disabled={disableSelection}
          selected={hour === currentHour}
          onSelect={() => setCurrentHour(hour)}
        />
      ))}
    </div>
  );
};

export default HourSelection;
