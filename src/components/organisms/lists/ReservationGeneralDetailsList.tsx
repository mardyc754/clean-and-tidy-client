import clsx from 'clsx';

import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';

import type { Reservation } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import { displayDateWithHours } from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';

import ListWrapper from '../wrappers/ListWrapper';

interface ReservationDetailsListProps {
  data: Reservation; // TODO: maybe use simplified version of Reservation
}

const ReservationGeneralDetailsList = ({
  data
}: ReservationDetailsListProps) => {
  const {
    status,
    name,
    frequency,
    endDate,
    bookerFirstName,
    bookerLastName,
    extraInfo
  } = data;
  const statusData = reservationStatusMap.get(status);

  const reservationDetailsData = new Map([
    ['Name', name],
    ['Booker', `${bookerFirstName} ${bookerLastName}`],
    ['Frequency', `${frequencyToDescriptionMap.get(frequency)}`],
    ['Status', `${statusData?.label}`],
    ['End date', displayDateWithHours(endDate)]
  ]);

  return (
    <>
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
      {extraInfo && (
        <ListWrapper title="Extra Info">
          <p className="text-xl">{extraInfo}</p>
        </ListWrapper>
      )}
    </>
  );
};

export default ReservationGeneralDetailsList;
