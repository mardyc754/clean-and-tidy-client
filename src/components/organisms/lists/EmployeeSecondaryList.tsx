import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { StatusIndicator } from '~/components/atoms/typography';

import { convertToCamelCase } from '~/utils/stringUtils';
import { getVisitEmployeesWithStatuses } from '~/utils/visitUtils';

import SecondaryListWrapper from '../wrappers/SecondaryListWrapper';

interface EmployeeListProps {
  data: VisitWithEmployees;
}

const EmployeeList = ({ data }: EmployeeListProps) => {
  const employeesWithStatuses = getVisitEmployeesWithStatuses(data);

  return (
    <SecondaryListWrapper title="Assigned employees">
      <ul className="list-inside list-disc">
        {employeesWithStatuses.map(({ employee, status }, index) => (
          <div
            className="flex justify-between"
            key={`SingleReservationEmployee-${convertToCamelCase(
              employee.firstName
            )}-${index}`}
          >
            <li className="text-lg">
              <span className="font-semibold">{`${employee.firstName} ${employee.lastName}`}</span>
              {` (${employee.email})`}
            </li>
            <StatusIndicator perspective="employee" status={status} />
          </div>
        ))}
      </ul>
    </SecondaryListWrapper>
  );
};

export default EmployeeList;
