import clsx from 'clsx';
import { useMemo } from 'react';

import type { RecurringReservation } from '~/schemas/api/reservation';

import {
  displayDateWithHours,
  displayDatesAsTimespan,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { convertToSnakeCase } from '~/utils/stringUtils';

import { Heading2, Heading3 } from '~/components/atoms/typography/headings';
import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';
import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { Disclosure } from '~/components/molecules/layout';

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
      {/* single reservation data */}
      <div className="flex flex-col gap-8 py-8">
        {reservations.map((reservation, i) => {
          const status = reservationStatusMap.get(reservation.status);

          const reservationData = new Map([
            ['Status', reservation.status],
            [
              'Detergents included',
              reservation.includeDetergents ? 'Yes' : 'No'
            ],
            ['Cost', `${reservation.cost} zł`],
            ['Status', status?.label ?? '']
          ]);

          return (
            <Disclosure
              key={`SingleReservationData=${i}`}
              titleComponent={
                <div className="flex flex-1 flex-col py-2 md:flex-row md:items-center md:justify-between">
                  <>
                    <p className="font-emphasize text-2xl">
                      {extractDateStringFromDate(reservation.startDate)}
                    </p>
                    <p className="font-emphasize text-2xl">
                      {displayDatesAsTimespan(
                        reservation.startDate,
                        reservation.endDate
                      )}
                    </p>
                  </>
                </div>
              }
            >
              <div className="flex-1">
                {Array.from(reservationData).map(([key, value]) => (
                  <LabeledTypography
                    label={key}
                    value={value}
                    contentDistribution="stretch"
                    labelClasses="text-xl"
                    valueClasses={clsx(
                      'text-2xl',
                      key === 'Status' ? status?.style : ''
                    )}
                    key={`SingleReservationData-${convertToSnakeCase(
                      key
                    )}-${i}`}
                  />
                ))}
              </div>
            </Disclosure>
          );
        })}
      </div>
      {/* end of single reservation data */}
    </>
  );
};

export default ReservationDetails;
