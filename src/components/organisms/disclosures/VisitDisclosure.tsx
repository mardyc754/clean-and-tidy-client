import { useMemo } from 'react';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { Disclosure } from '~/components/organisms/disclosures';

import {
  displayDatesAsTimeslot,
  extractDateStringFromDate
} from '~/utils/dateUtils';
import { getVisitEmployees, getVisitStartEndDates } from '~/utils/visitUtils';

import { VisitActions } from '../button-fields';
import { EmployeeSecondaryList, VisitDetailsList } from '../lists';

interface ReservationDisclosureProps {
  data: VisitWithEmployees;
  manageable?: boolean;
  defaultOpen?: boolean;
}

const VisitDisclosure = ({
  data,
  manageable = false,
  defaultOpen = false
}: ReservationDisclosureProps) => {
  const employees = useMemo(() => getVisitEmployees(data), [data]);
  const { startDate, endDate } = getVisitStartEndDates(data);

  return (
    <VisitDataContext.Provider value={{ visitData: data }}>
      <Disclosure
        defaultOpen={defaultOpen}
        titleComponent={
          <div className="flex flex-1 flex-col py-2 md:flex-row md:items-center md:justify-between">
            <p className="font-emphasize text-2xl">
              {extractDateStringFromDate(startDate)}
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
          {manageable && <VisitActions />}
        </div>
      </Disclosure>
    </VisitDataContext.Provider>
  );
};

export default VisitDisclosure;
