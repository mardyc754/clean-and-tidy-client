import clsx from 'clsx';

import type { Reservation } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import { convertToCamelCase } from '~/utils/stringUtils';
import { displayDateWithHours } from '~/utils/dateUtils';

import ListWrapper from '../wrappers/ListWrapper';
import {
  reservationStatusMap,
  frequencyToDescriptionMap
} from '~/constants/mappings';

interface ReservationDetailsListProps {
  data: Reservation; // TODO: maybe use simplified version of Reservation
}

const ReservationGeneralDetailsList = ({
  data
}: ReservationDetailsListProps) => {
  const statusData = reservationStatusMap.get(data.status);

  const reservationDetailsData = new Map([
    ['Name', data.name],
    ['Booker', `${data.bookerFirstName} ${data.bookerLastName}`],
    ['Frequency', `${frequencyToDescriptionMap.get(data.frequency)}`],
    ['Status', `${statusData?.label}`],
    ['End date', displayDateWithHours(data.endDate)]
  ]);

  return (
    <ListWrapper title="Details">
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
    </ListWrapper>
  );
};

export default ReservationGeneralDetailsList;
