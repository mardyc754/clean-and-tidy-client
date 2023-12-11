import clsx from 'clsx';

import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';

import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { displayDateWithHours } from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';

import { ReservationActions } from '../button-fields';

interface ReservationDetailsCardProps {
  data: ReservationWithExtendedVisits; // TODO: maybe use simplified version of Reservation,
  manageable?: boolean;
  className?: string;
}

const ReservationGeneralDetailsCard = ({
  data,
  className,
  manageable = false
}: ReservationDetailsCardProps) => {
  const { status, name, frequency, endDate, bookerFirstName, bookerLastName } =
    data;
  const statusData = reservationStatusMap.get(status);

  const reservationDetailsData = new Map([
    ['Booker', `${bookerFirstName} ${bookerLastName}`],
    ['Frequency', `${frequencyToDescriptionMap.get(frequency)}`],
    ['Status', `${statusData?.label}`],
    ['End date', displayDateWithHours(endDate)]
  ]);

  return (
    <Card className={clsx('flex flex-col', className)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {Array.from(reservationDetailsData).map(([key, value]) => (
          <LabeledTypography
            label={key}
            value={value}
            contentDistribution="stretch"
            labelClasses="text-xl"
            valueClasses={clsx(
              'text-2xl',
              key === 'Status' ? statusData?.style : ''
            )}
            key={`ReservationDetails-${convertToCamelCase(key)}`}
          />
        ))}
        {manageable && <ReservationActions />}
      </CardContent>
    </Card>
  );
};

export default ReservationGeneralDetailsCard;
