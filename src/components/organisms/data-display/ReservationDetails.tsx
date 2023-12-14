import clsx from 'clsx';
import { omit } from 'lodash';
import { useMemo } from 'react';

import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

import { Heading3 } from '~/components/atoms/typography/headings';
import { VisitDisclosure } from '~/components/organisms/disclosures';

import { ReservationGeneralDetailsCard, ServiceCard } from '../cards';

interface ReservationDetailsProps {
  data: ReservationWithExtendedVisits;
  manageable?: boolean;
  expandVisitDetails?: boolean;
}

const ReservationDetails = ({
  data,
  manageable = false,
  expandVisitDetails = false
}: ReservationDetailsProps) => {
  const visits = useMemo(() => data.visits ?? [], [data.visits]);

  const services = useMemo(() => data.services ?? [], [data.services]);

  return (
    <>
      <div
        className={clsx(
          'md:column-re md: flex flex-col-reverse py-16 md:flex-row md:space-x-4 md:space-y-0'
        )}
      >
        <ReservationGeneralDetailsCard
          className="grow"
          data={data}
          manageable={manageable}
        />
        <ServiceCard data={services} />
      </div>

      <Heading3>Visits</Heading3>
      <div className="flex flex-col gap-8 py-8">
        {visits.map((visit, i) => {
          return (
            <VisitDisclosure
              reservationData={omit(data, 'visits', 'services')}
              defaultOpen={expandVisitDetails}
              data={visit}
              key={`ReservationDisclosure-${i}`}
              manageable={manageable}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReservationDetails;
