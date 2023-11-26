import clsx from 'clsx';

import type { VisitPartWithEmployees } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import {
  displayDatesAsTimestamp,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';
import { getVisitPartStatusDescription } from '~/utils/visitUtils';

interface VisitDetailsListProps {
  data: VisitPartWithEmployees;
}

const ExtendedVisitDetailsList = ({ data }: VisitDetailsListProps) => {
  const status = getVisitPartStatusDescription(data);

  const listedData = new Map([
    ['Date', extractDateStringFromDate(data.startDate)],
    ['Hours', displayDatesAsTimestamp(data.startDate, data.endDate)],
    ['Status', status?.label ?? ''],
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
