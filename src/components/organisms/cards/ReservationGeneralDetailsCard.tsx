import clsx from 'clsx';

import { frequencyToDescriptionMap } from '~/constants/mappings';

import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '~/components/shadcn/ui/card';

import { displayDateWithHours } from '~/utils/dateUtils';
import { getReservationEndDate } from '~/utils/reservationUtils';
import { convertToCamelCase } from '~/utils/stringUtils';
import { generateAddressAsString } from '~/utils/userUtils';

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
  const {
    name,
    frequency,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    address
  } = data;

  const reservationDetailsData = new Map([
    ['Booker', `${bookerFirstName} ${bookerLastName}`],
    ['Email', `${bookerEmail ?? 'N/A'}`],
    ['Address', `${address ? generateAddressAsString(address) : '---'}`],
    ['Frequency', `${frequencyToDescriptionMap.get(frequency)}`],
    ['End date', displayDateWithHours(getReservationEndDate(data))]
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
            valueClasses={clsx('text-2xl')}
            key={`ReservationDetails-${convertToCamelCase(key)}`}
          />
        ))}
        {manageable && data?.extraInfo && (
          <div className="pt-4">
            <p className="text-2xl font-semibold">Extra info</p>
            <p>{data.extraInfo}</p>
          </div>
        )}
        {manageable && <ReservationActions data={data} />}
      </CardContent>
    </Card>
  );
};

export default ReservationGeneralDetailsCard;
