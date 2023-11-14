import clsx from 'clsx';

import type { Visit } from '~/schemas/api/reservation';

import { convertToCamelCase } from '~/utils/stringUtils';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import {
  displayDatesAsTimespan,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { getReservationStatusDescription } from '~/utils/reservationUtils';

interface VisitDetailsListProps {
  data: Visit;
}

const ExtendedVisitDetailsList = ({ data }: VisitDetailsListProps) => {
  const status = getReservationStatusDescription(data.employees);

  const listedData = new Map([
    ['Date', extractDateStringFromDate(data.startDate)],
    ['Hours', displayDatesAsTimespan(data.startDate, data.endDate)],
    // ['Status', status?.label ?? ''],
    ['Detergents included', data.includeDetergents ? 'Yes' : 'No'],
    ['Cost', `${data.cost.toFixed(2)} zł`]
  ]);

  return (
    <>
      {Array.from(listedData).map(([key, value], index) => (
        <LabeledTypography
          label={key}
          value={value}
          contentDistribution="stretch"
          labelClasses="text-xl"
          valueClasses={clsx('text-2xl', key === 'Status' ? status?.style : '')}
          key={`SingleReservationData-${convertToCamelCase(key)}-${index}`}
        />
      ))}
    </>
  );
};

export default ExtendedVisitDetailsList;
