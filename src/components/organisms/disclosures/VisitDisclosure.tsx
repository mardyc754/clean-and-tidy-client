import { useMemo } from 'react';

import type { Visit } from '~/schemas/api/reservation';

import {
  displayDatesAsTimespan,
  extractDateStringFromDate
} from '~/utils/dateUtils';

import { Disclosure } from '~/components/organisms/disclosures';
import { EmployeeList, VisitDetailsList } from '../lists';
import { VisitActions } from '../button-fields';

interface ReservationDisclosureProps {
  data: Visit;
  manageable?: boolean;
  defaultOpen?: boolean;
}

const VisitDisclosure = ({
  data,
  manageable = false,
  defaultOpen = false
}: ReservationDisclosureProps) => {
  const employees = useMemo(() => data.employees ?? [], [data.employees]);

  return (
    <Disclosure
      defaultOpen={defaultOpen}
      titleComponent={
        <div className="flex flex-1 flex-col py-2 md:flex-row md:items-center md:justify-between">
          <p className="font-emphasize text-2xl">
            {extractDateStringFromDate(data.startDate)}
          </p>
          <p className="font-emphasize text-2xl">
            {displayDatesAsTimespan(data.startDate, data.endDate)}
          </p>
        </div>
      }
    >
      <div className="flex-1">
        <div className="pb-4">
          <VisitDetailsList data={data} />
        </div>
        {employees.length > 0 && <EmployeeList data={employees} />}
        {manageable && <VisitActions />}
      </div>
    </Disclosure>
  );
};

export default VisitDisclosure;
