import { useMemo } from 'react';

import type { Reservation } from '~/schemas/api/reservation';

import { Heading3 } from '~/components/atoms/typography/headings';
import { VisitDisclosure } from '~/components/organisms/disclosures';

import { ReservationGeneralDetailsList, ServiceList } from '../lists';
import { ReservationActions } from '../button-fields';

interface ReservationDetailsProps {
  data: Reservation;
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
      <ServiceList data={services} />
      <ReservationGeneralDetailsList data={data} />
      {manageable && <ReservationActions />}

      <Heading3>Visits</Heading3>
      <div className="flex flex-col gap-8 py-8">
        {visits.map((visit, i) => {
          return (
            <VisitDisclosure
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
