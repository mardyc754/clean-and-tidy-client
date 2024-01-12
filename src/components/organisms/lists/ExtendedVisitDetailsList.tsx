import clsx from 'clsx';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import {
  displayDatesAsTimeslot,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { convertToCamelCase } from '~/utils/stringUtils';
import {
  getVisitStartEndDates,
  getVisitStatusDescription
} from '~/utils/visitUtils';

interface VisitDetailsListProps {
  data: VisitWithEmployees;
}

const ExtendedVisitDetailsList = ({ data }: VisitDetailsListProps) => {
  const status = getVisitStatusDescription(data);
  const { startDate, endDate } = getVisitStartEndDates(data);

  const listedData = new Map([
    ['Date', extractDateStringFromDate(startDate)],
    ['Hours', displayDatesAsTimeslot(startDate, endDate)]
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
