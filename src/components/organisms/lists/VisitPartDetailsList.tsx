import clsx from 'clsx';

import type { VisitPartWithEmployees } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import {
  displayDatesAsTimeslot,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';
import { getVisitPartStatusDescription } from '~/utils/visitUtils';

interface VisitPartDetailsListProps {
  data: VisitPartWithEmployees;
}

const VisitPartDetailsList = ({ data }: VisitPartDetailsListProps) => {
  const status = getVisitPartStatusDescription(data);

  const listedData = new Map([
    ['Date', extractDateStringFromDate(data.startDate)],
    ['Hours', displayDatesAsTimeslot(data.startDate, data.endDate)],
    ['Status', status?.label ?? '']
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

export default VisitPartDetailsList;
