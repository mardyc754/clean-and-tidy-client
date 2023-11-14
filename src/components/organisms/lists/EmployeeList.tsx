import { convertToCamelCase } from '~/utils/stringUtils';
import type { EmployeeWithStatus } from '~/schemas/api/reservation';

import SecondaryListWrapper from '../wrappers/SecondaryListWrapper';
import { StatusIndicator } from '~/components/atoms/typography';

interface EmployeeListProps {
  data: EmployeeWithStatus[];
}

const EmployeeList = ({ data }: EmployeeListProps) => {
  return (
    <SecondaryListWrapper title="Assigned employees">
      <ul className="list-inside list-disc">
        {data.map(({ employee, status }, index) => (
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
            <StatusIndicator status={status} />
          </div>
        ))}
      </ul>
    </SecondaryListWrapper>
  );
};

export default EmployeeList;
