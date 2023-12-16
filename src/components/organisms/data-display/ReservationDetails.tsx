import clsx from 'clsx';
import { omit } from 'lodash';
import { useMemo, useState } from 'react';

import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

import { Checkbox } from '~/components/atoms/forms';
import { Heading3 } from '~/components/atoms/typography/headings';
import { Dropdown } from '~/components/molecules/form-fields';
import { VisitDisclosure } from '~/components/organisms/disclosures';

import {
  getServicesWithNumberOfUnitsFromReservation,
  getStatusFromVisitParts
} from '~/utils/visitUtils';

import { Status } from '~/types/enums';

import { ReservationGeneralDetailsCard, ServiceCard } from '../cards';

interface ReservationDetailsProps {
  data: ReservationWithExtendedVisits;
  manageable?: boolean;
  expandVisitDetails?: boolean;
}

type VisitFilterOption = 'all' | 'upcoming' | 'past';

const visitFilterOptions = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'all', name: 'All' },
  { id: 'past', name: 'Past' }
];

function filterVisits(
  visits: ReservationWithExtendedVisits['visits'],
  filterOption: VisitFilterOption
) {
  const now = new Date();

  switch (filterOption) {
    case 'all':
      return visits;
    case 'upcoming':
      return visits.filter(
        (visit) => new Date(visit.visitParts[0]!.startDate) > now
      );
    case 'past':
      return visits.filter(
        (visit) => new Date(visit.visitParts[0]!.startDate) < now
      );
  }
}

const ReservationDetails = ({
  data,
  manageable = false,
  expandVisitDetails = false
}: ReservationDetailsProps) => {
  const [filterOption, setFilterOption] = useState(visitFilterOptions[0]!);
  const [showCancelled, setShowCancelled] = useState(false);

  const visits = useMemo(() => {
    const sortedVisits =
      filterVisits(data.visits, filterOption.id as VisitFilterOption) ?? [];

    sortedVisits.sort(
      (a, b) =>
        (new Date(a.visitParts[0]!.startDate).getTime() ?? -Infinity) -
        (new Date(b.visitParts[0]!.startDate).getTime() ?? -Infinity)
    );

    if (!showCancelled) {
      return sortedVisits.filter(
        (visit) =>
          getStatusFromVisitParts(visit.visitParts) !== Status.CANCELLED
      );
    }

    return sortedVisits;
  }, [data.visits, filterOption, showCancelled]);

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
        <ServiceCard
          data={services}
          units={getServicesWithNumberOfUnitsFromReservation(data)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Heading3>Visits</Heading3>
        <div className="flex space-x-4">
          <Checkbox
            name="showCancelled"
            caption={`Show cancelled visits`}
            onClick={() => {
              setShowCancelled((prev) => !prev);
            }}
          />
          <Dropdown
            onChange={setFilterOption}
            value={filterOption}
            options={visitFilterOptions}
          />
        </div>
      </div>
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
