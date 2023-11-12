import { convertToCamelCase } from '~/utils/stringUtils';

import SecondaryListWrapper from '../wrappers/SecondaryListWrapper';
import type { Employee } from '~/schemas/api/employee';

interface EmployeeListProps {
  data: Employee[];
}

const EmployeeList = ({ data }: EmployeeListProps) => {
  return (
    <SecondaryListWrapper title="Assigned employees">
      <ul className="list-inside list-disc">
        {data.map((employee, index) => (
          <li
            className="text-lg"
            key={`SingleReservationEmployee-${convertToCamelCase(
              employee.firstName
            )}-${index}`}
          >
            <span className="font-semibold">{`${employee.firstName} ${employee.lastName}`}</span>
            {` (${employee.email})`}
          </li>
        ))}
      </ul>
    </SecondaryListWrapper>
  );
};

export default EmployeeList;
