import { useMemo } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import type {
  ReservationWithExtendedVisits,
  VisitWithEmployees
} from '~/schemas/api/reservation';

import { Disclosure } from '~/components/organisms/disclosures';

import {
  displayDatesAsTimeslot,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import {
  getVisitEmployees,
  getVisitStartEndDates,
  getVisitStatusDescription
} from '~/utils/visitUtils';

import { VisitActions } from '../button-fields';
import { EmployeeSecondaryList, VisitDetailsList } from '../lists';
import { SecondaryListWrapper } from '../wrappers';

interface VisitDisclosureProps {
  reservationData: Omit<ReservationWithExtendedVisits, 'visits' | 'services'>;
  data: VisitWithEmployees;
  manageable?: boolean;
  defaultOpen?: boolean;
}

const VisitDisclosure = ({
  reservationData,
  data,
  manageable = false,
  defaultOpen = false
}: VisitDisclosureProps) => {
  const employees = useMemo(() => getVisitEmployees(data), [data]);
  const { startDate, endDate } = getVisitStartEndDates(data);

  const status = getVisitStatusDescription(data);

  return (
    <VisitDataContext.Provider
      value={{ visitData: data, reservationName: reservationData.name }}
    >
      <Disclosure
        defaultOpen={defaultOpen}
        titleComponent={
          <div className="flex flex-1 flex-col py-2 md:flex-row md:items-center md:justify-between">
            <p className="space-x-3 font-emphasize text-2xl">
              <span>{extractDateStringFromDate(startDate)}</span>
              <span className={status?.style}>{status?.label}</span>
            </p>
            <p className="font-emphasize text-2xl">
              {displayDatesAsTimeslot(startDate, endDate)}
            </p>
          </div>
        }
      >
        <div className="flex-1">
          <div className="pb-4">
            <VisitDetailsList data={data} />
          </div>
          {employees.length > 0 && <EmployeeSecondaryList data={data} />}
          {manageable && (
            <SecondaryListWrapper title="Actions">
              <div className="flex space-x-4">
                <VisitActions />
              </div>
            </SecondaryListWrapper>
          )}
        </div>
      </Disclosure>
    </VisitDataContext.Provider>
  );
};

export default VisitDisclosure;
