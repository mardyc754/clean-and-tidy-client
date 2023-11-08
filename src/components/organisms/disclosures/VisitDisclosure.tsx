import clsx from 'clsx';

import type { Visit } from '~/schemas/api/reservation';

import {
  displayDatesAsTimespan,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';

import { reservationStatusMap } from '~/constants/mappings';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { Disclosure } from '~/components/organisms/disclosures';

interface ReservationDisclosureProps {
  data: Visit;
}

const VisitDisclosure = ({ data }: ReservationDisclosureProps) => {
  const status = reservationStatusMap.get(data.status);

  const reservationData = new Map([
    ['Status', data.status],
    ['Detergents included', data.includeDetergents ? 'Yes' : 'No'],
    ['Cost', `${data.cost.toFixed(2)} zł`],
    ['Status', status?.label ?? '']
  ]);

  return (
    <Disclosure
      titleComponent={
        <div className="flex flex-1 flex-col py-2 md:flex-row md:items-center md:justify-between">
          <p className="font-emphasize text-2xl">
            {extractDateStringFromDate(data.startDate)}
          </p>
          <p className="font-emphasize text-2xl">
            {displayDatesAsTimespan(data.startDate, data.endDate)}
          </p>
        </div>
      }
    >
      <div className="flex-1">
        {Array.from(reservationData).map(([key, value], index) => (
          <LabeledTypography
            label={key}
            value={value}
            contentDistribution="stretch"
            labelClasses="text-xl"
            valueClasses={clsx(
              'text-2xl',
              key === 'Status' ? status?.style : ''
            )}
            key={`SingleReservationData-${convertToCamelCase(key)}-${index}`}
          />
        ))}
      </div>
    </Disclosure>
  );
};

export default VisitDisclosure;
