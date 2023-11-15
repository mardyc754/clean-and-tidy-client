import clsx from 'clsx';

import {
  employeeReservationStatusMap,
  reservationStatusMap
} from '~/constants/mappings';

import type { Status } from '~/types/enums';

type StatusIndicatorProps = {
  status: Status;
  perspective?: 'client' | 'employee';
  component?: 'div' | 'span' | 'p';
};

const StatusIndicator = ({
  status,
  perspective = 'client',
  component = 'span'
}: StatusIndicatorProps) => {
  const statusSource =
    perspective === 'client'
      ? reservationStatusMap
      : employeeReservationStatusMap;
  const statusData = statusSource.get(status);

  return (
    <span
      className={clsx(statusData?.style, 'font-emphasize text-lg font-bold')}
    >
      {statusData?.label}
    </span>
  );
};

export default StatusIndicator;
