import clsx from 'clsx';
import { reservationStatusMap } from '~/constants/mappings';
import type { Status } from '~/types/enums';

type StatusIndicatorProps = {
  status: Status;
  component?: 'div' | 'span' | 'p';
};

const StatusIndicator = ({
  status,
  component = 'span'
}: StatusIndicatorProps) => {
  const statusData = reservationStatusMap.get(status);

  return (
    <span
      className={clsx(statusData?.style, 'font-emphasize text-lg font-bold')}
    >
      {statusData?.label}
    </span>
  );
};

export default StatusIndicator;
