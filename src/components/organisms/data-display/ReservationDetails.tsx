import clsx from 'clsx';
import { useMemo } from 'react';

import type { RecurringReservation } from '~/schemas/api/reservation';

import {
  convertISOStringToDate,
  daysBetween,
  displayDateWithHours
} from '~/utils/dateUtils';
import { convertToSnakeCase } from '~/utils/stringUtils';

import { Heading2, Heading3 } from '~/components/atoms/typography/headings';
import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';
import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { ReservationDisclosure } from '~/components/organisms/disclosures';
import { Scheduler } from '~/components/organisms/scheduler';
import { getEventsFromReservations } from '~/utils/scheduler';

interface ReservationDetailsProps {
  data: RecurringReservation;
}

const ReservationDetails = ({ data }: ReservationDetailsProps) => {
  const statusData = reservationStatusMap.get(data.status);
  const reservationDetailsData = new Map([
    // ['Name', data.name],
    ['Booker', `${data.bookerFirstName} ${data.bookerLastName}`],
    ['Frequency', `${frequencyToDescriptionMap.get(data.frequency)}`],
    ['Status', `${statusData?.label}`],
    ['End date', displayDateWithHours(data.endDate)]
  ]);

  const reservations = useMemo(
    () => data.reservations ?? [],
    [data.reservations]
  );

  const services = useMemo(() => data.services ?? [], [data.services]);

  return (
    <>
      <Heading2>Reservation details</Heading2>
      <div className="py-8">
        {/* Ordered services */}
        <Heading3>Services</Heading3>
        {services.map((serviceData, i) => (
          <LabeledTypography
            label={serviceData.service.name}
            value={`x ${serviceData.numberOfUnits}`}
            contentDistribution="horizontal"
            labelClasses={clsx(
              'text-xl',
              serviceData.isMainServiceForReservation
                ? 'text-xl font-emphasize'
                : 'text-lg'
            )}
            valueClasses={clsx(
              'text-xl',
              serviceData.isMainServiceForReservation
                ? 'text-xl font-emphasize'
                : 'text-lg font-sans'
            )}
            key={`OrderedServices-${convertToSnakeCase(
              serviceData.service.name
            )}-${i}`}
          />
        ))}
      </div>
      {/* end of ordered services */}
      <div className="py-8">
        {/* Details */}
        <Heading3>Details</Heading3>
        <div>
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
              key={`ReservationDetails-${convertToSnakeCase(key)}`}
            />
          ))}
        </div>
        {/* end of details */}
      </div>
      <Heading3>Visits</Heading3>
      <div className="flex flex-col gap-8 py-8">
        {reservations.map((reservation, i) => {
          return (
            <ReservationDisclosure
              data={reservation}
              key={`ReservationDisclosure-${i}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReservationDetails;
