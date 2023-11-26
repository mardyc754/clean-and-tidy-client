import clsx from 'clsx';

import type { Visit } from '~/schemas/api/reservation';

import { LabeledTypography } from '~/components/atoms/typography/labeled-text';

import { convertToCamelCase } from '~/utils/stringUtils';
import { getVisitCost, getVisitStatusDescription } from '~/utils/visitUtils';

interface VisitDetailsListProps {
  data: Visit;
}

const VisitDetailsList = ({ data }: VisitDetailsListProps) => {
  const status = getVisitStatusDescription(data);

  const visitData = new Map([
    ['Status', status?.label ?? ''],
    ['Detergents included', data.includeDetergents ? 'Yes' : 'No'],
    ['Cost', `${getVisitCost(data).toFixed(2)} zł`]
  ]);

  return (
    <>
      {Array.from(visitData).map(([key, value], index) => (
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

export default VisitDetailsList;
